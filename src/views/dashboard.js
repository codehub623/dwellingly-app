import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import * as axios from 'axios';
import { UserContext } from '../App';
import { MODULE_DATA, ACCESS_REQUEST_DATA } from '../components/DashboardModule/data';
import DashboardModule from '../components/DashboardModule';
import Collapsible from '../components/Collapsible';
import RequestItem from '../components/RequestItem';

const makeAuthHeaders = ({ user }) => ({ headers: { 'Authorization': `Bearer ${user.accessJwt}` } });

export const Dashboard = (props) => {
    const [modalActive, setModalActive] = useState(false);
    const [staffList, setStaffList] = useState([]);
    const [unstaffedTenants, setUnstaffedTenants] = useState([]);
    const [areStaffAssigned, setAreStaffAssigned] = useState(false);
    const history = useHistory();
    const session = useContext(UserContext);

    useEffect(() => {
      axios
          .get(`${process.env.REACT_APP_API_URL}/tenants`, makeAuthHeaders(session))
          .then(({ data }) => {
              const unstaffed = data.tenants.filter(t => !t.staff);
              setUnstaffedTenants(unstaffed);
          })
          .catch((error) => {
              alert(error);
              console.log(error);
          })
    }, [session]);

    useEffect(() => {
      const data = { "userrole": "admin" };
      axios
          .post(`${process.env.REACT_APP_API_URL}/users/role`, data, makeAuthHeaders(session))
          .then(({ data }) => {
              setStaffList(data.users);
            })
          .catch((error) => {
              alert(error);
              console.log(error);
          })
    }, [session]);

    const handleAddClick = (id) => {
        const path = '/request-access/' + id;
        history.push(path);
    }

    const handleDeclineClick = (id) => {
        //console.log('decline',id);
        setModalActive(true);
    }

    const handleDenyAccess = (doDeny) => {
        setModalActive(false);
        if (doDeny) {
            console.log('handle deny access');
            //TODO: handle deny access
        }
    }

    const handleStaffAssignmentChange = ({ target }, tenantId) => {
        const updatedTenants = unstaffedTenants.map(tenant => {
            if(tenant.id === tenantId) {
                tenant.staff = target.value;
                setAreStaffAssigned(true);
            }
            return tenant
        });
        setUnstaffedTenants(updatedTenants);
    }

    const handleStaffAssignment = () => {
        const data = unstaffedTenants
            .filter(({ staff }) => staff)
            .map(({ id, staff }) => ({ id, data: { 'staffIDs': [staff] } }));
        data.forEach(({ id, data }) => {
            axios
                .put(`${process.env.REACT_APP_API_URL}/tenants/${id}`, data, makeAuthHeaders(session))
                .then(({ data }) => {
                    const updatedTenants = unstaffedTenants.filter(({ id }) => {
                        const isTenantUpdatedCorrectly = data.id === id && data.staff && data.staff.length;
                        // using filter to keep all but this updated tenant, so negate the result
                        return !isTenantUpdatedCorrectly;
                    });
                    setUnstaffedTenants(updatedTenants);
                })
                .catch((error) => {
                    alert(error);
                    console.log(error);
                })
        })
    }

    const staffOptions = staffList.map(({ id, firstName, lastName }) => (
        <option key={id} value={id}>{`${firstName} ${lastName}`}</option>
    ));

    const unstaffedTenantItems = unstaffedTenants.map(({ id, firstName, lastName, propertyName, staff }) => (
        <div key={id} className="collapsible__row columns">
            <div className="collapsible__col column">{`${firstName} ${lastName}`}</div>
            <div className="collapsible__col column">
                {propertyName}<br />
                <span className="subtext">Property Manager Name (fix this)</span>
            </div>
            <div className="dashboard__colapsible_col column">
                <div className="select is-rounded">
                    <select
                        onChange={e => handleStaffAssignmentChange(e, id)}
                        value={staff || 'default'}
                    >
                        <option value='default' disabled>Staff Name</option>
                        {staffOptions}
                    </select>
                </div>
            </div>
        </div>
    ));

    return (
        <>
            <div className="dashboard__container">
                <div className="dashboard__main_container">
                    <div className="dashboard__main">
                        <h2 className="page-title">Admin Dashboard</h2>
                        <div className="dashboard__modules_container">
                            <DashboardModule
                                data={MODULE_DATA.openTickets}
                            />
                            <DashboardModule
                                data={MODULE_DATA.reports}
                            />
                            <DashboardModule
                                data={MODULE_DATA.managers}
                            />
                        </div>
                        <Collapsible
                            title="New Staff Assignments"
                            count={unstaffedTenants.length}
                        >
                            <div className="dashboard__assignments_container">
                                {unstaffedTenantItems}
                                <div className="dashboard__assignments_button_container">
                                    <button 
                                        className={`${areStaffAssigned && 'active'} dashboard__save_assignments_button button is-rounded`}
                                        onClick={handleStaffAssignment}
                                    >
                                        SAVE ASSIGNMENTS
                                    </button>
                                </div>
                            </div>
                        </Collapsible>
                        <Collapsible
                            title="Request for Access"
                            count={ACCESS_REQUEST_DATA.length}
                        >
                            {
                                ACCESS_REQUEST_DATA.map((requestItemData, index) => {
                                    return (<RequestItem key={`requestItem--${index}`} data={requestItemData} onDeclineClick={handleDeclineClick} onAddClick={handleAddClick} />);
                                })
                            }
                        </Collapsible>
                    </div>  
                </div>
            </div>
            <div className={`modal ${modalActive && 'is-active'}`}>
                <div className="modal-background" onClick={() => { handleDenyAccess(false) }}></div>
                <div className="modal-content">
                    <div className="modal__message_container">
                        <div className="modal__message">
                            <h4>Are you sure you want to decline access?</h4>
                        </div>
                        <div className="modal__button_container">
                            <button className="button is-primary is-rounded" onClick={() => { handleDenyAccess(true) }}>YES</button>
                            <button className="button is-dark is-rounded" onClick={() => { handleDenyAccess(false) }}>NO</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}