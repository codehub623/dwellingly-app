import React, { useContext, useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Link } from "react-router-dom";
import * as axios from "axios";
import roleEnum from '../../Enums/RoleEnum';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Search from "../../components/Search/index";
import Toast from '../../utils/toast';
import UserContext from '../../UserContext';
import './managers.scss';

const columns = [
  {
    dataField: "fullName",
    formatter: (cell, row) => {
      return (
        <Link key={row.id} to={`/manage/manager/${row.id}`}>
          {row.fullName}
        </Link>
      );
    },
    text: "Name",
    sort: true,
    headerStyle: () => {
      return { width: "20%" };
    },
  },
  {
    dataField: "properties",
    formatter: (cell, row) => {
      return (
        <ul>
          {row.properties.map((property) => (
            <li key={property.name}>{property.name}</li>
          ))}
        </ul>
      );
    },
    text: "Properties",
    sort: true,
    headerStyle: () => {
      return { width: "20%" };
    },
  },
  {
    dataField: "email",
    text: "Email",
    sort: true,
    headerStyle: () => {
      return { width: "20%" };
    },
  },
  {
    dataField: "status",
    text: "Status",
    sort: true,
    headerStyle: () => {
      return { width: "10%" };
    },
  },
  {
    dataField: "lastActive",
    text: "Last Usage",
    sort: true,
    headerStyle: () => {
      return { width: "10%" };
    },
  },
];

const selectRow = {
  mode: "checkbox",
  clickToSelect: true,
  sort: true,
  headerColumnStyle: () => {
    return { width: "5%" };
  },
};

// transforms data from API into a format that can be used for bootstrap-table-next
const convertManagersDataForTable = (managersArray) => {
  const convertedManagers = managersArray.map(manager => {
    manager.fullName = `${manager.firstName} ${manager.lastName}`;
    
    if (manager.lastActive || !manager.archived) {
      manager.status = "Active";
    } else if (manager.archived) {
      manager.status = "Archived";
    } else {
      manager.status = "Pending";
    }
    return manager;
  });

  return convertedManagers;
};

const payload = {
  userrole: `${roleEnum.PROPERTY_MANAGER}`
};

const makeHeader = (context) => {
  return { Authorization: `Bearer ${context.user.accessJwt}` };
};

const getManagers = (header, storeInState) => {
  axios
    .post(`${process.env.REACT_APP_PROXY}/api/users/role`, 
    payload, 
    header
    )
    .then((response) => {
      const convertedData = convertManagersDataForTable(response.data.users);
      storeInState(convertedData);
    })
    .catch((error) => {
      Toast(error);
      console.log(error);
    });
};

const Managers = () => {
  const [managersData, setManagersData] = useState();

  const retrievedUserContext = useContext(UserContext);
  const axiosHeader = makeHeader(retrievedUserContext);
  
  useEffect(() => getManagers(axiosHeader, setManagersData), []);
  
  return (
    <div className="managers main-container">
      <div className="section-header">
        <h2 className="page-title">Property Managers</h2>
        <Link className="button is-rounded is-primary ml-4" to="/add/manager">
          + ADD NEW
        </Link>
      </div>
      <div>
        <Search placeholderMessage="Search property managers by name, property, or status" />
      </div>
      <div className="invite-button-container py-3">
        <button className="button is-rounded is-primary ml-3" type="submit">
          <FontAwesomeIcon
            className="button__envelope-icon mr-3"
            icon={faEnvelope}
          />{" "}
          Invite
        </button>
      </div>
      {managersData && <BootstrapTable
        keyField="id"
        data={managersData}
        columns={columns}
        selectRow={selectRow}
        bootstrap4={true}
        headerClasses="table-header"
        wrapperClasses="managers__table"
      />}
    </div>
  );
};

export default Managers;