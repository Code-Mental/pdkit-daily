import React from 'react' 
import Sidenav from "../components/Sidenav";
import Navbar from "../components/navbar";
import Grid from '@mui/material/Grid';
import LoginForm from '../components/LoginForm';
import "../Dash.css";
import Box from '@mui/material/Box';

export default function Login() { 
  return ( 
    <>
    <div className="bgcolor">
    <Navbar/>
    <Box height={40}/>
    <Box sx={{ display: "flex"}}>
    <Sidenav/>
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
    <h4>Login Form</h4>
    <LoginForm/>
    <Grid container spacing={2}>
      </Grid>
    </Box>
             </Box>

    </div>
 
 
    </>
)
}
