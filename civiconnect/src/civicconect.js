import { useState, useEffect } from 'react';
import L from 'leaflet';

// Navigation hook: highlights active link using React Router's pathname
export const useNavigation = () => {
  useEffect(() => {
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('nav ul li a');
    links.forEach(link => {
      if (link.pathname === currentPath) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }, []);
};

// Report Form hook
export const useReportForm = (onSubmitCallback) => {
  const [preview, setPreview] = useState('');

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setPreview(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleChooseFile = () => {
    const input = document.getElementById('photo');
    if (input) input.click();
  };

  const handleGetGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const locationInput = document.getElementById('location');
        if (locationInput) {
          locationInput.value = `${position.coords.latitude}, ${position.coords.longitude}`;
        }
      });
    }
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.onresult = (event) => {
      const descriptionInput = document.getElementById('description');
      if (descriptionInput) {
        descriptionInput.value += event.results[0][0].transcript;
      }
    };
    recognition.start();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = document.getElementById('reportForm');
    if (!form) return;

    const formData = new FormData(form);
    try {
      const response = await fetch('/api/issues', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        alert('Issue reported successfully!');
        form.reset();
        setPreview('');
        if (onSubmitCallback) onSubmitCallback();
      } else {
        alert('Failed to report issue.');
      }
    } catch (error) {
      alert('Error reporting issue: ' + error.message);
    }
  };

  return {
    preview,
    handlePhotoChange,
    handleChooseFile,
    handleGetGPS,
    handleVoiceInput,
    handleSubmit
  };
};

// Dashboard hook
export const useDashboard = () => {
  const [issues, setIssues] = useState([]);

  const loadIssues = async (filter = 'All') => {
    try {
      const response = await fetch(`/api/issues?status=${filter}`);
      const data = await response.json();
      setIssues(data);
    } catch (error) {
      console.error('Error loading issues:', error);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await fetch(`/api/issues/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const filterSelect = document.getElementById('filterStatus');
      const filter = filterSelect ? filterSelect.value : 'All';
      loadIssues(filter);
    } catch (error) {
      alert('Error updating status: ' + error.message);
    }
  };

  useEffect(() => {
    loadIssues();
  }, []);

  return { issues, loadIssues, updateStatus };
};

// Map hook
export const useMap = () => {
  useEffect(() => {
    const map = L.map('map').setView([23.3441, 85.3096], 7); // Jharkhand center

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const loadMapMarkers = async (filter = 'All') => {
      try {
        const response = await fetch(`/api/issues?status=${filter}`);
        const issues = await response.json();

        issues.forEach(issue => {
          if (issue.locationLat && issue.locationLng) {
            const color =
              issue.status === 'New' ? 'blue' :
              issue.status === 'In Progress' ? 'orange' :
              issue.status === 'Resolved' ? 'green' : 'red';

            L.circleMarker([issue.locationLat, issue.locationLng], {
              color,
              fillColor: color,
              radius: 8
            }).addTo(map).bindPopup(`${issue.category}: ${issue.description}`);
          }
        });
      } catch (error) {
        console.error('Error loading map markers:', error);
      }
    };

    loadMapMarkers();

    const filterMap = document.getElementById('filterMap');
    if (filterMap) {
      filterMap.addEventListener('change', (e) => {
        map.eachLayer(layer => {
          if (layer instanceof L.CircleMarker) map.removeLayer(layer);
        });
        loadMapMarkers(e.target.value);
      });
    }

    return () => {
      map.remove();
    };
  }, []);
};

