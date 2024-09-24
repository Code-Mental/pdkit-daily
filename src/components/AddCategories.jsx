
import React,{useState} from "react";
import axios from "axios";
import { TextField, Button, Container, Grid, Typography } from '@mui/material';
import AddCategories from "../components/AddCategories";
export default function  CategoryForm() {
  const [formData,setFormData]=useState(
{
name: "",

})
const {name}=formData;
 const handleSubmit=async(e)=>{
e.preventDefault();
const response=await axios.post("http://localhost:8083/api/admin/category",formData)
setFormData({
  name: "",

})
}
  const onChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
 }
 console.log(formData)
    return(
        <div className="clr">
        <Container maxWidth="md">
          <Typography variant="h4" gutterBottom>
          </Typography>

       <form onSubmit={handleSubmit}>
       <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              label="Title"
              name="name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={onChange}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Submit
            </Button>
          </Grid>
          
          </Grid>
          </form>
    </Container>
    </div>
          
        // <label>title</label>
        // <input type='text' name='name' value={name} onChange={onChange}/>
    
        //  <button type='submit'>Submit</button>       
        // </form> 
        
        
    )
}