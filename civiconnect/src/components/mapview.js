import React from 'react';
import { useMap } from '../civicconect';

const MapView = () => {
  useMap();
  return (
    <main className="map-view">
      <h1>Live Issue Map</h1>
      <p>Real-time visualization of civic issues across the city</p>
      <div className="map-controls">
        <button id="layersBtn">Layers ▼</button>
        <select id="filterMap">
          <option>All</option>
          <option>High Priority</option>
          <option>In Progress</option>
          <option>Resolved</option>
        </select>
        <div className="legend">
          <h3>Map Legend</h3>
          <ul>
            <li><span className="dot high"></span> High Priority Issues</li>
            <li><span className="dot progress"></span> In Progress Issues</li>
            <li><span className="dot resolved"></span> Resolved Issues</li>
            <li><span className="dot new"></span> New Reports</li>
          </ul>
        </div>
      </div>
      <div id="map" style={{ height: '500px', border: '1px solid #ddd', borderRadius: '10px' }}></div>
      <div className="quick-stats">
        <h3>Quick Stats</h3>
        <p>Issues this week: <span className="stat">24</span></p>
        <p>Most Affected Area: <span className="stat">Downtown</span></p>
        <p>Response Time: <span className="stat">2.1 days</span></p>
      </div>
    </main>
  );
};

export default MapView;
