// src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [phpInfo, setPhpInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://endoflife.date/api/php.json');
        console.log('API Response:', response.data);
        setPhpInfo(response.data);
      } catch (error) {
        console.error('Error fetching PHP information:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>PHP End of Life Information</h1>
      {phpInfo ? (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Cycle</th>
              <th>End of Life Date</th>
              <th>Latest Version</th>
              <th>Latest Release Date</th>
              <th>LTS</th>
              <th>Release Date</th>
              <th>Support Date</th>
            </tr>
          </thead>
          <tbody>
            {phpInfo.map((versionInfo, index) => (
              <tr key={index}>
                <td>{versionInfo.cycle}</td>
                <td>{versionInfo.eol}</td>
                <td>{versionInfo.latest}</td>
                <td>{versionInfo.latestReleaseDate}</td>
                <td>{versionInfo.lts.toString()}</td>
                <td>{versionInfo.releaseDate}</td>
                <td>{versionInfo.support}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading PHP information...</p>
      )}
    </div>
  );
};

export default App;
