import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [phpInfo, setPhpInfo] = useState(null);
  const [mysqlInfo, setMysqlInfo] = useState(null);
  const [activeTab, setActiveTab] = useState('php');

  useEffect(() => {
    const fetchData = async (url, setData) => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
      }
    };

    fetchData('https://endoflife.date/api/php.json', setPhpInfo);
    fetchData('https://endoflife.date/api/mysql.json', setMysqlInfo);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Tech Stack EOL</h1>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'php' ? 'active' : ''}`}
            onClick={() => handleTabChange('php')}
          >
            PHP
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'mysql' ? 'active' : ''}`}
            onClick={() => handleTabChange('mysql')}
          >
            MySQL
          </button>
        </li>
      </ul>
      <div className="tab-content mt-3">
        <div className={`tab-pane fade ${activeTab === 'php' ? 'show active' : ''}`}>
          {phpInfo ? (
            <table className="table table-bordered table-hover">
              <thead className="table-dark">
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
            <div className="text-center">
              <p>Loading PHP information...</p>
            </div>
          )}
        </div>
        <div className={`tab-pane fade ${activeTab === 'mysql' ? 'show active' : ''}`}>
          {mysqlInfo ? (
            <table className="table table-bordered table-hover">
              <thead className="table-dark">
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
                {mysqlInfo.map((versionInfo, index) => (
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
            <div className="text-center">
              <p>Loading MySQL information...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
