import React from 'react'

const CategoryList = ({products, categories, setFilteredProducts, handleCategoryChange}) => {
  return (
    
    <div id="CategoryList" className="rounded-md flex gap-3 px-2 max-md:px-2 max-md:gap-1 py-1 max-md:py-0 max-w-full max-h-full flex-wrap overflow-y-scroll max-md:max-h-16 max-md:overflow-y-hidden max-md:overflow-x-scroll max-md:flex-nowrap">
    <button
      onClick={() => setFilteredProducts(products)}
      className="w-max px-6 py-2 text-center bg-text-primary text-white rounded-md flex gap-2 items-center hover:border-none hover:bg-secondary">
      All
    </button>
    {categories.map((category) => (
      <button
        onClick={() => handleCategoryChange(category.category_no)} key={category.category_name}
        className="w-max px-6 py-2 text-center bg-text-primary text-white rounded-md flex gap-2 items-center hover:border-none hover:bg-secondary text-sm">
        {category.category_name.split(" ")[0]}
      </button>
    ))}
  </div>
  )
}

export default CategoryList