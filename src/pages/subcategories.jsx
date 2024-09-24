import React from 'react' 
import Sidenav from "../components/Sidenav";
import Navbar from "../components/navbar";
// import CatField from '../components/CatField';
import AddCategories from "../components/AddCategories";
import CategoryTable from "../components/CategoryTable"
import SubCatField from '../components/subCatField';
import Grid from '@mui/material/Grid';
import "../Dash.css";
import Box from '@mui/material/Box';

export default function SubCategories() { 
  return ( 
    <>
    <div className="bgcolor">
    <Navbar/>
    <Box height={40}/>
    <Box sx={{ display: "flex"}}>
    <Sidenav/>
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
    <h5>Add SubCategories</h5>
    
    <SubCatField/>
        <br></br>

    {/* <CategoryTable/> */}

    <Grid container spacing={2}>
      </Grid>
    </Box>
             </Box>

    </div>
 
 
    </>
)
}
