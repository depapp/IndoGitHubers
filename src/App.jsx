import React, { useState, useEffect } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Avatar } from 'primereact/avatar'
import { InputText } from 'primereact/inputtext'
import { FilterMatchMode } from 'primereact/api'
import { Analytics } from '@vercel/analytics/react'
import { Tooltip } from 'primereact/tooltip'

export default function App() {
    const [isLoading, setIsLoading] = useState(true)
    const [lastUpdated, setLastUpdated] = useState(null)
    const [data, setData] = useState([])

    useEffect(() => {
        fetch("https://raw.githubusercontent.com/depapp/most-active-github-users-counter/master/indogithubers.json")
          .then((response) => response.json())
          .then((data) => {
            setData(data)
            setIsLoading(false)
          })

        fetch("https://api.github.com/repos/depapp/most-active-github-users-counter/commits?path=indogithubers.json")
          .then((response) => response.json())
          .then((commits) => {
            const lastUpdated = new Date(commits[0].commit.committer.date)
            setLastUpdated(lastUpdated)
          })
    }, [])

    const formatNumberWithThousandsSeparator = (number) => {
        return number.toLocaleString()
    }

    const [filters, setFilters] = useState({
        global: { value: null, matchMode:FilterMatchMode.CONTAINS }
    })

    const getMedalEmoji = (rank) => {
        let emoji
        switch(rank) {
            case 1:
                emoji = '🥇'
                break
            case 2:
                emoji = '🥈'
                break
            case 3:
                emoji = '🥉'
                break
            default:
                return `#${rank}`
        }
        return <span style={{fontSize: '2em'}}>{emoji}</span>
    }    

    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText
                        placeholder='Search Username'
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

    const formatLastUpdated = () => {
        if (!lastUpdated) {
          return ""
        }
      
        const today = new Date()
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        const twoDaysAgo = new Date()
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)
      
        const isToday = lastUpdated.toDateString() === today.toDateString()
        const isYesterday = lastUpdated.toDateString() === yesterday.toDateString()
        const isTwoDaysAgo = lastUpdated.toDateString() === twoDaysAgo.toDateString()
      
        const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: false }
        const formattedTime = lastUpdated.toLocaleTimeString(undefined, timeOptions)
      
        if (isToday) {
          return `Today at ${formattedTime} WIB`
        } else if (isYesterday) {
          return `Yesterday at ${formattedTime} WIB`
        } else if (isTwoDaysAgo) {
          return `2 Days Ago at ${formattedTime} WIB`
        } else {
          return lastUpdated.toLocaleDateString()
        }
    }      

    return (
        <div className="card">
            <Analytics />
            <Tooltip target=".custom-target-icon" />
            <h1>IndoGitHubers</h1>
            <h2>Check Your GitHub Rank <i className="custom-target-icon pi pi-info-circle"
                style={{ fontSize: '1.25rem' }}
                data-pr-tooltip={`your GitHub account needs to have at least ${data.MinimumFollowerCount} followers to be on the list.`}
                data-pr-position="right"></i>
            </h2>
            <h3>Last Updated: {formatLastUpdated()} <i className="custom-target-icon pi pi-info-circle"
                style={{ fontSize: '1rem' }}
                data-pr-tooltip={`this data is not updated in real time. the data will be updated every 2 days.`}
                data-pr-position="right"></i></h3>
            {isLoading ? <div>Loading...</div> : 
            <DataTable 
                value={data.users}
                tableStyle={{ minWidth: '50rem' }}
                paginator rows={10} rowsPerPageOptions={[10, 25, 50]}
                filters={filters}
                header={header}
                removableSort
            >
                <Column
                    field="avatarUrl"
                    header="Name"
                    style={{ width: '20%' }}
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
                    field="followerRank"
                    header="Followers Rank"
                    style={{ width: '5%' }}
                    body={(rowData) => getMedalEmoji(rowData.followerRank)}
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
                    field="contributionRank"
                    header="Contributions Rank"
                    style={{ width: '5%' }}
                    body={(rowData) => getMedalEmoji(rowData.contributionRank)}
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
