import React from 'react' 
import Sidenav from "../components/Sidenav";
import Navbar from "../components/navbar";
import ProductForm from '../components/ProductForm';
import Grid from '@mui/material/Grid';
import "../Dash.css";
import Box from '@mui/material/Box';

export default function AddProducts() { 
  return ( 
    <>
    <div className="bgcolor">
    <Navbar/>
    <Box height={40}/>
    <Box sx={{ display: "flex"}}>
    <Sidenav/>
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
    <h4>Add Products</h4>
<ProductForm/>
    <Grid container spacing={2}>
      </Grid>
    </Box>
             </Box>

    </div>
 
 
    </>
)
}
