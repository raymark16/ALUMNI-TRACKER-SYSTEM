import DataTable from 'react-data-table-component';
import { useState } from 'react';

const TableUsers = ({users, searchInput, setSearchInput}) => {
    
    const filteredList = users.filter(row =>
        row.email.toLowerCase().includes(searchInput.toLowerCase()) ||
        row.firstname.toLowerCase().includes(searchInput.toLowerCase()) ||
        row.lastname.toLowerCase().includes(searchInput.toLowerCase()) ||
        row.phone.toLowerCase().includes(searchInput.toLowerCase()) ||
        row.position.toLowerCase().includes(searchInput.toLowerCase()) ||
        row.date_graduated.toLowerCase().includes(searchInput.toLowerCase()) ||
        row.program.toLowerCase().includes(searchInput.toLowerCase())
        )
    const customStyles = {
        cell: {
            textOverflow: 'clip', whiteSpace: 'normal'
        },
        table: {
            textOverflow: 'clip', whiteSpace: 'normal',
            style: {
                width:'50vw',
                height:'50vh'
            },
        },
        header: {
            style: {
                fontSize: '3rem'
            }
        },
        head: {
            style: {
                fontSize: '1rem',
                borderTop: '2px solid green',
                borderBottom: '2px solid green',
            }
        }
    }

    const columns = [
        {
            name: 'Firstname',
            selector: row => row.firstname,
            sortable: true,
        },
        {
            name: 'Lastname',
            selector: row => row.lastname,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Phone',
            selector: row => row.phone,
            sortable: true,
        },
        {
            name: 'Position',
            selector: row => row.position,
            sortable: true,
        },
        {
            name: 'Date Graduated',
            selector: row => row.date_graduated
        },
        {
            name: 'Program',
            selector: row => row.program
        }
    ];

  return (
    <div className='mb-5 shadow rounded p-5' style={{backgroundColor:'white'}}>
        <h1>Alumni Data</h1>
        <div className='text-end mb-2'><input type='text'  className='w-25' autoComplete='off' value={searchInput} placeholder='Search' onChange={(e) => setSearchInput(e.target.value)}></input></div>
        <DataTable
                columns={columns}
                data={filteredList}
                pagination
                fixedHeader
                fixedHeaderScrollHeight='50vh'
                responsive='true'
                striped='true'
                highlightOnHover='true'
                customStyles={customStyles}
            />
    </div>
  )
}

export default TableUsers