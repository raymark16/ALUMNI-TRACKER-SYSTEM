import DataTable from 'react-data-table-component';

const TableUsers = ({users}) => {
    const customStyles = {

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
    <div>
        <h1>Table Data</h1>
        <DataTable
                columns={columns}
                data={users}
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