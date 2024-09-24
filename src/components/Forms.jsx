// src/components/MyForm.js
import React, { useState } from 'react';
import { TextField, Button, Container, Grid, Typography } from '@mui/material';

const MyForm = () => {
  // State to manage form input values
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    comments: ''
  });

  // Handler for input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  // Handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Form submitted with values: ' + JSON.stringify(formValues, null, 2));
    // Implement form submission logic here
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        My Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              name="name"
              variant="outlined"
              fullWidth
              value={formValues.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              variant="outlined"
              fullWidth
              type="email"
              value={formValues.email}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              label="Phone"
              name="phone"
              variant="outlined"
              fullWidth
              value={formValues.phone}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address"
              name="address"
              variant="outlined"
              fullWidth
              value={formValues.address}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Comments"
              name="comments"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={formValues.comments}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
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
  );
};

export default MyForm;
