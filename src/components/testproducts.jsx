import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const checkboxStyle = {
  width: '30px',  // Adjust width as needed
  height: '30px', // Adjust height as needed
};

function TestProducts() {
  const initialFormData = {
    firstName: '',
    category: '',
    subcategory: '',
    product_id: '',

    dynamicFields1: [{
      price: '', // Changed from phone to price
      colors: { green: '', black: '', blue: '', red: '', yellow: '', brown: '', pink: '', sky: '', grey: '', multiColor: '', orange: '', purple: '', white: '' },
      selectedColors: {}
    }],
    dynamicFields2: [{
      size: '',
      lenght: '',
      width: '',
      height: '',
      price: '',

      colors: { green: '', black: '', blue: '', red: '', yellow: '', brown: '', pink: '', sky: '', grey: '', multiColor: '', orange: '', purple: '', white: '' },
      selectedColors: {}
    }],
    dynamicFields3: [{
      weight: '',
      length: '',
      width: '',
      height: '',
      price: '',
      size: "",

      colors: { green: '', black: '', blue: '', red: '', yellow: '', brown: '', pink: '', sky: '', grey: '', multiColor: '', orange: '', purple: '', white: '' },
      selectedColors: {}
    }],
    dynamicFields4: [{
      chest_girth: '',
      neck_girt: '',
      size: '',
      price: '',
      colors: { green: '', black: '', blue: '', red: '', yellow: '', brown: '', pink: '', sky: '', grey: '', multiColor: '', orange: '', purple: '', white: '' },
      selectedColors: {}
    }],
    dynamicFields5: [{
      chest_girth: '',
      neck_girth: '',
      size: '',
      price: '',
      colors: { green: '', black: '', blue: '', red: '', yellow: '', brown: '', pink: '', sky: '', grey: '', multiColor: '', orange: '', purple: '', white: '' },
      selectedColors: {}
    }],
    dynamicFields6: [{
      width: '',
      height: '',
      price: "",
    size: "",

      colors: { green: '', black: '', blue: '', red: '', yellow: '', brown: '', pink: '', sky: '', grey: '', multiColor: '', orange: '', purple: '', white: '' },
      selectedColors: {}
    }],
    dynamicFields7: [{
      length: '',
      width: '',
      size: '',
      colors: {
        green: '', black: '', blue: '', red: '', yellow: '',
        brown: '', pink: '', sky: '', grey: '', multiColor: '',
        orange: '', purple: '', white: ''
      },
      selectedColors: {}
    }],
    dynamicFields8: [{
      length: '',
      height: '',
      size: '',
      price: '',
      colors: {
        green: '', black: '', blue: '', red: '', yellow: '',
        brown: '', pink: '', sky: '', grey: '', multiColor: '',
        orange: '', purple: '', white: ''
      },
      selectedColors: {}
    }],
    dynamicFields9: [{
      length: '',
      width: '',
      height: '',
      size: '',
      price: '',
      colors: {
        green: '', black: '', blue: '', red: '', yellow: '',
        brown: '', pink: '', sky: '', grey: '', multiColor: '',
        orange: '', purple: '', white: ''
      },
      selectedColors: {}
    }]
  };

  const [formData, setFormData] = useState(initialFormData);
  const [submittedData, setSubmittedData] = useState(null);
  const [selectedFieldSet, setSelectedFieldSet] = useState('');
  const [product, setProduct] = useState(null)

  const handleChange = (e, index, field, dynamicFieldSet) => {
    const { value } = e.target;
    console.log(value)
    const updatedDynamicFields = [...formData[dynamicFieldSet]];
    updatedDynamicFields[index] = {
      ...updatedDynamicFields[index],
      [field]: value
    };
    setFormData({
      ...formData,
      [dynamicFieldSet]: updatedDynamicFields
    });
  };

  const handleColorCheckboxChange = (e, index) => {
    const { name, checked } = e.target;
    const updatedDynamicFields = [...formData[selectedFieldSet]];
    updatedDynamicFields[index] = {
      ...updatedDynamicFields[index],
      selectedColors: {
        ...updatedDynamicFields[index].selectedColors,
        [name]: checked
      }
    };
    if (checked && updatedDynamicFields[index].colors[name] === '') {
      updatedDynamicFields[index].colors[name] = '';
    }
    setFormData({
      ...formData,
      [selectedFieldSet]: updatedDynamicFields
    });
  };

  const handleColorInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedDynamicFields = [...formData[selectedFieldSet]];
    updatedDynamicFields[index] = {
      ...updatedDynamicFields[index],
      colors: {
        ...updatedDynamicFields[index].colors,
        [name]: value
      }
    };
    setFormData({
      ...formData,
      [selectedFieldSet]: updatedDynamicFields
    });
  };

  const handleAddField = (dynamicFieldSet, initialValues) => {
    setFormData({
      ...formData,
      [dynamicFieldSet]: [...formData[dynamicFieldSet], initialValues]
    });
  };

  const handleRemoveField = (index, dynamicFieldSet) => {
    const updatedDynamicFields = formData[dynamicFieldSet].filter((_, i) => i !== index);
    setFormData({
      ...formData,
      [dynamicFieldSet]: updatedDynamicFields
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFieldSet) {
      alert('Please select a dynamic field set to submit.');
      return;
    }

    // Validate that each dynamic field has at least one color with a numeric value
    const isValid = formData[selectedFieldSet].every(field => {
      return Object.keys(field.selectedColors).some(color =>
        field.selectedColors[color] && field.colors[color] !== ''
      );
    });

    if (!isValid) {
      alert('Please ensure that every dynamic field has at least one color with a numeric value.');
      return;
    }

    const dataToSubmit = {
      firstName: formData.firstName,
      category: product.category,
      subcategory: product.subcategory,
      product_id: product.product_id,


      [selectedFieldSet]: formData[selectedFieldSet]
    };

    try {
      console.log('Submitting data:', dataToSubmit); // Debugging line
      const response = await axios.post('http://localhost:8083/api/admin/product1', dataToSubmit, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      alert('Data submitted successfully!');
      setSubmittedData(response.data);

      // Reset form data
      setFormData(initialFormData);
      setSelectedFieldSet('');
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const fetchSngleProduct = async () => {
    const response = await axios.get(`http://localhost:8083/api/admin/product1/getProduct?title=${formData.firstName}`)
    setProduct(response?.data?.product)
  }
  // Use useEffect to trigger API call when firstName changes
  useEffect(() => {
    if (formData.firstName) {
      fetchSngleProduct();
    }
  }, [formData.firstName]);

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={2}>
            <Form.Group>
              <Form.Label>Product Title:</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData?.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group>
              <Form.Label>Product Id:</Form.Label>
              <Form.Control
                type="text"
                name="product_id"
                value={product?.product_id}
                disabled
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group>
              <Form.Label>Category:</Form.Label>
              <Form.Control
                type="text"
                name="product_id"
                value={product?.category}
                disabled
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group>
              <Form.Label>Sub Category:</Form.Label>
              <Form.Control
                type="text"
                name="product_id"
                value={product?.subcategory}
                disabled
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group>
              <Form.Label>Product Id:</Form.Label>
              <Form.Control
                type="text"
                name="product_id"
                value={product?.product_id}
                disabled
              />
            </Form.Group>
          </Col>
          <Col md={2} style={{ marginTop: "20px" }}>
            {
              product?.image ? (
                <img src={`http://localhost:8083/uploads/${product?.image}`} height={"100px"} width={"100px"} alt={product?.firstName} />

              ) : null
            }
          </Col>
          {product ? (
            <Col md={6}>
              <Form.Group>
                <Form.Label>Select Product Variation</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedFieldSet}
                  onChange={(e) => setSelectedFieldSet(e.target.value)}
                >
                  <option value="" disabled hidden>Variation Type</option>

                  {(() => {
                    const { weight, neck_girth, chest_girth, length, width, height } = product || {};
                    if (weight && neck_girth && chest_girth && length && width && height) {
                      return <option value="dynamicFields2">Product By Length, Width, Height, Weight, N&C</option>;
                    }
                    if (weight && length && width && height) {
                      return <option value="dynamicFields3">Product By Length, Width, Height, Weight</option>;
                    }
                    if (length && width && height) {
                      return <option value="dynamicFields9">Product By Length, Width & Height</option>; // New option
                    }
                    if (neck_girth && chest_girth) {
                      return <option value="dynamicFields4">N & C Girth</option>;
                    }
                    if (weight) {
                      return <option value="dynamicFields5">Weight</option>;
                    }
                    if (width && height) {
                      return <option value="dynamicFields6">Product By Width, Height</option>;
                    }
                    if (length && width) {
                      return <option value="dynamicFields7">Product By Length, Width</option>;
                    }
                    if (length && height) {
                      return <option value="dynamicFields8">Product By Length, Height</option>;
                    }
                    // Default to Simple Product if no conditions are met
                    return <option value="dynamicFields1">Simple Product</option>;
                  })()}

                </Form.Control>
              </Form.Group>
            </Col>
          ) : null}





        </Row>

        {selectedFieldSet && formData[selectedFieldSet].map((field, index) => (
          <Row key={index} className="mb-4 border p-3 rounded align-items-center">
            <Col md={12} className="mt-3">
              <div className="d-flex align-items-center flex-wrap">
                <h4 className="me-3">Select Colors:</h4>
                {['green', 'black', 'blue', 'red', 'yellow', 'brown', 'pink', 'sky', 'grey', 'multiColor', 'orange', 'purple', 'white'].map(color => {
                  const isChecked = field.selectedColors[color] || false;

                  return (
                    <label
                      key={color}
                      style={{
                        position: 'relative',
                        paddingLeft: '60px', // Adjust padding for larger checkbox
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        margin: '0 5px', // Add margin for spacing between checkboxes
                      }}
                    >
                      <input
                        type="checkbox"
                        name={color}
                        checked={isChecked}
                        onChange={(e) => handleColorCheckboxChange(e, index)}
                        style={{ display: 'none' }} // Hide the default checkbox
                      />
                      <span
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          width: '50px', // Increased width
                          height: '50px', // Increased height
                          border: `3px solid ${color === 'multiColor' ? 'darkgrey' : (color === 'white' ? 'black' : (color === 'sky' ? 'skyblue' : color))}`,
                          borderRadius: '4px',
                          backgroundColor: isChecked ? (color === 'multiColor' ? 'transparent' : color) : 'transparent',
                          background: color === 'multiColor' && isChecked
                            ? 'linear-gradient(to right, red, yellow, blue, green, purple)' // Gradient for multicolor
                            : 'transparent',
                          transition: 'background-color 0.3s, border-color 0.3s',
                          borderImage: color === 'multiColor' && isChecked
                            ? 'linear-gradient(to right, red, yellow, blue, green, purple) 1'
                            : 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: isChecked ? 'white' : 'black',
                          fontSize: '12px',
                        }}
                      >
                        {color === 'multiColor' ? 'MC' : color.charAt(0).toUpperCase() + color.slice(1)}
                      </span>
                    </label>
                  );
                })}
              </div>

              <div className="mt-3">
                <h4>Color Quantities:</h4>
                <Row>
                  {['green', 'black', 'blue', 'red', 'yellow', 'brown', 'pink', 'sky', 'grey', 'multiColor', 'orange', 'purple', 'white'].map(color => (
                    field.selectedColors[color] && (
                      <Col md={2} key={color}>
                        <Form.Group style={{ marginBottom: '1px' }}> {/* Adjust the value as needed */}
                          <Form.Label>{color.charAt(0).toUpperCase() + color.slice(1)}:</Form.Label>
                          <Form.Control
                            type="number"
                            name={color}
                            value={field.colors[color] || ''} // Ensure controlled input
                            onChange={(e) => handleColorInputChange(e, index)}
                            placeholder="0"
                            style={{
                              width: '50%', // Set width to 50% or any desired size
                              borderColor: color === 'white' ? 'black' : (field.selectedColors[color] ? color : 'initial'),
                              borderWidth: '2px',
                              color: color === 'white' ? 'black' : color, // Set text color to match the border
                            }}
                            onFocus={(e) => e.target.placeholder = ''} // Clear placeholder on focus
                            onBlur={(e) => {
                              if (!e.target.value) {
                                e.target.placeholder = '0'; // Restore placeholder if input is empty
                              }
                            }}
                          />
                        </Form.Group>



                      </Col>
                    )
                  ))}
                </Row>
              </div>
            </Col>


            {/* Dynamic Field Set Specific Controls */}
            {selectedFieldSet === 'dynamicFields1' && (
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Price:</Form.Label>
                  <Form.Control
                    type="text" // Or use "number" if you want to enforce numeric input
                    value={field.price} // Changed from field.phone to field.price
                    onChange={(e) => handleChange(e, index, 'price', selectedFieldSet)} // Changed from 'phone' to 'price'
                  />
                </Form.Group>
              </Col>


            )}
            {selectedFieldSet === 'dynamicFields2' && (
              <>

                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Size:</Form.Label>
                    <Form.Control
                      as="select"  // Changed from input to select
                      value={field.size}
                      onChange={(e) => handleChange(e, index, 'size', selectedFieldSet)}
                    >
                      <option value="">Select Size</option>
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                      <option value="extraLarge">Extra Large</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Length:</Form.Label>
                    <Form.Control
                      type="text"
                      value={field.length}
                      onChange={(e) => handleChange(e, index, 'length', selectedFieldSet)}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Neck Girth:</Form.Label>
                    <Form.Control
                      type="text"
                      value={field.neck_girth}
                      onChange={(e) => handleChange(e, index, 'neck_girth', selectedFieldSet)}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Chest Girth:</Form.Label>
                    <Form.Control
                      type="text"
                      value={field.chest_girth}
                      onChange={(e) => handleChange(e, index, 'chest_girth', selectedFieldSet)}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Width:</Form.Label>
                    <Form.Control
                      type="text"
                      value={field.width}
                      onChange={(e) => handleChange(e, index, 'width', selectedFieldSet)}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Height:</Form.Label>
                    <Form.Control
                      type="text"
                      value={field.height}
                      onChange={(e) => handleChange(e, index, 'height', selectedFieldSet)}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Price:</Form.Label>
                    <Form.Control
                      type="number"
                      value={field.price}
                      onChange={(e) => handleChange(e, index, 'price', selectedFieldSet)}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Weight:</Form.Label>
                    <Form.Control
                      type="text"
                      value={field.weight}
                      onChange={(e) => handleChange(e, index, 'weight', selectedFieldSet)}
                    />
                  </Form.Group>
                </Col>
              </>
            )}
            {selectedFieldSet === 'dynamicFields3' && (
              <>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Size:</Form.Label>
                    <Form.Control
                      as="select"  // Changed from input to select
                      value={field.size}
                      onChange={(e) => handleChange(e, index, 'size', selectedFieldSet)}
                    >
                      <option value="">Select Size</option>
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                      <option value="extraLarge">Extra Large</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Weight:</Form.Label>
                    <Form.Control
                      type="text"
                      value={field.weight} // Assuming you have field.name
                      onChange={(e) => handleChange(e, index, 'weight', selectedFieldSet)}
                    />
                  </Form.Group>
                </Col>


                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Length:</Form.Label>
                    <Form.Control
                      type="text"
                      value={field.length} // Assuming you have field.length
                      onChange={(e) => handleChange(e, index, 'length', selectedFieldSet)}
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Width:</Form.Label>
                    <Form.Control
                      type="text"
                      value={field.width} // Assuming you have field.width
                      onChange={(e) => handleChange(e, index, 'width', selectedFieldSet)}
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Height:</Form.Label>
                    <Form.Control
                      type="text"
                      value={field.height} // Assuming you have field.height
                      onChange={(e) => handleChange(e, index, 'height', selectedFieldSet)}
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Price:</Form.Label>
                    <Form.Control
                      type="number"
                      value={field.price} // Assuming you have field.price
                      onChange={(e) => handleChange(e, index, 'price', selectedFieldSet)}
                    />
                  </Form.Group>
                </Col>
              </>
            )}
            {selectedFieldSet === 'dynamicFields4' && (
              <>

                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Size:</Form.Label>
                    <Form.Control
                      as="select"
                      value={field.size}
                      onChange={(e) => handleChange(e, index, 'size', selectedFieldSet)}
                    >

                      <option value="Select Size">Select Size</option>

                      <option value="extra-small">Extra Small</option>
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                      <option value="extra-large">Extra Large</option>
                      <option value="extra-extra-large">Extra Extra Large</option>
                    </Form.Control>
                  </Form.Group>
                </Col>



                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Neck Girth:</Form.Label>
                    <Form.Control
                      type="text"
                      value={field.neck_girt}
                      onChange={(e) => handleChange(e, index, 'neck_girt', selectedFieldSet)}
                    />

                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Chest Girth:</Form.Label>
                    <Form.Control
                      type="text"
                      value={field.chest_girth}
                      onChange={(e) => handleChange(e, index, 'chest_girth', selectedFieldSet)}
                    />

                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Price:</Form.Label>
                    <Form.Control
                      type="price"
                      value={field.price}
                      onChange={(e) => handleChange(e, index, 'price', selectedFieldSet)}
                    />
                  </Form.Group>
                </Col>

              </>
            )}
            {selectedFieldSet === 'dynamicFields5' && (
              <>

                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Size:</Form.Label>
                    <Form.Control
                      as="select"
                      value={field.size}
                      onChange={(e) => handleChange(e, index, 'size', selectedFieldSet)}
                    >
                      <option value="extra-small">Extra Small</option>
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                      <option value="extra-large">Extra Large</option>
                      <option value="extra-extra-large">Extra Extra Large</option>
                    </Form.Control>
                  </Form.Group>
                </Col>



                {/* <Col md={3}>
                  <Form.Group>
                    <Form.Label>Neck Girth:</Form.Label>
                    <Form.Control
                      type="text"
                      value={field.neck_girth}
                      onChange={(e) => handleChange(e, index, 'neck_girth', selectedFieldSet)}
                    />

                  </Form.Group>
                </Col> */}

                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Weight:</Form.Label>
                    <Form.Control
                      type="text"
                      value={field.weight}
                      onChange={(e) => handleChange(e, index, 'weight', selectedFieldSet)}
                    />

                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Price:</Form.Label>
                    <Form.Control
                      type="text"
                      value={field.price}
                      onChange={(e) => handleChange(e, index, 'price', selectedFieldSet)}
                    />
                  </Form.Group>
                </Col>

              </>
            )}
            {selectedFieldSet === 'dynamicFields6' && (
              <>

                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Size:</Form.Label>
                    <Form.Control
                      as="select"
                      value={field.size}
                      onChange={(e) => handleChange(e, index, 'size', selectedFieldSet)}
                    >
                      <option value="extra-small">Extra Small</option>
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                      <option value="extra-large">Extra Large</option>
                      <option value="extra-extra-large">Extra Extra Large</option>
                    </Form.Control>
                  </Form.Group>
                </Col>


{/* 
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Length:</Form.Label>
                    <Form.Control
                      type="text"
                      value={field.length}
                      onChange={(e) => handleChange(e, index, 'length', selectedFieldSet)}
                    />

                  </Form.Group>
                </Col> */}

                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Width:</Form.Label>
                    <Form.Control
                      type="text"
                      value={field.width}
                      onChange={(e) => handleChange(e, index, 'width', selectedFieldSet)}
                    />

                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Height:</Form.Label>
                    <Form.Control
                      type="text"
                      value={field.height}
                      onChange={(e) => handleChange(e, index, 'height', selectedFieldSet)}
                    />

                  </Form.Group>
                </Col>





                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Price:</Form.Label>
                    <Form.Control
                      type="price"
                      value={field.price}
                      onChange={(e) => handleChange(e, index, 'price', selectedFieldSet)}
                    />
                  </Form.Group>
                </Col>

              </>
            )}

            {selectedFieldSet === 'dynamicFields7' && (
              <>

                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Size:</Form.Label>
                    <Form.Control
                      as="select"
                      value={field.size}
                      onChange={(e) => handleChange(e, index, 'size', selectedFieldSet)}
                    >
                      <option value="extra-small">Extra Small</option>
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                      <option value="extra-large">Extra Large</option>
                      <option value="extra-extra-large">Extra Extra Large</option>
                    </Form.Control>
                  </Form.Group>
                </Col>



                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Lenght:</Form.Label>
                    <Form.Control
                      type="text"
                      value={field.description}
                      onChange={(e) => handleChange(e, index, 'description', selectedFieldSet)}
                    />

                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Width:</Form.Label>
                    <Form.Control
                      type="text"
                      value={field.description}
                      onChange={(e) => handleChange(e, index, 'description', selectedFieldSet)}
                    />

                  </Form.Group>
                </Col>







                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Price:</Form.Label>
                    <Form.Control
                      type="price"
                      value={field.price}
                      onChange={(e) => handleChange(e, index, 'date', selectedFieldSet)}
                    />
                  </Form.Group>
                </Col>

              </>
            )}

        

            {selectedFieldSet === 'dynamicFields8' && (
              <>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Size:</Form.Label>
                    <Form.Control
                      as="select"
                      value={field.size}
                      onChange={(e) => handleChange(e, index, 'size', selectedFieldSet)}
                    >
                      <option value="extra-small">Extra Small</option>
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                      <option value="extra-large">Extra Large</option>
                      <option value="extra-extra-large">Extra Extra Large</option>
                    </Form.Control>
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Length:</Form.Label>
                    <Form.Control
                      type="text"
                      value={field.length} // Change as needed
                      onChange={(e) => handleChange(e, index, 'length', selectedFieldSet)}
                    />
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Height:</Form.Label>
                    <Form.Control
                      type="text"
                      value={field.height} // Add height field
                      onChange={(e) => handleChange(e, index, 'height', selectedFieldSet)}
                    />
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Price:</Form.Label>
                    <Form.Control
                      type="text" // Changed to type="text" from "price"
                      value={field.price}
                      onChange={(e) => handleChange(e, index, 'price', selectedFieldSet)}
                    />
                  </Form.Group>
                </Col>
              </>
            )}

            {selectedFieldSet === 'dynamicFields9' && (
              <>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Size:</Form.Label>
                    <Form.Control
                      as="select"
                      value={field.size}
                      onChange={(e) => handleChange(e, index, 'size', selectedFieldSet)}
                    >
                      <option value="extra-small">Extra Small</option>
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                      <option value="extra-large">Extra Large</option>
                      <option value="extra-extra-large">Extra Extra Large</option>
                    </Form.Control>
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Length:</Form.Label>
                    <Form.Control
                      type="text"
                      value={field.length} // Change as needed
                      onChange={(e) => handleChange(e, index, 'length', selectedFieldSet)}
                    />
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Width:</Form.Label>
                    <Form.Control
                      type="text"
                      value={field.width} // Change as needed
                      onChange={(e) => handleChange(e, index, 'width', selectedFieldSet)}
                    />
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Height:</Form.Label>
                    <Form.Control
                      type="text"
                      value={field.height} // Add height field
                      onChange={(e) => handleChange(e, index, 'height', selectedFieldSet)}
                    />
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Price:</Form.Label>
                    <Form.Control
                      type="text" // Changed to type="text" from "price"
                      value={field.price}
                      onChange={(e) => handleChange(e, index, 'price', selectedFieldSet)}
                    />
                  </Form.Group>
                </Col>
              </>
            )}


            <Col md={12} className="d-flex justify-content-end mt-2">
              <Button
                variant="primary"
                type="button"
                onClick={() => {
                  handleAddField(selectedFieldSet, { ...initialFormData[selectedFieldSet][0] });

                  // Use setTimeout to ensure the content is added before scrolling
                  setTimeout(() => {
                    window.scrollTo(0, document.body.scrollHeight);
                  }, 100); // Adjust the delay if necessary
                }}
              >
                Add New {selectedFieldSet.replace('dynamicFields', ' ')}
              </Button>




              <Button
                variant="danger"
                type="button"
                onClick={() => handleRemoveField(index, selectedFieldSet)}
                className="ms-2"
              >
                Remove
              </Button>
            </Col>
          </Row>
        ))}

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      {submittedData && (
        <div className="mt-4">
          <h4>Submitted Data:</h4>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </Container>
  );
}

export default TestProducts;
