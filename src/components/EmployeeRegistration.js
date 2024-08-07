import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Table, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function EmployeeRegistration() {
  const [name, setName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [company, setCompany] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [error, setError] = useState('');
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  const companies = [
    'Acme Corp', 'Globex Corporation', 'Soylent Corp', 'Initech',
    'Umbrella Corporation', 'Hooli', 'Pied Piper', 'Dunder Mifflin',
    'Stark Industries', 'Wayne Enterprises'
  ];

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
    setEmployees(storedEmployees);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const newEmployee = { name, employeeId, company, gender, dateOfBirth };
      const updatedEmployees = [...employees, newEmployee];
      localStorage.setItem('employees', JSON.stringify(updatedEmployees));
      setEmployees(updatedEmployees);
      // Reset form
      setName('');
      setEmployeeId('');
      setCompany('');
      setGender('');
      setDateOfBirth('');
    } catch (error) {
      setError('Failed to register employee: ' + error.message);
    }
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <h2>Register New Employee</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" required value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Employee ID</Form.Label>
              <Form.Control type="text" required value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Company</Form.Label>
              <Form.Control as="select" required value={company} onChange={(e) => setCompany(e.target.value)}>
                <option value="">Select a company</option>
                {companies.map((c, index) => (
                  <option key={index} value={c}>{c}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Gender</Form.Label>
              <Form.Control as="select" required value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control type="date" required value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
            </Form.Group>
            {error && <Alert variant="danger">{error}</Alert>}
            <Button type="submit">Register</Button>
          </Form>
        </Col>
        <Col md={6}>
          <h2>Registered Employees</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Employee ID</th>
                <th>Company</th>
                <th>Gender</th>
                <th>Date of Birth</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={index}>
                  <td>{employee.name}</td>
                  <td>{employee.employeeId}</td>
                  <td>{employee.company}</td>
                  <td>{employee.gender}</td>
                  <td>{employee.dateOfBirth}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default EmployeeRegistration;