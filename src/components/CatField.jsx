import {useState,useEffect,useRef} from 'react'
import axios from 'axios'
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import CategoryTable from "./CategoryTable"


export default function CatField() {
  const [formData,setCatField]=useState({
    title: "",
    description: "",
    categoryImage: ""
  });
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange=(event)=>{
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  }
  const {title,description,categoryImage}=formData;
  const formDataa =new FormData();

  formDataa.append("title",title)
  formDataa.append("description",description)
  formDataa.append("categoryImage",file)

  const handleSubmit=async(e)=>{
    e.preventDefault();
  const response=await axios.post("http://localhost:8083/api/admin/category",formDataa,{  
    headers:{   
      'Contect-type':'multipart/form-data'
    }
  })
  setCatField({
    title: "",
    description: "",
    categoryImage: "",
  })
    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  
if(response.data.success){
alert("Category Dded Successfully!")
}

  }

const handleChange=(e)=>{
  setCatField({...formData,[e.target.name]:e.target.value})
}
  



    return (
   <>
        <Container className="d-flex justify-content-">

      <Form onSubmit={handleSubmit} className="m-2">
        <Row className="align-items-center">
          <div className="d-flex justify-content-canter">
          <Col xs={12} sm={6} md={3}>
            <Form.Group className="me-3">
              <Form.Label className="visually-hidden">Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col xs={12} sm={6} md={5}>
          <Form.Group className="me-3">

              <Form.Label className="visually-hidden">Field 2</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          {/* <Col xs={12} sm={6} md={3}>
          <Form.Group className="me-3">

          <Form.Label className="visually-hidden">Field 3</Form.Label>
              <Form.Select
                name="field3"
                value={formData.field3}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                {
                  Category.map((category) =>
                    <option value={category._id}>{category.title}</option>

                  )
                }
              </Form.Select>
              </Form.Group>
              </Col> */}

           <Col xs={12} sm={6} md={4}className="d-flex justify-content-">
          <Form.Group className="me-3">
          <Form.Label className="visually-hidden">Field 4</Form.Label>
          <Form.Control type="file" name="categoryImage"   ref={fileInputRef}             
  onChange={handleFileChange}></Form.Control>

            </Form.Group>
          </Col> 

          <Col xs={12} sm={6} md={1} className="d-flex justify-content-end">
            <Form.Group className="mb-2">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form.Group>
          </Col>
          </div>
        </Row>
      </Form>
    </Container>
    <CategoryTable dataa={formData}/>

    {/* <input 
      type="text"
      name="title"
      value={CatField.title}
      onChange={handleChange}
    />


  <Button onClick={handleSubmit}>
      
        Submit
      </Button> */}



</>
    
  )
}
