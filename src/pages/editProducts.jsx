import React from 'react' 
import Sidenav from "../components/Sidenav";
import Navbar from "../components/navbar";
import EditProductForm from '../components/EditProductForm';
import Grid from '@mui/material/Grid';
import "../Dash.css";
import Box from '@mui/material/Box';

const editProducts = () => {
  return (
    <>
    <Navbar/>
    <Box height={40}/>
    <Box sx={{ display: "flex"}}>
    <Sidenav/>
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
    <h4>Edit Product</h4>
<EditProductForm/>
    <Grid container spacing={2}>
      </Grid>
    </Box>
             </Box>
             </>
  )
}

export default editProducts