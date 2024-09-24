import {useState,useEffect} from "react";
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Form, Row, Col, Button } from 'react-bootstrap';

// import {toast} from "react-toastify"

// Define your columns with an additional 'Actions' column
const columns = [
  {
    name: 'Title',
    selector: row => row?.title,
  },
  
  
  {
    name: 'Description',
    selector: row => row?.description,
  },
  
  {
    name:"CategoryImage",
    selector: row => (
      <img
        src={`http://localhost:8083/uploads/${row?.categoryImage}`}
        alt={row?.title}
        style={{ width: '50px', height: '50px', borderRadius: '4px' }}
      />
    ),
  },
  {
    name: 'Actions',
    cell: row => (
      <div>
        <button>
        <Link to={`/about/editProducts/${row._id}`}>Edit</Link></button>
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
      paddingLeft: '8px', // Override the cell padding for head cells
      paddingRight: '8px',
      backgroundColor: '#007bff', // Blue background color
      color: 'white', // Text color for better contrast
      fontWeight: 'bold', // Optional: make header text bold
    },
  },
  cells: {
    style: {
      paddingLeft: '8px', // override the cell padding for data cells
      paddingRight: '8px',
    },
  },
};
// Pagination component options
const paginationOptions = {
  rowsPerPageText: 'Rows per page',
  rangeSeparatorText: 'of',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'All',
};

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
function CategoryTable({dataa}) {
  const [data,setData]=useState([]);
  const [pagination, setPagination] = useState({ page: 1, perPage: 10 });


const fetchProducts=async()=>{
  const response=await axios.get("http://localhost:8083/api/admin/category")
  console.log(response);
  setData(response.data.category)
  
}

useEffect(()=>{
  fetchProducts();
},[dataa])

  return (
    <div className="d-flex justify-content-center" style={{marginRight:"00px"}}>
    <Col md={10} >
    <DataTable
      title=""
      columns={columns}
      data={data}
      customStyles={customStyles}
      pagination
      paginationComponentOptions={paginationOptions}
      paginationPerPage={pagination.perPage}
      paginationDefaultPage={pagination.page}
      onChangePage={page => setPagination(prev => ({ ...prev, page }))}
      onChangeRowsPerPage={perPage => setPagination(prev => ({ ...prev, perPage }))}
    />
    </Col>
    </div>
  );
}

export default CategoryTable;
