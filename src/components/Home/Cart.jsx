import React, { useEffect, useState } from 'react'
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FiMinusCircle } from "react-icons/fi";


const Cart = ({cartItems , handleTableChange, tableData, selectedTable , handleAddToCart , handleDecrementFromCart,defaultImage}) => {

  const [subTotal, setSubTotal] = useState(0)
  const [total, setTotal] = useState(subTotal + (0.05 * subTotal))
  const [tax, setTax] = useState(0.05 * subTotal)

  const subTotalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  useEffect(()=>{
    setSubTotal(subTotalAmount)
    setTax(0.05 * subTotalAmount)
    setTotal(subTotalAmount + (0.05 * subTotalAmount))
  })

  return (
    <aside className="max-md:hidden bg-secondary w-1/5 h-full fixed right-0 flex flex-col px-3 pt-2 ">
          <h2 className="text-white text-center text-xl mb-4">
            {selectedTable.table_no + " " + selectedTable.location_name}
          </h2>
          <div className="flex flex-col gap-3">
            <select name="table" id="table"
              className="bg-light-primary p-2 rounded-md border-none text-white font-extralight hover:cursor-pointer focus:outline-none"
             value={selectedTable.table_no} onChange={handleTableChange}
            >
              {tableData.map((table) => (
                <option
                  key={table.table_id} value={`${table.table_no} ${table.location_name}`} >
                  {table.table_no} - {table.location_name}
                </option>
              ))}
            </select>

            <input type="text" placeholder="Customer Name"
              className="bg-light-primary p-2 rounded-md border-none focus:outline-none "
            />
          </div>

          <div className="my-3 cartItems max-h-80 flex flex-col gap-3 overflow-y-scroll bg-light-primary p-2 rounded-md">
            {cartItems.map((item) => (
              <div key={item._id} className={`flex justify-between hover:cursor-pointer ${item.is_printed ? "bg-text-primary" : "bg-secondary"} p-2 rounded-md`} >
                <img src={defaultImage} alt={item.item_name} className="w-16 h-16 rounded-md" 
                />
                <div className="flex justify-center h-full flex-col gap-2 px-3">
                  <p className="text-white text-xs capitalize font-semibold">
                    {item.item_name.split(" ").slice(0, 1).join(" ")}
                  </p>
                  <span className="text-white text-xs">
                    {item.quantity} * {item.price}
                  </span>
                </div>
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="flex items-center justify-center w-8 h-8 rounded-lg bg-text-primary text-xl font-bold text-white">
                    <AiOutlinePlusCircle/>
                  </button>
                  <button
                    onClick={() => handleDecrementFromCart(item)}
                    className="flex items-center justify-center w-8 h-8 rounded-lg bg-text-primary text-xl font-bold text-white">
                    <FiMinusCircle/>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-light-primary p-2 rounded-md ">
            <div className="flex justify-between px-1 text-white">
              <p>subtotal</p>
              <span>$ {subTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between px-1 text-white">
              <p>Tax</p>
              <span>$ {tax.toFixed(2)}</span>
            </div>
            {/* <div className="flex justify-between px-1 text-white">
              <p>Discount</p>
              <span>$00.0</span>
            </div> */}
          </div>
          <div className="bg-light-primary rounded-xl my-2 border-t-2 border-text-primary border-dashed p-2">
            <div className="flex justify-between px-1 text-white">
              <p>total</p>
              <span>$ {total.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <button className="w-full rounded-lg bg-text-primary text-xl font-bold text-white px-3 py-1">
              Print
            </button>
            <button className="w-full rounded-lg bg-text-primary text-xl font-bold text-white px-3 py-1">
              KOT
            </button>
          </div>
        </aside>
        
  )
}

export default Cart