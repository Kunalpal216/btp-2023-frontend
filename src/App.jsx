import React from 'react';
import PaginatedTable from './PaginatedTable';
import axios from 'axios';

function fetchData(page) {
  return axios.get(`https://kunalpal216-btp-api-deploy.hf.space/news?page=${page}`)
    .then(response => response.data.news)
    .catch(error => {
      console.error('Error fetching data:', error);
      return [];
    });
}

function App() {
  return (
    <div>
      <h1>Road Accidents Data</h1>
      <PaginatedTable fetchFunction={fetchData} />
    </div>
  );
}

export default App;