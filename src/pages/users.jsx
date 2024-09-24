import React from 'react' 
import Sidenav from "../components/Sidenav";
import Navbar from "../components/navbar";
import UserForm from '../components/UserForm';
import Grid from '@mui/material/Grid';
import "../Dash.css";
import Box from '@mui/material/Box';
export default function Users(){

    return(
        <>
<Navbar/>
    <Box height={50}/>
    <Box sx={{ display: "flex"}}>
    <Sidenav/>
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
    <h4>Users</h4>
    <UserForm/>
    <Grid container spacing={2}>
      </Grid>
    </Box>
             </Box>        </>
    )
}