import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8083/api/admin/user/login", formData);
            console.log(response.data);
            if (response.data.token) {
                navigate("/");
            }
        } catch (error) {
            console.error("There was an error logging in!", error);
        }
    };

    const { email, password } = formData;

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-70">
            <Row>
                <Col md={12} >
                    <Form onSubmit={onSubmit} className="p-4 border rounded bg-light">
                        <h2 className="mb-2 text-center">Login</h2>
                        <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                placeholder="Enter your email"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                placeholder="Enter your password"
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100">
                            Login
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginForm;