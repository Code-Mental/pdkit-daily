
import React,{useState,useEffect} from "react";
import axios from "axios"
import { useParams } from "react-router-dom";


export default function  ProductForm() {
  const {id}=useParams();
  const fetchProduct=async()=>{
const response=await axios.get(`http://localhost:8083/api/admin/product/${id}`)
setFormData(response.data.product)
}
useEffect(()=>{
  fetchProduct()
    },[])
  const [formData,setFormData]=useState(
{
title: "",
description: "",
color: "",
size: "",
price: "",
category: "",
subcategory: "",
})
 




const {title,description,color,size,price,category,subcategory}=formData;
 const handleSubmit=async(e)=>{
e.preventDefault();
const response=await axios.put(`http://localhost:8083/api/admin/product/${id}`,formData)
console.log(response)
}
 
  const onChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
 }
 console.log(formData)
    return(
        <div>
       <form onSubmit={handleSubmit}>
        <label>title</label>
        <input type='text' name='title' value={title} onChange={onChange}/>
        <label>description</label>
        <input type='text' name='description' value={description} onChange={onChange}/>
        <label>color</label>
        <input type='text' name='color' value={color} onChange={onChange}/>
        <label>price</label>
        <input type='text' name='price' value={price} onChange={onChange}/>
        <label>size</label>
        <input type='text' name='size' value={size} onChange={onChange}/>
        <label>category</label>
        <input type='text' name='category' value={category} onChange={onChange}/>
        <label>subcategory</label>
        <input type='text' name='subcategory' value={subcategory} onChange={onChange}/>
         <button type='submit'>Submit</button>       
        </form> 
        
        </div>
    )
}