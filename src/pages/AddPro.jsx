import React from 'react' 
import Sidenav from "../components/Sidenav";
import Navbar from "../components/navbar";
import AddProductForm from '../components/AddSimpleProduct';
import Grid from '@mui/material/Grid';
import "../Dash.css";
import Box from '@mui/material/Box';

export default function AddPro() { 
  return ( 
    <>
    <div className="bgcolor">
    <Navbar/>
    <Box height={40}/>
    <Box sx={{ display: "flex"}}>
    <Sidenav/>
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
    <h4>Add Products Code</h4>
    <AddProductForm/>

    <Grid container spacing={2}>
      </Grid>
    </Box>
             </Box>

    </div>
 
 
    </>
)
}
