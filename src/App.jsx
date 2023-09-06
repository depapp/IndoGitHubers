import { useState, useEffect } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Avatar } from 'primereact/avatar'
import { InputText } from 'primereact/inputtext'
import { FilterMatchMode } from 'primereact/api'
import { Analytics } from '@vercel/analytics/react'

export default function App() {
    const [isLoading, setIsLoading] = useState(true)

    const [data, setData] = useState([])

    useEffect(() => {
        fetch("https://raw.githubusercontent.com/depapp/0o0/main/data.json")
          .then((response) => response.json())
          .then((data) => {
            const dataWithRank = data.map((item, index) => ({
              ...item,
              rank: index + 1
            }))
            setData(dataWithRank)
            setIsLoading(false)
          })
    }, [])

    const formatNumberWithThousandsSeparator = (number) => {
        return number.toLocaleString()
    }

    const [filters, setFilters] = useState({
        global: { value: null, matchMode:FilterMatchMode.CONTAINS }
    })

    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText
                        placeholder='Keyword Search'
                        onInput={(e) =>
                        setFilters({
                            global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS }
                        })}
                    />
                </span>
            </div>
        )
    }

    const header = renderHeader()

    return (
        <div className="card">
            <Analytics />
            <h1>IndoGitHubers</h1>
            {isLoading ? <div>Loading...</div> : 
            <DataTable 
                value={data}
                tableStyle={{ minWidth: '50rem' }}
                paginator rows={10} rowsPerPageOptions={[10, 25, 50]}
                filters={filters}
                header={header}
                removableSort
                sortField="followers"
            >
                <Column
                    field="rank"
                    header="Rank"
                    style={{ width: '3%' }}
                />
                <Column
                    field="avatarUrl"
                    header="Name"
                    style={{ width: '25%' }}
                    body={(rowData) => (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar
                                image={rowData.avatarUrl}
                                shape='circle'
                                size='large'
                            />
                            <span style={{ marginLeft: '10px' }}>
                                {rowData.name || rowData.username}
                            </span>
                        </div>
                    )}
                />
                <Column
                    field="username"
                    header="Username"
                    style={{ width: '15%' }}
                    body={(rowData) => (
                        <a
                          href={`https://github.com/${rowData.username}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {rowData.username}
                        </a>
                    )}
                />
                <Column
                    field="followers"
                    header="Followers"
                    sortable
                    style={{ width: '15%' }}
                    body={(rowData) =>
                        formatNumberWithThousandsSeparator(rowData.followers)
                    }
                />
                <Column
                    field="contributions"
                    header="Contributions"
                    sortable
                    style={{ width: '15%' }}
                    body={(rowData) =>
                        formatNumberWithThousandsSeparator(rowData.contributions)
                    }
                />
                <Column
                    field="company"
                    header="Company"
                    style={{ width: '30%' }}
                    body={(rowData) => 
                        rowData.company || '-'
                    }
                />
            </DataTable>
            }
        </div>
    )
}
