import React from 'react' 
import Sidenav from "../components/Sidenav";
import Navbar from "../components/navbar";
import CatField from '../components/CatField';
import AddCategories from "../components/AddCategories";
import CategoryTable from "../components/CategoryTable"
import Grid from '@mui/material/Grid';
import "../Dash.css";
import Box from '@mui/material/Box';
// import CatField from '../components/CatField';

export default function Home1() { 
  return ( 
    <>
    <div className="bgcolor">
    <Navbar/>
    <Box height={40}/>
    <Box sx={{ display: "flex"}}>
    <Sidenav/>
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
    <h5>Add Categories</h5>
    
    <CatField/>
        <br></br>


    <Grid container spacing={2}>
      </Grid>
    </Box>
             </Box>

    </div>
 
 
    </>
)
}
