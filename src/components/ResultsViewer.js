import React, { useEffect, useState } from 'react';
import { Table, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

function ResultsViewer() {
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const { currentUser, fetchMedicalResults } = useAuth();

  useEffect(() => {
    const getResults = async () => {
      try {
        const data = await fetchMedicalResults(currentUser.id);
        setResults(data);
      } catch (error) {
        setError('Failed to fetch results: ' + error.message);
      }
    };
    getResults();
  }, [currentUser, fetchMedicalResults]);

  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!results) return <p>Loading...</p>;

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Metric</th>
          <th>Value</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Height</td>
          <td>{results.height} cm</td>
          <td>{results.heightStatus}</td>
        </tr>
        <tr>
          <td>Weight</td>
          <td>{results.weight} kg</td>
          <td>{results.weightStatus}</td>
        </tr>
        <tr>
          <td>Blood Pressure</td>
          <td>{results.bloodPressure}</td>
          <td>{results.bloodPressureStatus}</td>
        </tr>
        <tr>
          <td>BMI</td>
          <td>{results.bmi}</td>
          <td>{results.bmiStatus}</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default ResultsViewer;