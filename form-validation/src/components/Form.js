import React, { useState } from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters and include a number';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setIsSubmitted(true);
    }
  };

  return (
    <Container className="mt-5">
      {!isSubmitted ? (
        <Card className="p-4 shadow-sm bg-dark text-white">
          <h3 className="text-center mb-3">Create Account</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
                className="bg-secondary text-white border-0"
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                isInvalid={!!errors.phone}
                className="bg-secondary text-white border-0"
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
                className="bg-secondary text-white border-0"
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="light" type="submit" className="w-100 text-dark">
              Submit
            </Button>
          </Form>
        </Card>
      ) : (
        <Alert variant="dark" className="text-center">
          ✅ Created an account
        </Alert>
      )}
    </Container>
  );
};

export default FormComponent;
