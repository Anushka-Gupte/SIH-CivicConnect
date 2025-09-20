import React from 'react';
import { useReportForm } from '../civicconect';

const ReportForm = () => {
  const { preview, handlePhotoChange, handleChooseFile, handleGetGPS, handleVoiceInput, handleSubmit } = useReportForm();

  return (
    <main className="report">
      <h1>Report a Civic Issue</h1>
      <p>Help improve your community by reporting local problems.</p>
      <form id="reportForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Issue Category</label>
          <select id="category" name="category" required>
            <option value="">Select issue type</option>
            <option value="Pothole">Pothole</option>
            <option value="Garbage">Garbage</option>
            <option value="Streetlight">Streetlight</option>
            <option value="Waterlogging">Waterlogging</option>
          </select>
        </div>
        <div className="form-group">
          <label>Location or GPS</label>
          <input type="text" id="location" name="location" placeholder="Enter location or use GPS" required />
          <button type="button" onClick={handleGetGPS}>📍 Use GPS</button>
        </div>
        <div className="form-group photo">
          <label>Photo Evidence</label>
          <div className="photo-upload">
            <img id="preview" src={preview} alt="Preview" style={{ display: preview ? 'block' : 'none' }} />
            <input type="file" id="photo" name="photo" accept="image/*" capture="camera" onChange={handlePhotoChange} />
            <p>Click to take photo or upload image</p>
            <button type="button" onClick={handleChooseFile}>↑ Choose File</button>
          </div>
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea id="description" name="description" placeholder="Describe the issue in detail..." required></textarea>
          <button type="button" onClick={handleVoiceInput}>🎤 Voice Input</button>
        </div>
        <button type="submit" className="submit-btn">➤ Submit Report</button>
      </form>
    </main>
  );
};

export default ReportForm;
