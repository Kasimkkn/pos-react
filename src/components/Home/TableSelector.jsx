import React from 'react';

const TableSelector = ({ tableData, handleTableChange, cartItems }) => {
  return (
    <div className="rounded-md flex pt-2 w-full pl-3 flex-wrap gap-2 overflow-y-scroll bg-light-primary max-md:hidden">
      {tableData.map((table) => {
        const isActive = cartItems.success && Array.isArray(cartItems.cartItems) && cartItems.cartItems.some(item => item.table_no === table.table_no);
        return (
          <button
            key={table.table_id}
            value={`${table.table_no} ${table.location_name}`}
            onClick={handleTableChange}
            className={`text-white rounded-lg w-[5.4rem] px-6 py-3 ${
              isActive ? 'bg-text-primary' : 'bg-secondary'
            } hover:bg-text-primary`}
          >
            {table.table_no}
          </button>
        );
      })}
    </div>
  );
};

export default TableSelector;
