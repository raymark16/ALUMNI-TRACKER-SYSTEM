import DataTable from 'react-data-table-component';
import { saveAs } from 'file-saver';
var docx = require('docx')

const TableUsers = ({users, searchInput, setSearchInput}) => {
    
    const filteredList = users.filter(row =>
        row.email.toLowerCase().includes(searchInput.toLowerCase()) ||
        row.firstname.toLowerCase().includes(searchInput.toLowerCase()) ||
        row.lastname.toLowerCase().includes(searchInput.toLowerCase()) ||
        row.phone.toLowerCase().includes(searchInput.toLowerCase()) ||
        // row.position.toLowerCase().includes(searchInput.toLowerCase()) ||
        row.date_graduated.toLowerCase().includes(searchInput.toLowerCase()) ||
        row.program.toLowerCase().includes(searchInput.toLowerCase())
        )
    
    const createTable = () => {
        const table = new docx.Table({
            columnWidths: [3505, 5505],
            rows: [
            ],
        });
        
        const title = new docx.Paragraph({ text: searchInput != '' ? 'LIST OF ALUMNI FROM ' + searchInput : 'LIST OF ALUMNI', 
        alignment: docx.AlignmentType.CENTER})
        
        const header = new docx.TableRow({
            children: [
                new docx.TableCell({
                    width: {
                        size: 3505,
                        type: docx.WidthType.DXA,
                    },
                    children: [new docx.Paragraph({ text: 'NAME', 
                    alignment: docx.AlignmentType.CENTER})],
                }),
                new docx.TableCell({
                    width: {
                        size: 3505,
                        type: docx.WidthType.DXA,
                    },
                    children: [new docx.Paragraph({ text: 'PROGRAM', 
                    alignment: docx.AlignmentType.CENTER})],
                }),
                new docx.TableCell({
                    width: {
                        size: 3505,
                        type: docx.WidthType.DXA,
                    },
                    children: [new docx.Paragraph({ text: 'DATE GRADUATED', 
                    alignment: docx.AlignmentType.CENTER})],
                }),
                new docx.TableCell({
                    width: {
                        size: 3505,
                        type: docx.WidthType.DXA,
                    },
                    children: [new docx.Paragraph({ text: 'POSITION', 
                    alignment: docx.AlignmentType.CENTER})],
                }),
            ],
            tableHeader: true,
        });

        table.root.push(header);
        
        if (filteredList.length > 0){
            filteredList.forEach(e => {
                var tableRow=new docx.TableRow({
                    children: [
                        new docx.TableCell({
                            width: {
                                size: 3505,
                                type: docx.WidthType.DXA,
                            },
                            children: [new docx.Paragraph(e.lastname + ", " + e.firstname)],
                        }),
                        new docx.TableCell({
                            width: {
                                size: 5505,
                                type: docx.WidthType.DXA,
                            },
                            children: [new docx.Paragraph(e.program)],
                        }),
                        new docx.TableCell({
                            width: {
                                size: 5505,
                                type: docx.WidthType.DXA,
                            },
                            children: [new docx.Paragraph(e.date_graduated)],
                        }),
                        new docx.TableCell({
                            width: {
                                size: 5505,
                                type: docx.WidthType.DXA,
                            },
                            children: [new docx.Paragraph(e.position)],
                        }),
                    ],
                });
                table.root.push(tableRow);
            });
        }else{
            var tableRow=new docx.TableRow({
                children: [
                    new docx.TableCell({
                        columnSpan: 4,
                        children: [new docx.Paragraph({text: "NO AVAILABLE DATA",
                    alignment: docx.AlignmentType.CENTER})],
                    }),
                ]
            })
            table.root.push(tableRow);
        }
        const doc = new docx.Document({
            sections: [
                {
                    children: [
                        title,
                        new docx.Paragraph({
                            children: [],  // Just newline without text
                          }),
                        table,
                    ],
                },
            ],
        });
        
          docx.Packer.toBlob(doc).then((blob) => {
            saveAs(blob, searchInput.length == 4 ? searchInput + " ALUMNI.docx" : searchInput.length > 0 ? searchInput + ".docx" : "FCPC ALUMNI.docx");
            console.log("Document created successfully");
          });
    }

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
        // {
        //     name: 'Position',
        //     selector: row => row.position,
        //     sortable: true,
        // },
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
        <h1>Alumni Data</h1><button onClick={() => {createTable()}}>Print</button>
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