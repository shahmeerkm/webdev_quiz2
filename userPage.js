import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios'; 
import { useSelector } from 'react-redux';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'first_name', headerName: 'First name', width: 130 },
  { field: 'sur_name', headerName: 'Surname', width: 130 }, 
];

export default function DataTable() {
  const [rows, setRows] = useState({ id: [], first_name: [], sur_name: [] });
  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const response = await axios.get('https://sandbox.practical.me/api/user/profile', {
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          });
          const { data } = response;
          setRows({
            id: data.map((item) => ({ id: item.id })),
            first_name: data.map((item) => ({ id: item.id, first_name: item.first_name })),
            sur_name: data.map((item) => ({ id: item.id, sur_name: item.sur_name })),
          });
        } else {
          console.error('Token not found.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <div style={{ marginBottom: '20px' }}>
        <h3>ID Section</h3>
        <DataGrid rows={rows.id} columns={[columns[0]]} pageSize={5} checkboxSelection />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <h3>First Name Section</h3>
        <DataGrid rows={rows.first_name} columns={[columns[0], columns[1]]} pageSize={5} checkboxSelection />
      </div>
      <div>
        <h3>Surname Section</h3>
        <DataGrid rows={rows.sur_name} columns={[columns[0], columns[2]]} pageSize={5} checkboxSelection />
      </div>
    </div>
  );
}
