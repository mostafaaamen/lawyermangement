import React, { useState } from 'react';
import { postData } from '../backend/postData';
import '../styles/CreateFileLawsuites.css';  // Make sure to import the CSS file

function CreateFileLawsuites({ id }) {
  const [formDataFile, setFormDataFile] = useState({
    title: '',
    file: null,
    nots: '',
    fileName: '',  // Store the selected file name
  });

  const handleChangeFile = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFormDataFile({
        ...formDataFile,
        [name]: files[0],  // Update file state with the selected file
        fileName: files[0] ? files[0].name : '',  // Show the selected file name
      });
    } else {
      setFormDataFile({
        ...formDataFile,
        [name]: value,
      });
    }
  };

  const sendDataFile = async (e) => {
    e.preventDefault();  // Prevent default form submission

    const formData = new FormData();
    formData.append('title', formDataFile.title);
    formData.append('nots', formDataFile.nots);
    formData.append('file', formDataFile.file);  // Append the file to the form data

    try {
      const response = await fetch(`http://localhost:3001/api/filesLawsuites/${id}`, {
        method: 'POST',
        body: formData,  // Send form data
      });

      if (!response.ok) {
        throw new Error('Error uploading file');
      }
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again.');
    }
  };
  return (
    <div className="createFileLawsuites">
      <form onSubmit={sendDataFile} encType="multipart/form-data">
        <input
          type="text"
          name="title"
          placeholder="File title"
          value={formDataFile.title}
          onChange={handleChangeFile}
          required
        />
        <div className="file-upload">
          <input
            type="file"
            name="file"
            accept=".pdf, .jpg, .jpeg, .png, .gif"
            onChange={handleChangeFile}
            required
          />
          <button type="button" className="file-upload-button">
            Choose File
          </button>
        </div>

        {/* Display selected file name */}
        <div className="file-name">
          {formDataFile.fileName && <span>Selected file: {formDataFile.fileName}</span>}
        </div>

        <textarea
          name="nots"
          placeholder="Notes"
          value={formDataFile.nots}
          onChange={handleChangeFile}
          required
        ></textarea>

        <button type="submit">Upload Files</button>
      </form>
    </div>
  );
}

export default CreateFileLawsuites;
