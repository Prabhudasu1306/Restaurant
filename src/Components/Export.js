import axios from 'axios';
import { Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

function Export() {
  const [error, setError] = useState(null);

  const exportToExcel = async () => {
    try {
      const response = await axios({
        url: 'http://localhost:8080/customers/export-to-excel',
        method: 'GET',
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'customer_details.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error while exporting to Excel:', error);
      setError('There was an error exporting data. Please try again later.');
    }
  };

  return (
    <div className="Export">
      <h6>Exporting the customer data</h6>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button variant="primary" onClick={exportToExcel}>
        Export
      </Button>
    </div>
  );
}

export default Export;
