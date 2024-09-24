import {useState,useEffect} from "react";
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { Link } from "react-router-dom";

// import {toast} from "react-toastify"

// Define your columns with an additional 'Actions' column
const columns = [
  {
    name: 'Title',
    selector: row => row?.title,
  },
  {
    name: 'Quantity',
    selector: row => row?.quantity,
  },
  {
    name: 'Price',
    selector: row => row?.price,
  },
  {
    name: 'Categories',
    selector: row => row?.category?.name,
  },
  {
    name: 'SubCategories',
    selector: row => row?.year,
  },
  {
    name: 'Actions',
    cell: row => (
      <div>
        <Link to={`/about/editProducts/${row._id}`}>Edit</Link>
        <button onClick={() => handleDelete(row)}>Delete</button>
      </div>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

// Define your custom styles
const customStyles = {
  rows: {
    style: {
      minHeight: '40px', // override the row height
    },
  },
  headCells: {
    style: {
      paddingLeft: '8px', // override the cell padding for head cells
      paddingRight: '8px',
    },
  },
  cells: {
    style: {
      paddingLeft: '8px', // override the cell padding for data cells
      paddingRight: '8px',
    },
  },
};


// Define the data
// const data = [
//   {
//     id: 1,
//     title: 'Beetlejuice',
//     year: '1988',
//   },
//   {
//     id: 2,
//     title: 'Ghostbusters',
//     year: '1984',
//   },
//   {
//     id: 2,
//     title: 'Ghostbusters',
//     year: '1984',
//   }
// ];

// Define your action handlers
const handleEdit = (row) => {
  alert(`Edit ${row?.title}`);
};




const handleDelete =async (row) => {
const response=await axios.delete(`http://localhost:8083/api/admin/product/${row._id}`) 
if(response.data.success){
  alert(response.data.message)
}
};

// Define the table component
function Users_list() {
  const [data,setData]=useState([]);

const fetchProducts=async()=>{
  const response=await axios.get("http://localhost:8083/api/admin/product")
  console.log(response);
  setData(response.data.products)
  
}

useEffect(()=>{
  fetchProducts();
},[])

  return (
    <DataTable
      title=""
      columns={columns}
      data={data}
      customStyles={customStyles}
    />
  );
}

export default Users_list;
