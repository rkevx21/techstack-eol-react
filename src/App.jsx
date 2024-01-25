import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [phpInfo, setPhpInfo] = useState(null);
  const [mysqlInfo, setMysqlInfo] = useState(null);
  const [activeTab, setActiveTab] = useState('php');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);

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
    setCurrentPage(1); // Reset to the first page when changing tabs
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentPhpInfo = phpInfo ? phpInfo.slice(indexOfFirstItem, indexOfLastItem) : null;
  const currentMysqlInfo = mysqlInfo ? mysqlInfo.slice(indexOfFirstItem, indexOfLastItem) : null;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Tech Stack EOL</h1>
      <div className="row">
        <div className="col-md-12"> {/* Full-width column */}
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
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-12"> {/* Full-width column */}
          <div className="tab-content">
            <div className={`tab-pane fade ${activeTab === 'php' ? 'show active' : ''}`}>
              {currentPhpInfo ? (
                <div>
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
                      {currentPhpInfo.map((versionInfo, index) => (
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
                  <Pagination className="d-flex justify-content-end">
                    <Pagination.First onClick={() => paginate(1)} />
                    <Pagination.Prev onClick={() => paginate(currentPage - 1)} />
                    {Array.from({ length: Math.ceil(phpInfo.length / itemsPerPage) }, (_, index) => (
                      <Pagination.Item
                        key={index + 1}
                        active={currentPage === index + 1}
                        onClick={() => paginate(index + 1)}
                      >
                        {index + 1}
                      </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={() => paginate(currentPage + 1)} />
                    <Pagination.Last onClick={() => paginate(Math.ceil(phpInfo.length / itemsPerPage))} />
                  </Pagination>
                </div>
              ) : (
                <div className="text-center">
                  <p>Loading PHP information...</p>
                </div>
              )}
            </div>
            <div className={`tab-pane fade ${activeTab === 'mysql' ? 'show active' : ''}`}>
              {currentMysqlInfo ? (
                <div>
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
                      {currentMysqlInfo.map((versionInfo, index) => (
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
                  <Pagination className="d-flex justify-content-end">
                    <Pagination.First onClick={() => paginate(1)} />
                    <Pagination.Prev onClick={() => paginate(currentPage - 1)} />
                    {Array.from({ length: Math.ceil(mysqlInfo.length / itemsPerPage) }, (_, index) => (
                      <Pagination.Item
                        key={index + 1}
                        active={currentPage === index + 1}
                        onClick={() => paginate(index + 1)}
                      >
                        {index + 1}
                      </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={() => paginate(currentPage + 1)} />
                    <Pagination.Last onClick={() => paginate(Math.ceil(mysqlInfo.length / itemsPerPage))} />
                  </Pagination>
                </div>
              ) : (
                <div className="text-center">
                  <p>Loading MySQL information...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
