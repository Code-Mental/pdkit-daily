import React, { useState, useRef } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const AddProductForm = () => {
    const [formData, setFormData] = useState({
        product_name: '',
        category: '',
        subcategory: '',
        product_id: '',
        length: false,
        width: false,
        height: false,
        neck_girth: false,
        chest_girth: false,
        weight: false,
        image: null // New state for image file
    });

    // Create refs for each input field
    const productNameRef = useRef();
    const categoryRef = useRef();
    const subcategoryRef = useRef();
    const productIdRef = useRef();
    const imageRef = useRef();

    const handleChange = (e) => {
        const { name, type, checked, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        try {
            const response = await axios.post('http://localhost:8083/api/admin/addproduct', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Product added successfully!');
            
            // Reset the form data to initial values
            setFormData({
                product_name: '',
                category: '',
                subcategory: '',
                product_id: '',
                length: false,
                width: false,
                height: false,
                neck_girth: false,
                chest_girth: false,
                weight: false,
                image: null
            });

            // Reset input fields through refs
            productNameRef.current.value = '';
            categoryRef.current.value = '';
            subcategoryRef.current.value = '';
            productIdRef.current.value = '';
            imageRef.current.value = '';
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Failed to add product.');
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Product Name:</Form.Label>
                        <Form.Control
                            type="text"
                            name="product_name"
                            ref={productNameRef}
                            value={formData.product_name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Category:</Form.Label>
                        <Form.Control
                            type="text"
                            name="category"
                            ref={categoryRef}
                            value={formData.category}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Subcategory:</Form.Label>
                        <Form.Control
                            type="text"
                            name="subcategory"
                            ref={subcategoryRef}
                            value={formData.subcategory}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Product ID:</Form.Label>
                        <Form.Control
                            type="text"
                            name="product_id"
                            ref={productIdRef}
                            value={formData.product_id}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Image:</Form.Label>
                        <Form.Control
                            type="file"
                            name="image"
                            ref={imageRef}
                            accept="image/*"
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col md={2}>
                    <Form.Check
                        type="checkbox"
                        name="length"
                        label="Length"
                        checked={formData.length}
                        onChange={handleChange}
                    />
                </Col>
                <Col md={2}>
                    <Form.Check
                        type="checkbox"
                        name="width"
                        label="Width"
                        checked={formData.width}
                        onChange={handleChange}
                    />
                </Col>
                <Col md={2}>
                    <Form.Check
                        type="checkbox"
                        name="height"
                        label="Height"
                        checked={formData.height}
                        onChange={handleChange}
                    />
                </Col>
                <Col md={2}>
                    <Form.Check
                        type="checkbox"
                        name="neck_girth"
                        label="Neck Girth"
                        checked={formData.neck_girth}
                        onChange={handleChange}
                    />
                </Col>
                <Col md={2}>
                    <Form.Check
                        type="checkbox"
                        name="chest_girth"
                        label="Chest Girth"
                        checked={formData.chest_girth}
                        onChange={handleChange}
                    />
                </Col>
                <Col md={2}>
                    <Form.Check
                        type="checkbox"
                        name="weight"
                        label="Weight"
                        checked={formData.weight}
                        onChange={handleChange}
                    />
                </Col>
            </Row>
           
            <Button variant="primary" type="submit">Add Product</Button>
        </Form>
    );
};

export default AddProductForm;
