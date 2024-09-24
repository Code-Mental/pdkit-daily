// src/components/MyForm.js

import React, { useState, useEffect } from "react";
import axios from "axios";
// import { TextField, Button, Container, Grid, Typography } from '@mui/material';
import { useParams } from "react-router-dom";
import { Form, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { toast } from "react-toastify";


const ProductForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    colour: '',
    quantity: '',
    size: '',
    price: '',
    category: '',
    subcategory: "",
    productImage: ""
  });
  const initialValue = {
    title: '',
    description: '',
    colour: '',
    quantity: '',
    size: '',
    price: '',
    category: '',
    subcategory: "",
    productImage: "",
    variationType: ""
  }
  const [selectedFile, setSelectedFile] = useState(null)
  const [variationData, setVariationData] = useState({
    ...initialValue,
    variations: []
  })
  const addVariation = () => {
    setVariationData((prevVariationData) => ({
      ...prevVariationData,
      variations: [
        ...prevVariationData.variations,
        {
          size: "",
          price: "",
          color: "",
          length: "",
          weight: ""
        }
      ]
    }))
  }
  const updateVariationEntry = (index, name, selectedValue) => {
    console.log(index, name, selectedValue)
    setVariationData((prevVariationData) => {
      const updatedVariations = [...prevVariationData.variations]
      updatedVariations[index][name] = selectedValue;
      return {
        ...prevVariationData,
        variations: updatedVariations
      }
    })
  }
  console.log(variationData)

  const removeAdvantage = (index) => {
    setVariationData((prevVariationData) => {
      const updatedVariations = [...prevVariationData.variations]
      updatedVariations.splice(index, 1)
      return {
        ...prevVariationData,
        variations: updatedVariations
      }
    })
  }
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const [Category, setCategories] = useState([]);
  const fetchcategories = async () => {
    const response = await axios.get("http://localhost:8083/api/admin/category")
    console.log(response);
    setCategories(response.data.category)

  }

  useEffect(() => {
    fetchcategories();
  }, [])


  const [subcategories, setSubCategories] = useState([]);
  const fetchsubcategories = async () => {
    const response = await axios.get(`http://localhost:8083/api/admin/subcategory?categoryId=${formData.category}`)
    setSubCategories(response.data.subcategory)

  }
  const payload = {
    variations: variationData.variations // Use the array of objects directly
  };
  console.log(JSON.stringify(payload))
  useEffect(() => {
    fetchsubcategories();
  }, [formData.category])

  const { title, description, colour, size, price, category, subcategory, quantity, image, variationType } = formData;
  const formDataa = new FormData();
  formDataa.append("title", title)
  formDataa.append("description", description)
  formDataa.append("color", colour)
  formDataa.append("size", size)
  formDataa.append("price", price)
  formDataa.append("quantity", quantity)
  formDataa.append("category", category)
  formDataa.append("subcategory", subcategory)
  formDataa.append("variationType", variationType)
  formDataa.append("productImage", selectedFile)
  formDataa.append("variations", payload)
 const [variation, setVariation] = useState({
    colors: [],
    price: '',
    quantities: {},
  });


  const handleSubmit = async (e) => {
    e.preventDefault();


    const response = await axios.post("http://localhost:8083/api/admin/product", formDataa, {
      headers: {
        'Content-type': 'multipart/form-data'
      }
    })
    setFormData({
      title: "",
      category: "",
      subcategory: "",
      quantity: "",
      price: "",
      colour: "",
      variationType: ""

    })
    if (response.data.success) {
      toast.success("User Register Successfully")
    }
    console.log(response.data.success)

  }

 const handleQuantityChange = (color, value) => {
    setVariation(prev => ({
      ...prev,
      quantities: {
        ...prev.quantities,
        [color]: value,
      },
    }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  console.log(formData)
  console.log(category);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row className="g-3">
          <Col md={10}>
            <Row className="g-3">
              <Col md={2}>
                <Form.Group controlId="formInput1">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" placeholder="Title" name="title" value={formData.title} onChange={handleChange}


                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="category">
                  <Form.Label>Select Category</Form.Label>
                  <Form.Control as="select" name="category" value={formData.category} onChange={handleChange}>
                    <option>Select Category</option>
                    {
                      Category.map((category) =>
                        <option value={category._id}>{category.title}</option>

                      )
                    }
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={3}>
                {
                  category ? (
                    <Form.Group controlId="subcategories">
                      <Form.Label>Select Sub Category</Form.Label>
                      <Form.Control as="select" name="subcategory" value={formData.subcategory}
                        onChange={handleChange}>
                        <option>Select Sub Category</option>
                        {
                          subcategories.map((xx) =>
                            <option value={xx._id}>{xx.name}</option>

                          )
                        }
                      </Form.Control>
                    </Form.Group>
                  ) : null
                }

              </Col>
              <Col md={3}>
                <Form.Group controlId="category">
                  <Form.Label>Select Variation Type</Form.Label>
                  <Form.Control as="select" name="variationType" value={formData.variationType} onChange={handleChange} required>
                    <option>Select Variation</option>
                    <option value={"sv"}>Simple Variation</option>
                    <option value={"pbs"}>Product By size</option>
                    <option value={"pbl"}>Product By Length</option>
                    <option value={"pbw"}>Product By weight</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

          </Col>
          <Col md={2} >
            <Form.Group controlId="subcategories">
              <Form.Label><h5>Add Variations</h5> </Form.Label>
              <div className="d-flex justify-content-center" style={{ marginRight: "00px" }}>
                <button type="button" className="" onClick={addVariation} >
                  <i
                    className="bi bi-plus-circle text-success fs-3 cursor-pointer" >

                  </i>
                </button>

              </div>
            </Form.Group>
            {/* <Form.Group className="">

            <Form.Label>Add</Form.Label>

            <Button 
              type="button" 
              className="w-100"
              onClick={addVariation}
            >
              
              <i 
              className="bi bi-plus-circle text-success fs-3 cursor-pointer" style={{width:"10px"}} >

              </i>
            </Button>
          </Form.Group> */}
          </Col>
          <Row>
            <Col>
              {/* <div className="d-flex justify-content-end" style={{marginRight:"00px"}}>
              <button type="button" className="" onClick={addVariation} >
                <i 
              className="bi bi-plus-circle text-success fs-3 cursor-pointer" >

              </i>
              </button>
             
            </div> */}


              {variationData.variations.map((variation, index) => (
                <div key={index}>
                  {/* <Row className="g-3">

          <Col md={2}>
            <Form.Group controlId="formInput1">
              <Form.Control type="text" placeholder="Title" name="title" value={formData.title} onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId="formInput1">
              <Form.Control type="text" placeholder="Title" name="title" value={formData.title} onChange={handleChange}
              />
            </Form.Group  >
          </Col>
          <Col md={1}>
            <Form.Group className="mb-2" controlId="formInput1">
              <Form.Control  type="text" placeholder="Title" name="title" value={formData.title} onChange={handleChange}
                // Adds a bottom margin of 0.25rem (4px), you can adjust as needed
               />


            </Form.Group>
          </Col>
          </Row> */}
                  <Row className="g-3">

                    <Col md={10}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      {variationType === "sv" ? (
                      <>
       <Form.Control
        as="select"
        multiple
        value={variation.colors}
        // onChange={handleColorChange}
      >
        <option value="red">Red</option>
        <option value="black">Black</option>
        <option value="yellow">Yellow</option>
        <option value="green">Green</option>
        <option value="orange">Orange</option>
        <option value="pink">Pink</option>
        <option value="grey">Grey</option>
      </Form.Control>

      <Form.Label>Price</Form.Label>
      <Form.Control
        type="text"
        value={variation.price}
        placeholder="Enter price"
        // onChange={handlePriceChange}
      />

      {variation.colors.map(color => (
        <div key={color}>
          <Form.Label>{`${color.charAt(0).toUpperCase() + color.slice(1)} Quantity`}</Form.Label>
          <Form.Control
            type="text"
            value={variation.quantities[color] || ''}
            placeholder={`Enter ${color} quantity`}
            onChange={(e) => handleQuantityChange(color, e.target.value)}
          />
        </div>
      ))}
    </>
) : null}


                        {variationType === "pbs" ? (
                          <Form.Group>
                            <input type="text" value={variation.size} placeholder="Enter size" onChange={(e) => updateVariationEntry(index, "size", e.target.value)} />
                            <input type="text" value={variation.price} placeholder="Enter price" onChange={(e) => updateVariationEntry(index, "price", e.target.value)} />
                            <input type="text" value={variation.color} placeholder="Enter Color" onChange={(e) => updateVariationEntry(index, "color", e.target.value)} />
                          </Form.Group>) : null}
                        {variationType === "pbl" ? (
                          <Form.Group>
                            <input type="text" value={variation.length} placeholder="Enter length" onChange={(e) => updateVariationEntry(index, "length", e.target.value)} />
                            <input type="text" value={variation.price} placeholder="Enter price" onChange={(e) => updateVariationEntry(index, "price", e.target.value)} />
                            <input type="text" value={variation.color} placeholder="Enter Color" onChange={(e) => updateVariationEntry(index, "color", e.target.value)} />
                          </Form.Group>) : null}

                        {
                          variationType === "pbw" ? (
                            <Form.Group>
                              <input type="text" value={variation.weight} placeholder="Enter weight" onChange={(e) => updateVariationEntry(index, "weight", e.target.value)} />
                              <input type="text" value={variation.price} placeholder="Enter price" onChange={(e) => updateVariationEntry(index, "price", e.target.value)} />
                              <input type="text" value={variation.color} placeholder="Enter Color" onChange={(e) => updateVariationEntry(index, "color", e.target.value)} />
                            </Form.Group>) : null
                        }




                        <button type="button" className="btn btn-danger" onClick={() => removeAdvantage(index)}>Remove</button>
                      </div>
                    </Col>
                  </Row>
                </div>

                // </div>
              ))}


            </Col>
          </Row>
          <Row className="g-3 mt-3">
            <Col>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Row>

      </Form>

      {/* {
  Category.map(x=>
    <>
 <h3>{x.title}</h3>
 <h3>{x.description}</h3>
  </>
  )
} */}

    </>
  );
};

// <div className="clr">
// <Container maxWidth="md">
//   <Typography variant="h4" gutterBottom>

//   </Typography>
//   <form onSubmit={handleSubmit}>
//     <Grid container spacing={2}>
//       <Grid item xs={12}>
//         <TextField
//           label="Name"
//           name="title"
//           variant="outlined"
//           fullWidth
//           value={title}
//           onChange={handleChange}
//           required
//         />
//       </Grid>
//       <Grid item xs={12}>
//         <TextField
//           label="description"
//           name="description"
//           variant="outlined"
//           fullWidth
//           type="text"
//           value={description}
//           onChange={handleChange}
//           required
//         />
//       </Grid>
//       <Grid item xs={6}>
//         <TextField
//           label="color"
//           name="color"
//           variant="outlined"
//           fullWidth
//           value={color}
//           onChange={handleChange}
//           required
//         />
//       </Grid>
//       <Grid item xs={6}>
//         <TextField
//           label="size"
//           name="size"
//           variant="outlined"
//           fullWidth
//           value={size}
//           onChange={handleChange}
//           required
//         />
//       </Grid>
//       <Grid item xs={12}>
//         <TextField
//           label="price"
//           name="price"
//           variant="outlined"
//           fullWidth
//           value={price}
//           onChange={handleChange}
//           required
//         />
//       </Grid>

//       <Grid item xs={12}>
//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           fullWidth
//         >
//           Submit
//         </Button>
//       </Grid>
//     </Grid>
//   </form>
// </Container>
// </div>

export default ProductForm;
