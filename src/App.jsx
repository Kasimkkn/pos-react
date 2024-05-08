import React, { useEffect, useState } from 'react'
import { dummyData, categories, Tables } from './data/dummy';
import Header from './components/Header';
import defaultImage from './assets/food.svg';
import axios from 'axios';
const server = "http://localhost:3000/"
const App = () => {
  const [tables, setTables] = useState([]);
  const [locations, setLocations] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const [selectedTable, setSelectedTable] = useState({
    table_no: 1,
    location_name: "Common-Hall",
  });
  const [products, setProducts] = useState([]);

  const tableData = tables.map((table) => {
    const location = locations.find(
      (loc) => loc.location_no === table.location_no
    );
    return {
      table_no: table.table_no,
      location_name: location ? location.location_name : "Unknown Location",
    };
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get(`${server}api/v1/products`).then((response) => {
          setProducts(response.data);
        }).catch((error) => console.error('Error fetching products:', error.message));

        await axios.get(`${server}api/v1/locations`)
          .then((response) => setLocations(response.data))
          .catch((error) => console.error('Error fetching locations:', error.message));

        await axios.get(`${server}api/v1/tables`)
          .then((response) => setTables(response.data))
          .catch((error) => console.error('Error fetching tables:', error.message));

        await axios.get(`${server}api/v1/cartitem`, {
          tableNo: selectedTable.table_no,
          locationName: selectedTable.location_name
        })
          .then((response) => setCartItems(response.data))
          .catch((error) => console.error('Error fetching cart items:', error.message));

      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
 
    fetchData();
  }, []);

  const handleTableChange = async (e) => {
    const newTableNo = e.target.value.split(" ")[0];
    const newLocationName = e.target.value.split(" ")[1];
  
    setSelectedTable({
      table_no: newTableNo,
      location_name: newLocationName
    });
  
    try {
      const response = await axios.get(`${server}api/v1/cartitem`, {
        params: {
          tableNo: newTableNo,
          locationName: newLocationName
        }
      });
  
      setCartItems(response.data);
    } catch (error) {
      console.error('Error fetching cart items:', error.message);
    }
  };
  
  const handleProductChange = (e) => {
    const filterProducts = dummyData.filter(product => productname.toLowerCase().includes(e.target.value.toLowerCase()) || product.item_no.toString() === e.target.value);
    setProducts(filterProducts);
  }
  const handleInputTableChange = debounce((e) => {
    const inputValue = e.target.value.trim().toString();
    if (!inputValue) {
      setSelectedTable({
        table_no: '1',
        location_name: 'Common-Hall'
      });
      return;
    }

    const tableInfo = tableData.filter((table) => {
      return table.table_no.toString() == inputValue;
    });

    if (tableInfo.length > 0) {
      setSelectedTable({
        table_no: tableInfo[0].table_no,
        location_name: tableInfo[0].location_name
      });
    } else {
      setSelectedTable({
        table_no: '1',
        location_name: 'Common-Hall'
      });
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
        location_name: selectedTable.location_name
      });
      if (response.data.success) {
        setCartItems(response.data.updatedCartItems);
      } else {
        console.error('Failed to add item to cart:', response.data.message);
      }
    } catch (error) {
      console.error('Error adding item to cart:', error.message);
    }
  };

  const handleDecrementFromCart = async (product) => {
    try {
      const response = await axios.post(`${server}api/v1/cart/decrement`, {
        item_no: product.item_no,
        table_no: selectedTable.table_no,
        location_name: selectedTable.location_name
      });
      if (response.data.success) {
        setCartItems(response.data.updatedCartItems);
      } else {
        console.error('Failed to decrement item quantity:', response.data.message);
      }
    } catch (error) {
      console.error('Error decrementing item quantity:', error.message);
    }
  };


  return (
    <>
      <Header />
      <main className='flex w-4/5 h-full pt-16 fixed max-md:w-full'>
        <section className='w-full flex flex-col gap-0 pt-1'>
          <div className="flex max-h-[28vh] w-full pt-2 px-2 pr-4 gap-2 max-md:flex-col">
            <div className='flex flex-col gap-1 max-w-[60%] overflow-y-scroll max-md:max-w-full' style={{ maxHeight: "22vh" }}>
              <div className='flex px-3 py-1 gap-2'>
                <input type="text" placeholder='Enter Table No' className='bg-primary w-full p-2 border border-1 border-light-white rounded-md text-white font-extralight focus:outline-none'
                  onChange={handleInputTableChange} autoFocus />
                <input type="text" placeholder='Search Dishes...' className='bg-primary w-full p-2 border border-1 border-light-white rounded-md text-white font-extralight focus:outline-none'
                  onChange={handleProductChange} />
              </div>
              <div id='CategoryList' className='rounded-md flex gap-3 px-2 max-md:px-2 max-md:gap-1 py-1 max-md:py-0 max-w-full max-h-full flex-wrap overflow-y-scroll max-md:max-h-16 max-md:overflow-y-hidden max-md:overflow-x-scroll max-md:flex-nowrap'>
                {categories.map((category) => (
                  <button key={category.category_name} className='w-max px-5 py-3 text-center bg-text-primary text-white rounded-md flex gap-2 items-center hover:border-none hover:bg-secondary'>
                    {category.category_name.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>
            <div className='rounded-md flex pt-2 pl-2 flex-wrap gap-1 overflow-y-scroll bg-light-primary max-md:hidden' style={{ maxHeight: "22vh" }}>
              {
                tableData.map((table) => (
                  <button key={table.table_no} value={`${table.table_no} ${table.location_name}`} onClick={handleTableChange}
                    className='text-white rounded-lg h-[3rem] w-[4.9rem] bg-secondary hover:bg-text-primary'>
                    {table.table_no}</button>
                ))
              }
            </div>
          </div>

          <div className='pb-2 pl-2 max-h-[70vh] max-md:max-h-[79vh]'>
            <div className="productList w-full bg-primary py-3 px-2 max-md:py-0 flex flex-wrap gap-1 max-h-full overflow-y-scroll rounded-md">
              {products.map((item) => (
                <div onClick={() => handleAddToCart(item)} key={item.item_no} className='flex p-1 bg-light-primary rounded-md w-[16.3%] hover:cursor-pointer max-md:flex-col max-md:w-[48%] max-md:gap-2'>
                  <img src={defaultImage} alt={item.item_name} className='w-16 h-16 rounded-md max-md:w-full max-md:h-24' />
                  <div className='flex flex-col gap-2 px-2 justify-center'>
                    <p className='text-white text-xs uppercase font-semibold max-md:text-lg'>{item.item_name.split(" ").slice(0, 2).join(" ")}</p>
                    <span className='text-text-primary text-xs max-md:text-sm'>Price: ${item.common_hall}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='hidden fixed  bottom-0 w-full max-md:flex gap-2 px-4 py-1'>
            <button className='w-full rounded-lg bg-text-primary text-xl font-bold text-white px-3 py-2'>Print</button>
            <button className='w-full rounded-lg bg-text-primary text-xl font-bold text-white px-3 py-2'>KOT</button>

          </div>
        </section>
        <aside className='max-md:hidden bg-secondary w-1/5 h-full fixed right-0 flex flex-col px-3 pt-2 '>
          <h2 className='text-white text-center text-xl mb-4'>{selectedTable.table_no + " " + selectedTable.location_name}</h2>
          <div className='flex flex-col gap-3'>
            <select name="table" id="table" className='bg-light-primary p-2 rounded-md border-none text-white font-extralight hover:cursor-pointer focus:outline-none' value={selectedTable.table_no} onChange={handleTableChange}>
              {tableData.map((table) => (
                <option key={table.table_no} value={`${table.table_no} ${table.location_name}`}>{table.table_no} - {table.location_name}</option>
              ))}
            </select>

            <input type="text" placeholder='Customer Name' className='bg-light-primary p-2 rounded-md border-none focus:outline-none ' />
          </div>

          <div className='my-3 cartItems max-h-72 flex flex-col gap-3 overflow-y-scroll bg-light-primary p-2 rounded-md'>
            {cartItems.map((item) => (
              <div key={item.item_no} className={`flex ${item.is_printed ? "bg-text-primary" : "bg-secondary"} p-2 rounded-md`}>
                <img src={defaultImage} alt={item.item_name} className='w-16 h-16 rounded-md' />
                <div className='flex flex-col gap-2 px-3'>
                  <p className='text-white text-xs uppercase font-semibold'>{item.item_name.split(" ").slice(0, 2).join(" ")}</p>
                  <span className='text-white text-xs'>Quantity: {item.quantity}</span>
                  <span className='text-white text-xs'>${item.price}</span>
                </div>
                <div className='flex gap-2 items-center'>
                <button onClick={() => handleAddToCart(item)} className='flex items-center justify-center w-8 h-8 rounded-lg bg-text-primary text-xl font-bold text-white'>+</button>
      <button onClick={() => handleDecrementFromCart(item)} className='flex items-center justify-center w-8 h-8 rounded-lg bg-text-primary text-xl font-bold text-white'>-</button>

                </div>
              </div>
            ))}
          </div>

          <div className='bg-light-primary p-2 rounded-md '>
            <div className='flex justify-between px-1 text-white'>
              <p>subtotal</p>
              <span>$20.0</span>
            </div>
            <div className='flex justify-between px-1 text-white'>
              <p>Tax</p>
              <span>$20.0</span>
            </div>
            <div className='flex justify-between px-1 text-white'>
              <p>Discount</p>
              <span>$00.0</span>
            </div>
          </div>
          <div className='bg-light-primary rounded-xl my-2 border-t-2 border-text-primary border-dashed p-2'>
            <div className='flex justify-between px-1 text-white'>
              <p>total</p>
              <span>$20.0</span>
            </div>
          </div>
          <div className='flex gap-2 mt-3'>
            <button className='w-full rounded-lg bg-text-primary text-xl font-bold text-white px-3 py-1'>Print</button>
            <button className='w-full rounded-lg bg-text-primary text-xl font-bold text-white px-3 py-1'>KOT</button>
          </div>
        </aside>
      </main>
    </>
  )
}

export default App