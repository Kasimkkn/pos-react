import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import defaultImage from "./assets/food.svg";
import axios from "axios";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import TableSelector from "./components/Home/TableSelector";
import ProductList from "./components/Home/ProductList";
import Cart from "./components/Home/Cart";
import CategoryList from "./components/Home/CategoryList";
import InputBoxes from "./components/Home/InputBoxes.jsx";

const server = "http://localhost:3000/";

const App = () => {
  const [tables, setTables] = useState([]);
  const [locations, setLocations] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [allCartItems , setAllCartItems] = useState([]);
  const [selectedTable, setSelectedTable] = useState({
    table_no: 1,
    location_name: "Common-Hall",
  });
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const tableData = tables.map((table) => {
    const location = locations.find(
      (loc) => loc.location_no === table.location_no
    );
    return {
      table_id: table._id,
      table_no: table.table_no,
      location_name: location ? location.location_name : "Unknown Location",
    };
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          locationsResponse,
          tablesResponse,
          productsResponse,
          categoriesResponse,
          allCartItemsResponse,
          cartItemsResponse,
        ] = await Promise.all([
          axios.get(`${server}api/v1/locations`),
          axios.get(`${server}api/v1/tables`),
          axios.get(`${server}api/v1/products`),
          axios.get(`${server}api/v1/categories`),
          axios.get(`${server}api/v1/allcartitems`),
          axios.post(`${server}api/v1/cartitem`, {
            tableNo: selectedTable.table_no,
            locationName: selectedTable.location_name,
          }),
        ]);

        setLocations(locationsResponse.data);
        setTables(tablesResponse.data);
        setProducts(productsResponse.data);
        setFilteredProducts(productsResponse.data);

        const categories = categoriesResponse.data;
        const categoryWithProducts = categories.filter((category) => {
          return productsResponse.data.some(
            (product) => product.category_no === category.category_no
          );
        });
        setCategories(categoryWithProducts);
        setAllCartItems(allCartItemsResponse.data);
        setCartItems(cartItemsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [selectedTable]);

  const handleTableChange = async (e) => {
    const newTableNo = e.target.value.split(" ")[0];
    const newLocationName = e.target.value.split(" ")[1];

    setSelectedTable({
      table_no: newTableNo,
      location_name: newLocationName,
    });

    try {
      const response = await axios.post(`${server}api/v1/cartitem`, {
        tableNo: newTableNo,
        locationName: newLocationName,
      });
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error.message);
    }
  };

  const handleProductChange = (e) => {
    const searchedProducts = products.filter(
      (product) =>
        product.item_name
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        product.item_no.toString() === e.target.value
    );
    console.log(searchedProducts);
    setFilteredProducts(searchedProducts);
  };

  const handleInputTableChange = debounce(async (e) => {
    const inputValue = e.target.value.trim().toString();
    if (!inputValue) {
      setSelectedTable({
        table_no: "1",
        location_name: "Common-Hall",
      });
      return;
    }

    const tableInfo = tableData.filter((table) => {
      return table.table_no.toString() === inputValue;
    });

    if (tableInfo.length > 0) {
      setSelectedTable({
        table_no: tableInfo[0].table_no,
        location_name: tableInfo[0].location_name,
      });
    } else {
      setSelectedTable({
        table_no: "1",
        location_name: "Common-Hall",
      });
    }
    try {
      const response = await axios.post(`${server}api/v1/cartitem`, {
        tableNo: newTableNo,
        locationName: newLocationName,
      });
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error.message);
    }
  }, 300);

  function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }

  const handleAddToCart = async (product) => {
    try {
      const response = await axios.post(`${server}api/v1/cart/add`, {
        item_no: product.item_no,
        table_no: selectedTable.table_no,
        location_name: selectedTable.location_name,
      });
      if (response.data.success) {
        setCartItems(response.data.updatedCartItems);
        toast.success("Item added to cart");
      } else {
        console.error("Failed to add item to cart:", response.data.message);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error.message);
    }
  };

  const handleDecrementFromCart = async (product) => {
    try {
      const response = await axios.post(`${server}api/v1/cart/decrement`, {
        item_no: product.item_no,
        table_no: selectedTable.table_no,
        location_name: selectedTable.location_name,
      });
      if (response.data.success) {
        setCartItems(response.data.updatedCartItems);
        toast.error("Item removed from cart");

      } else {
        console.error("Failed to decrement item quantity:", response.data.message);

      }
    } catch (error) {
      console.error("Error decrementing item quantity:", error.message);
    }
  };

  const handleCategoryChange = (categoryNo) => {
    const filterProducts = products.filter(
      (product) => product.category_no === categoryNo
    );
    setFilteredProducts(filterProducts);
  };

  return (
    <>
      <Header />
      <main className="flex w-4/5 h-full pt-16 fixed max-md:w-full">
        <section className="w-full flex flex-col gap-0 pt-1">
          <div className="flex max-h-[28vh] w-full pt-2 px-2 pr-4 gap-2 max-md:flex-col">

            <div className="flex w-full flex-col gap-1 overflow-y-scroll max-md:max-w-full">

              <InputBoxes
                handleInputTableChange={handleInputTableChange}
                handleProductChange={handleProductChange}
              />

              <CategoryList
                products={products}
                categories={categories}
                handleCategoryChange={handleCategoryChange}
                setFilteredProducts={setFilteredProducts}
              />
            </div>

            <TableSelector
              tableData={tableData}
              handleTableChange={handleTableChange}
              cartItems={allCartItems}
            />
          </div>

          <ProductList
            filteredProducts={filteredProducts}
            defaultImage={defaultImage}
            handleAddToCart={handleAddToCart}
          />

          <div className="hidden fixed  bottom-0 w-full max-md:flex gap-2 px-3 py-0">
            <button className="w-full rounded-lg bg-text-primary text-xl font-bold text-white px-3 py-2">
              Print
            </button>
            <button className="w-full rounded-lg bg-text-primary text-xl font-bold text-white px-3 py-2">
              KOT
            </button>
          </div>
        </section>

        <Cart
          cartItems={cartItems}
          defaultImage={defaultImage}
          handleTableChange={handleTableChange}
          tableData={tableData}
          selectedTable={selectedTable}
          handleAddToCart={handleAddToCart}
          handleDecrementFromCart={handleDecrementFromCart}
        />
      </main>
      <Toaster position="top-center" />
    </>
  );
};

export default App;
