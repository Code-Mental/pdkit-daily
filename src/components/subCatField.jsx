import {useState,useEffect} from 'react'
import axios from 'axios'
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';


export default function SubCatField() {





    return (
   <>
          <Container className="d-flex justify-content-">

      <Form  className="me-2">
        <Row className="align-items-center">
          <div className="d-flex justify-content-canter">
          <Col md={2}>
          <Form.Group className="me-3">

                <Form.Control as="select" name="colour" value="">
                  <option>Select Category</option>
                  <option>Red</option>
                  <option>Green</option>
                  <option>Blue</option>
                
                </Form.Control>
              </Form.Group>
            </Col>
          <Col xs={12} sm={6} md={2}>
            <Form.Group className="me-3">
              <Form.Label className="visually-hidden">Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                name="field1"
                // value={formData.field1}
                // onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col xs={12} sm={6} md={3}>
          <Form.Group className="me-3">

              <Form.Label className="visually-hidden">Field 2</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                name="field2"
                // value={formData.field2}
                // onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col xs={12} sm={6} md={3}className="d-flex justify-content-">
          <Form.Group className="me-3">
          <Form.Label className="visually-hidden">Field 4</Form.Label>
          <Form.Control type="file"></Form.Control>

            </Form.Group>
          </Col>

          <Col xs={12} sm={6} md={1} className="d-flex justify-content-end">
            <Form.Group className="mb-2">
              <Button variant="primary" type="">
                Submit
              </Button>
            </Form.Group>
          </Col>
          </div>
        </Row>
      </Form>
    </Container>
</>
    
  )
}
