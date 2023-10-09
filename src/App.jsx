import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Avatar } from "primereact/avatar";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown"; 
import { Header } from "./components/Header";
import { FilterMatchMode } from "primereact/api";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [data, setData] = useState([]);


  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/depapp/most-active-github-users-counter/master/indogithubers.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      });

    fetch(
      "https://api.github.com/repos/depapp/most-active-github-users-counter/commits?path=indogithubers.json"
    )
      .then((response) => response.json())
      .then((commits) => {
        const lastUpdated = new Date(commits[0].commit.committer.date);
        setLastUpdated(lastUpdated);
      });
  }, []);
  const filterOptions = [ 
  { name: "Sort by Followers", value: "followers" },
  { name: "Sort by Contributors", value: "contributions" },
];

const [sortBy, setSortBy] = useState(filterOptions[0].value); 

  const formatNumberWithThousandsSeparator = (number) => {
    return number.toLocaleString();
  };

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const getMedalEmoji = (rank) => {
    let emoji;
    switch (rank) {
      case 1:
        emoji = "🥇";
        break;
      case 2:
        emoji = "🥈";
        break;
      case 3:
        emoji = "🥉";
        break;
      default:
        return `#${rank}`;
    }
    return <span style={{ fontSize: "2em" }}>{emoji}</span>;
  };

  const sortData = (field) => {
    const sortedData = [...data.users].sort((a, b) => b[field] - a[field]); 
    setData({ ...data, users: sortedData });
};


  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
      <Dropdown 
      value={sortBy}
      options={filterOptions}
      optionLabel="name"
      onChange={(e) => {
        setSortBy(e.value);
        sortData(e.value);
      }}
      placeholder="Sort By"
      style={{ marginRight: '10px' }}
    />
    
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            placeholder={`Search`}
            onInput={(e) =>
              setFilters({
                global: {
                  value: e.target.value,
                  matchMode: FilterMatchMode.CONTAINS,
                  field: sortBy 
                },
              })
            }
          />
        </span>
      </div>
    );
  };

  return (
    <div className="card">
      <Header data={data} lastUpdated={lastUpdated} />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <DataTable
          value={data.users}
          tableStyle={{ minWidth: "50rem" }}
          paginator
          rows={10}
          rowsPerPageOptions={[10, 25, 50]}
          filters={filters}
          header={renderHeader}
          removableSort
        >
          <Column
            field="avatarUrl"
            header="Name"
            style={{ width: "20%" }}
            body={(rowData) => (
              <div style={{ display: "flex", alignItems: "center" }}>
                <Avatar image={rowData.avatarUrl} shape="circle" size="large" />
                <span style={{ marginLeft: "10px" }}>
                  {rowData.name || rowData.username}
                </span>
              </div>
            )}
          />
          <Column
            field="username"
            header="Username"
            style={{ width: "15%" }}
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
            style={{ width: "5%" }}
            body={(rowData) => getMedalEmoji(rowData.followerRank)}
          />
          <Column
            field="followers"
            header="Followers"
            sortable
            style={{ width: "15%" }}
            body={(rowData) =>
              formatNumberWithThousandsSeparator(rowData.followers)
            }
          />
          <Column
            field="contributionRank"
            header="Contributions Rank"
            style={{ width: "5%" }}
            body={(rowData) => getMedalEmoji(rowData.contributionRank)}
          />
          <Column
            field="contributions"
            header="Contributions"
            sortable
            style={{ width: "15%" }}
            body={(rowData) =>
              formatNumberWithThousandsSeparator(rowData.contributions)
            }
          />
          <Column
            field="company"
            header="Company"
            style={{ width: "30%" }}
            body={(rowData) => rowData.company || "-"}
          />
        </DataTable>
      )}
    </div>
  );
}
