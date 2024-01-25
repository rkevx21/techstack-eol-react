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
  const [searchTerm, setSearchTerm] = useState('');

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
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const allPhpInfo = phpInfo ? phpInfo : [];
  const allMysqlInfo = mysqlInfo ? mysqlInfo : [];

  const filterDataBySearch = (data) => {
    return data?.filter((versionInfo) => {
      const valuesToSearch = Object.values(versionInfo);
      return valuesToSearch.some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  };

  const currentPhpInfo = filterDataBySearch(allPhpInfo)?.slice(indexOfFirstItem, indexOfLastItem);
  const currentMysqlInfo = filterDataBySearch(allMysqlInfo)?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container">
      <h1>Tech Stack EOL</h1>
      <div className="row">
        <div className="col-md-12">
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
        <div className="col-md-12">
          <div className="tab-content">
            <div className={`tab-pane ${activeTab === 'php' ? 'fade active show' : 'fade'}`}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              {currentPhpInfo?.length > 0 ? (
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
                    {Array.from({ length: Math.ceil(allPhpInfo.length / itemsPerPage) }, (_, index) => (
                      <Pagination.Item
                        key={index + 1}
                        active={currentPage === index + 1}
                        onClick={() => paginate(index + 1)}
                      >
                        {index + 1}
                      </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={() => paginate(currentPage + 1)} />
                    <Pagination.Last
                      onClick={() => paginate(Math.ceil(allPhpInfo.length / itemsPerPage))}
                    />
                  </Pagination>
                </div>
              ) : (
                <div className="text-center">
                  <p>No results found for your search.</p>
                </div>
              )}
            </div>
            <div className={`tab-pane ${activeTab === 'mysql' ? 'fade active show' : 'fade'}`}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              {currentMysqlInfo?.length > 0 ? (
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
                    {Array.from({ length: Math.ceil(allMysqlInfo.length / itemsPerPage) }, (_, index) => (
                      <Pagination.Item
                        key={index + 1}
                        active={currentPage === index + 1}
                        onClick={() => paginate(index + 1)}
                      >
                        {index + 1}
                      </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={() => paginate(currentPage + 1)} />
                    <Pagination.Last
                      onClick={() => paginate(Math.ceil(allMysqlInfo.length / itemsPerPage))}
                    />
                  </Pagination>
                </div>
              ) : (
                <div className="text-center">
                  <p>No results found for your search.</p>
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
