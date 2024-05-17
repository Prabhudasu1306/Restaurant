import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    axios.post('http://localhost:8080/students/upload-students-data', formData)
      .then(response => {
        console.log(response.data);
        // Handle success
      })
      .catch(error => {
        console.error('Error uploading file: ', error);
        // Handle error
      });
  };

  return (
    <div>
      <h1>Import Students</h1>
      <input type="file" onChange={handleFileChange} accept=".xls,.xlsx" />
      <button onClick={handleUpload}>Import</button>
    </div>
  );
};

export default FileUpload;
