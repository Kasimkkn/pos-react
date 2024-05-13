import React from 'react'

const InputBoxes = ({handleInputTableChange, handleProductChange}) => {
  return (
    <div className="flex px-3 py-1 gap-2">
                <input
                  type="text"
                  placeholder="Enter Table No"
                  className="bg-primary w-full p-2 border border-1 border-light-white rounded-md text-white font-extralight focus:outline-none"
                  onChange={handleInputTableChange}
                  autoFocus
                />
                <input
                  type="text"
                  placeholder="Search Dishes..."
                  className="bg-primary w-full p-2 border border-1 border-light-white rounded-md text-white font-extralight focus:outline-none"
                  onChange={handleProductChange}
                />
              </div>
  )
}

export default InputBoxes