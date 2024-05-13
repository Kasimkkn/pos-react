import React from 'react'

const ProductList = ({filteredProducts, defaultImage, handleAddToCart}) => {
  return (
    <div className="pb-2 pl-2 max-h-[70vh] max-md:max-h-[79vh] max-md:pb-14">
    <div className="productList w-full bg-primary py-3 px-2 max-md:py-0 flex flex-wrap gap-1 max-h-full overflow-y-scroll rounded-md">
      {filteredProducts.map((item) => (
        <div
          onClick={() => handleAddToCart(item)} key={item._id}
          className="flex p-1 bg-light-primary rounded-md w-[16.3%] hover:cursor-pointer max-md:flex-col max-md:w-[48%] max-md:gap-2"
        >
          <img src={defaultImage} alt={item.item_name} className="w-16 h-16 rounded-md max-md:w-full max-md:h-24"
          />
          <div className="flex flex-col gap-2 px-2 justify-center">
            <p className="text-white text-xs uppercase font-semibold max-md:text-lg">
              {item.item_name.split(" ").slice(0, 2).join(" ")}
            </p>
            <span className="text-white text-sm max-md:text-sm">
              Price: {item.common_hall}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default ProductList