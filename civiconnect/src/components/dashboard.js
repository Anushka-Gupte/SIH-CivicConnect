import React from 'react';
import { useDashboard } from '../civicconect';

const Dashboard = () => {
  const { issues, loadIssues, updateStatus } = useDashboard();

  return (
    <main className="dashboard">
      <h1>Government Dashboard</h1>
      <p>Manage and track civic issues reported by citizens</p>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Reports</h3>
          <p>{issues.length}</p>
          <span>+12 this week</span>
        </div>
        <div className="stat-card">
          <h3>In Progress</h3>
          <p>{issues.filter(issue => issue.status === 'In Progress').length}</p>
          <span>24 resolved</span>
        </div>
        <div className="stat-card">
          <h3>Resolved</h3>
          <p>{issues.filter(issue => issue.status === 'Resolved').length}</p>
          <span>77% resolution rate</span>
        </div>
        <div className="stat-card">
          <h3>Avg. Response</h3>
          <p>2.3</p>
          <span>days to resolve</span>
        </div>
      </div>
      <div className="issues-list">
        <h2>Issue Reports</h2>
        <select id="filterStatus" onChange={(e) => loadIssues(e.target.value)}>
          <option>All Issues</option>
          <option>New</option>
          <option>In Progress</option>
          <option>Resolved</option>
        </select>
        <ul id="issuesList">
          {issues.map(issue => (
            <li key={issue.id} className="issue-item">
              <div>
                <strong>{issue.id}</strong> - {issue.category} ({issue.status})
                <p>{issue.description}</p>
                <small>📍 {issue.location} | 📅 {new Date(issue.createdAt).toLocaleString()} | 👤 {issue.reporter || 'Anonymous'} | 👍 {issue.votes || 0}</small>
              </div>
              <div>
                <button onClick={() => updateStatus(issue.id, issue.status === "New" ? "In Progress" : "Resolved")}>
                  Update Status
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Dashboard;
