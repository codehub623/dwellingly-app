import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import UserContext from '../../UserContext';
import { Link } from "react-router-dom";
import * as axios from 'axios';
import Search from '../../components/Search';
import { ShowHideSwitch } from '../../components/ShowHideSwitch';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArchive } from '@fortawesome/free-solid-svg-icons';
import Toast from '../../utils/toast';

import './properties.scss';

const columns = [{
  dataField: 'name',
  formatter: (_, row) => {
    return (
      <Link key={row.id} to={`/manage/property/${row.id}`}>
        {row.name}
      </Link>
    );
  },
  text: 'Name',
  sort: true,
  headerStyle: () => {
    return { width: "20%" };
  }
}, {
  dataField: 'propertyManagerNames',
  text: 'Property Managers',
  sort: true,
  headerStyle: () => {
    return { width: "20%" };
  }
}, {
  dataField: 'address',
  text: 'Address',
  sort: true,
  headerStyle: () => {
    return { width: "20%" };
  }
}, {
  dataField: 'totalTenants',
  text: 'Tenants',
  sort: true,
  headerStyle: () => {
    return { width: "10%" };
  }
}, {
  dataField: 'created_at',
  text: 'Added On',
  sort: true,
  headerStyle: () => {
    return { width: "10%" };
  }
}];

export class Properties extends Component {
  constructor(props) {
    super(props);

    this.state = {
      properties: [],
      nonArchivedProperties: [],
      filteredProperties: [],
      selectedProperties: [],
      checkboxRenderCount: 0,
      isFiltered: false,
      showArchived: false
    };

    this.getProperties = this.getProperties.bind(this);
  }

  setIsFilteredPropertiesFalse = async () => {
    await this.setState({ isFiltered: false });
  };

  setOutputState = async (output, isTrue) => {
    await this.setState({
      filteredProperties: output,
      isFiltered: isTrue
    });
  };

  setSelectedProperties = selectedProperties => {
    this.setState({ selectedProperties });
  }

  addToSelectedProperties = property => {
    this.setState({ selectedProperties: [...this.state.selectedProperties, property] });
  }

  removeFromSelectedProperties = property => {
    this.setState({ selectedProperties: this.state.selectedProperties.filter(p => p.id !== property.id) });
  }

  selectRow = {
    mode: 'checkbox',
    clickToSelect: true,
    onSelect: (row, isSelect) => isSelect
      ? this.addToSelectedProperties(row) 
      : this.removeFromSelectedProperties(row)
    ,
    onSelectAll: (isSelect, rows) => isSelect
      ? this.setSelectedProperties(rows)
      : this.setSelectedProperties([]) 
    ,
    sort: true,
    headerColumnStyle: () => {
      return { width: "5%" };
    }
  }
  
  componentDidMount() {
    this.getProperties(this.context);
  }

  setTableDataFromProperties = (properties) => {
    const propertyRows = properties.map(property => ({
      id: property.id,
      archived: property.archived,
      name: property.name,
      propertyManagerNames: property.propertyManagerName && property.propertyManagerName.join(", "),
      address: property.address,
      totalTenants: property.tenantIDs && property.tenantIDs.length,
      created_at: property.created_at
    }));
    this.setState({ properties: propertyRows });
    this.setState({ nonArchivedProperties: propertyRows.filter(p => !p.archived)})
  }

  getProperties = (context) => {
    axios.get("/api/properties", { headers: { "Authorization": `Bearer ${context.user.accessJwt}` } })
      .then((response) => {
        const { data: { properties } } = response;
        this.setTableDataFromProperties(properties)
      })
      .catch((error) => {
        Toast(error.message, "error");
      })
  }

  archiveProperties = () => {
    const propertyIds = this.state.selectedProperties.map(p => p.id);
    axios.patch(`/api/properties/archive`, { ids: propertyIds }, { headers: { "Authorization": `Bearer ${this.context.user.accessJwt}` } })
      .then((response) => {
        Toast(`Property Archived.`);
        const { data: { properties } } = response;
        this.setTableDataFromProperties(properties)
        this.setState({ 
          selectedProperties: [],
          checkboxRenderCount: this.state.checkboxRenderCount + 1
        });
      })
      .catch((error) => {
        Toast(error.message, "error");
      })
  }

  handleToggle = () => this.setState({ showArchived: !this.state.showArchived });

  render() {
    return (
      <UserContext.Consumer>
        {session => {
          this.context = session;
          return (
            <div className='main-container'>
              <div className="properties">
                <div className="section-header">
                  <h2 className="page-title">Properties</h2>
                  <Link className="button is-primary is-rounded ml-4" to="/add/property">+ ADD NEW</Link>
                </div>
                <div className="search-and-archive-container">
                
                  <Search
                    input={this.state.showArchived ? this.state.properties : this.state.nonArchivedProperties}
                    outputLocation={this.state.filteredProperties}
                    isFilteredLocation={this.state.isFiltered}
                    setIsFilteredStateFalse={this.setIsFilteredPropertiesFalse}
                    setOutputState={this.setOutputState}
                    placeholderMessage="Search by name, address, or property manager"
                  />
                  <ShowHideSwitch labelText="Archived:" isShowState={this.state.showArchived} handleToggleChange={this.handleToggle}/>
                </div>
                <div className='bulk-actions-container py-3'>
                  <button 
                    className={`button is-rounded is-primary ml-3 ${this.state.selectedProperties.length && 'is-active-button'}`}
                    onClick={this.archiveProperties}
                  >
                    <FontAwesomeIcon
                      className="mr-3"
                      icon={faArchive}
                    />
                    Archive Properties
                  </button>
                </div>
                <div className="properties-list">
                  <BootstrapTable
                    key={`tables-of-properties--${this.state.checkboxRenderCount}`}
                    keyField='id'
                    data={this.state.isFiltered
                      ? this.state.filteredProperties 
                      : (this.state.showArchived ? this.state.properties : this.state.nonArchivedProperties) 
                    }
                    columns={columns}
                    selectRow={this.selectRow}
                    defaultSortDirection="asc"
                    bootstrap4={true}
                    headerClasses="table-header"
                  />
                </div>
              </div>
            </div>
          );
        }}
      </UserContext.Consumer>
    );
  }
}
