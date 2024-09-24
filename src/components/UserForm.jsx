import {useState,useEffect} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';


import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { renderToStaticNodeStream } from 'react-dom/server';


const UserForm = () => {
  const [formData, setFormData] = useState( {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const {password,confirmPassword}=formData;

  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(password !== confirmPassword){
      toast.error("Password does not match!")
    }
    else{
      const response=await axios.post("http://localhost:8083/api/admin/user",formData)
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      })
     if(response.data.success){
      toast.success("User Register Successfully")
     }
    }
 

  }
const handleChange=(e)=>{
setFormData({...formData,[e.target.name]:e.target.value});
};
  

  return (
    <Container>
      <Row className="justify-content-center">

      <div className='col-md-6'>
      

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>
 
        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm your password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </Form.Group> 

        <Button 
              variant="primary" 
              type="submit" 
              className="w-100 mt-3"
            >
              Submit
            </Button>


      </Form>
      
</div>
</Row>
    </Container>
  );
};

export default UserForm;
