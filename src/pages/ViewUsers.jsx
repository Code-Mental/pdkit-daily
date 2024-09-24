import React from 'react'
import Sidenav from "../components/Sidenav";
import Navbar from "../components/navbar";
import Productlist from '../components/product_list';
import Box from '@mui/material/Box';
// import MyTable from '../components/productTable.jsx';
import Users_list from '../components/users_list.jsx';
import Btable from '../components/Btable.jsx';

export default function About() {
  return (
    <div className="bgcolor">
      <Navbar />
      <Box height={40} />
         <Box sx={{ display: "flex" }}>
         <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h4>View Users</h4>
          <Users_list />
          

        </Box>
        <Box />
      </Box>
    </div>
  )
}
