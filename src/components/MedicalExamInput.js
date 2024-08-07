import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function MedicalExamInput() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [error, setError] = useState('');
  const { currentUser, submitMedicalData } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitMedicalData(currentUser.id, { height, weight, bloodPressure });
      navigate('/results');
    } catch (error) {
      setError('Failed to submit medical data: ' + error.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Height (cm)</Form.Label>
        <Form.Control type="number" required value={height} onChange={(e) => setHeight(e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Weight (kg)</Form.Label>
        <Form.Control type="number" required value={weight} onChange={(e) => setWeight(e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Blood Pressure</Form.Label>
        <Form.Control type="text" required value={bloodPressure} onChange={(e) => setBloodPressure(e.target.value)} />
      </Form.Group>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button type="submit">Submit</Button>
    </Form>
  );
}

export default MedicalExamInput;