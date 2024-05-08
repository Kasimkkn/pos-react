import React, { useState } from 'react'
import { FaHome, FaHistory, FaBell } from "react-icons/fa";
import { BiSolidFoodMenu } from "react-icons/bi";
import { dummyData, categories, Tables } from './data/dummy';

const App = () => {

  const [table, setTable] = useState({
    table_name: "1",
    location_name: "Common Hall",
  })
  const [products, setProducts] = useState(dummyData);

  const handleTableChange = (e) => {
    const selectedTable = Tables.find(table => table.table_name === e.target.value);
    setTable(selectedTable);
  }
  const handleProductChange = (e) => {
    const filterProducts = dummyData.filter(product => product.name.toLowerCase().includes(e.target.value.toLowerCase()) || product.id.toString() === e.target.value);
    setProducts(filterProducts);
  }
  const handleInputTableChange = (e) =>{
    const selectedTable = Tables.find(table => table.table_name.toLowerCase().includes(e.target.value.toLowerCase()));
    setTable(selectedTable);
  }
    
  return (
    <>
      <nav className='bg-secondary flex justify-between px-8 w-full fixed'>
        <div className='logo text-text-primary text-xl p-5 flex items-center'>
          M<span className='text-white'>a</span>M
        </div>
        <ul className='flex gap-10 items-center'>
          <li>
            <a href="#" className='text-text-primary flex gap-2 items-center'>
              <FaHome className='text-2xl' />
              HOME
            </a>
          </li>
          <li>
            <a href="#" className='text-white flex gap-2 items-center'>
              <BiSolidFoodMenu className='text-2xl' />
              MENU
            </a>
          </li>
          <li>
            <a href="#" className='text-text-primary flex items-center gap-2'>
              <FaHistory className='text-2xl' />
              HISTORY
            </a>
          </li>
        </ul>
        <div className='Icon flex gap-5 items-center'>
          <FaBell className='text-2xl text-white' />
          <div className='w-10 h-10'>
            <img src="https://media.licdn.com/dms/image/D4D03AQG0YsFctCrMZQ/profile-displayphoto-shrink_800_800/0/1711246000788?e=1720656000&v=beta&t=tQnguUzqoyRoJ6B0dXGu04OF8aPaln0XZEwxz2HL0uY" alt="kasim" className='w-full h-full rounded-full' />
          </div>
        </div>
      </nav>
      <main className='flex w-4/5 h-full pt-16 fixed'>
        <section className='w-full flex flex-col gap-0 pt-1'>
          <div className="flex max-h-[28vh] w-full pt-2 px-2 pr-4 gap-2">
            <div className='flex flex-col gap-1 max-w-[60%] overflow-y-scroll' style={{maxHeight:"22vh"}}>
              <div className='flex px-3 py-1 gap-2'>
                <input type="text" placeholder='Enter Table No' className='bg-primary w-full p-2 border border-1 border-light-white rounded-md text-white font-extralight focus:outline-none'
                 onChange={handleInputTableChange} autoFocus/>
                <input type="text" placeholder='Search Dishes...' className='bg-primary w-full p-2 border border-1 border-light-white rounded-md text-white font-extralight focus:outline-none'
                 onChange={handleProductChange} />
              </div>
              <div id='CategoryList' className='rounded-md flex gap-3 px-2 py-1 max-w-full max-h-full flex-wrap overflow-y-scroll'>
                {categories.map((category) => (
                  <button key={category.category_id} className='w-max px-5 py-3 text-center bg-text-primary text-white rounded-md flex gap-2 items-center hover:border-none hover:bg-secondary'>
                    {category.category_name}
                  </button>
                ))}
              </div>
            </div>
            <div className='rounded-md flex pt-2 pl-2 flex-wrap gap-1 overflow-y-scroll bg-light-primary' style={{maxHeight:"21vh"}}>
              {
                Tables.map((table) => (
                  <button key={table.table_id} value={table.table_name} onClick={handleTableChange} 
                  className='text-white rounded-lg h-[3rem] w-[4rem] bg-secondary hover:bg-text-primary'>
                    {table.table_name}</button>
                ))
              }
            </div>
          </div>

          <div className='pb-2 pl-2 max-h-[70vh]'>
            <div className="productList w-full bg-primary py-3 px-2 flex flex-wrap gap-1 max-h-full overflow-y-scroll rounded-md">
              {products.map((item) => (
                <div key={item.id} className='flex p-1 bg-light-primary rounded-md w-[16.3%] hover:cursor-pointer'>
                  <img src={item.imageUrl} alt={item.name} className='w-16 h-16 rounded-md' />
                  <div className='flex flex-col gap-2 px-2 justify-center'>
                    <p className='text-white text-xs uppercase font-semibold'>{item.name}</p>
                    <span className='text-text-primary text-xs'>Price: ${item.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>
        <aside className='bg-secondary w-1/5 h-full fixed right-0 flex flex-col px-3 pt-2 '>
          <h2 className='text-white text-center text-xl mb-4'>{table.table_name + " " + table.location_name}</h2>
          <div className='flex flex-col gap-3'>
          <select name="table" id="table" className='bg-light-primary p-2 rounded-md border-none text-white font-extralight hover:cursor-pointer focus:outline-none' value={table.table_name} onChange={handleTableChange}>
  {Tables.map((table) => (
    <option key={table.table_id} value={table.table_name}>{table.table_name} - {table.location_name}</option>
  ))}
</select>

            <input type="text" placeholder='Customer Name' className='bg-light-primary p-2 rounded-md border-none focus:outline-none ' />
          </div>
          <div className='my-3 cartItems max-h-72 flex flex-col gap-3 overflow-y-scroll bg-light-primary p-2 rounded-md'>
            <div className='flex bg-secondary p-2 rounded-md'>
              <img src="https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="pizza" className='w-16 h-16 rounded-md' />
              <div className='flex flex-col gap-2 px-3'>
                <p className='text-white text-xs uppercase font-semibold'>Pizza</p>
                <span className='text-white text-xs'>Quantity: 1</span>
                <span className='text-white text-xs'>Price: $10</span>
              </div>
              <div className='flex gap-2 items-center'>
                <button className='w-8 h-8 rounded-lg bg-text-primary text-xl font-bold text-white' >+</button>
                <button className='w-8 h-8 rounded-lg bg-text-primary text-xl font-bold text-white' >-</button>
              </div>
            </div>
            <div className='flex bg-secondary p-2 rounded-md'>
              <img src="https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="pizza" className='w-16 h-16 rounded-md' />
              <div className='flex flex-col gap-2 px-3'>
                <p className='text-white text-xs uppercase font-semibold'>Pizza</p>
                <span className='text-white text-xs'>Quantity: 1</span>
                <span className='text-white text-xs'>Price: $10</span>
              </div>
              <div className='flex gap-2 items-center'>
                <button className='w-8 h-8 rounded-lg bg-text-primary text-xl font-bold text-white' >+</button>
                <button className='w-8 h-8 rounded-lg bg-text-primary text-xl font-bold text-white' >-</button>
              </div>
            </div>
            <div className='flex bg-secondary p-2 rounded-md'>
              <img src="https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="pizza" className='w-16 h-16 rounded-md' />
              <div className='flex flex-col gap-2 px-3'>
                <p className='text-white text-xs uppercase font-semibold'>Pizza</p>
                <span className='text-white text-xs'>Quantity: 1</span>
                <span className='text-white text-xs'>Price: $10</span>
              </div>
              <div className='flex gap-2 items-center'>
                <button className='w-8 h-8 rounded-lg bg-text-primary text-xl font-bold text-white' >+</button>
                <button className='w-8 h-8 rounded-lg bg-text-primary text-xl font-bold text-white' >-</button>
              </div>
            </div>
            <div className='flex bg-secondary p-2 rounded-md'>
              <img src="https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="pizza" className='w-16 h-16 rounded-md' />
              <div className='flex flex-col gap-2 px-3'>
                <p className='text-white text-xs uppercase font-semibold'>Pizza</p>
                <span className='text-white text-xs'>Quantity: 1</span>
                <span className='text-white text-xs'>Price: $10</span>
              </div>
              <div className='flex gap-2 items-center'>
                <button className='w-8 h-8 rounded-lg bg-text-primary text-xl font-bold text-white' >+</button>
                <button className='w-8 h-8 rounded-lg bg-text-primary text-xl font-bold text-white' >-</button>
              </div>
            </div>
            <div className='flex bg-secondary p-2 rounded-md'>
              <img src="https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="pizza" className='w-16 h-16 rounded-md' />
              <div className='flex flex-col gap-2 px-3'>
                <p className='text-white text-xs uppercase font-semibold'>Pizza</p>
                <span className='text-white text-xs'>Quantity: 1</span>
                <span className='text-white text-xs'>Price: $10</span>
              </div>
              <div className='flex gap-2 items-center'>
                <button className='w-8 h-8 rounded-lg bg-text-primary text-xl font-bold text-white' >+</button>
                <button className='w-8 h-8 rounded-lg bg-text-primary text-xl font-bold text-white' >-</button>
              </div>
            </div>
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