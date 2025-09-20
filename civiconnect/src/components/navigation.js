import React from 'react';
import { useNavigation } from '../civicconect';

const Navigation = () => {
  useNavigation();
  return (
    <header>
      <nav>
        <div className="logo">CivConnect</div>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/report">Report Issue</a></li>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/map">Map View</a></li>
        </ul>
        <div className="gov-portal">Gov Portal</div>
        <button className="report-btn">📷 Report Now</button>
      </nav>
    </header>
  );
};

export default Navigation;
