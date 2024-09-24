
import React from 'react' 
import Sidenav from "../components/Sidenav";
import Navbar from "../components/navbar";
import AccordionDash from '../components/AccordionDash';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import "../Dash.css";
import StorefrontIcon from '@mui/icons-material/Storefront';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Box from '@mui/material/Box';
import CountUp from 'react-countup';


export default function Home1() { 
  return ( 
    <>
    <div className="bgcolor">
    <Navbar/>
    <Box height={70}/>
    <Box sx={{ display: "flex"}}>
    <Sidenav/>
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        
    <Grid container spacing={2}>
        <Grid item xs={8}>
        <Stack spacing={2} direction="row">

        <Card sx={{ minWidth: 49 + "%" , height: 152 }} className="gradient">
      <CardContent>
      <div>
             <CreditCardIcon/>
            </div>
        <Typography gutterBottom variant="h5" component="div">
        <CountUp delay={0.2} end={22000} duration={0.8} /> 
        </Typography>
        <Typography gutterBottom variant= "body2"  component="div" sx={{color: "green"}}>
         Total Earnings
        </Typography>
      </CardContent>
    </Card>
    <Card sx={{ minWidth: 49 + "%" , height: 152 }} className="gradient">
             <CardContent><div>
             <CreditCardIcon/>
            </div>
        <Typography gutterBottom variant= "h5" component="div">
        <CountUp delay={0.2} end={22000} duration={0.8  } />
        </Typography>
        <Typography gutterBottom variant= "body2"  component="div" sx={{color: "green"}}>
         Total Orders
        </Typography>
      </CardContent>
    </Card>
    </Stack>
        </Grid>
        <Grid item xs={4}>
   <Stack spacing={2}>

   <Card sx={{ maxWidth: 345 }}>
      
      <Stack spacing={2} direction="row">
        <div className="iconstyle">
          <StorefrontIcon/></div>
        
        <div className="paddingall">
      <span className="pricetitle">$2030</span>
      <br/>
      <span className="pricesubtitle">Income</span>
      </div>
      </Stack>
      
    </Card>
    <Card sx={{ maxWidth: 345 }}>
      
      <Stack spacing={2} direction="row">
        <div className="iconstyle">
          <StorefrontIcon/></div>
        
        <div className="paddingall">
      <span className="pricetitle">$2030

        
      </span>
      <br/>
      <span className="pricesubtitle">Income</span>
      </div>
      </Stack>
  
    </Card>

   </Stack>
      
        </Grid>
      </Grid>
      <Box height={20}/>
      <Grid container spacing={2}>
        <Grid item xs={8}>
        <Card sx={{ height: 60 + "vh" }}>
      <CardContent> 
          
      </CardContent>
    </Card>
 
        </Grid>
        <Grid item xs={4}>
        <Card sx={{ height: 60 + "vh" }}>
      <CardContent>
      <div className="paddingall">
      <span className="pricetitle">Top Products</span>
      
      </div>
        
      <AccordionDash/>   
      </CardContent>
    </Card>
      
        </Grid>
      </Grid>
    </Box>
             </Box>

    </div>
 
 
    </>
)
}
