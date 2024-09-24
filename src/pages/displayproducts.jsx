import React from 'react' 
import Sidenav from "../components/Sidenav";
import Navbar from "../components/navbar";
import ProductForm from '../components/ProductForm';
import Grid from '@mui/material/Grid';
import "../Dash.css";
import Box from '@mui/material/Box';
import TestProducts from '../components/testproducts.jsx'
import DataDisplay from '../components/DataDisplay.jsx';
export default function DisplayProducts(){

    return(
        <>
         <div className="bgcolor">
    <Navbar/>
    <Box height={40}/>
    <Box sx={{ display: "flex"}}>
    <Sidenav/>
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
    <h4>Display Products</h4>
    <DataDisplay/>
    <Grid container spacing={2}>
      </Grid>
    </Box>
             </Box>

    </div>
        <h3>Test</h3>
        
        </>
    )
       
    
}