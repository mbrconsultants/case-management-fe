import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import { Card, Row, Col, Modal, Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import endpoint from "../../context/endpoint";
import { Context } from "../../context/Context";
import moment from "moment";
import { ErrorAlert, SuccessAlert } from "../Toast/toast";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "react-select";
import Loader from "../Loader/loader";

export const AssignUserToRole = () => {
    const { user } = useContext(Context);
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [id, setId] = useState("");
    const [fetchData, setFetchData]=useState(true);
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    const [selectedRole, setSelectedRole] = useState({});
    const [userOptions, setUserOptions] = useState([]);
    const [roleOptions, setRoleOptions] = useState([]);

    useEffect(() => {
        getAllData();
    }, [fetchData]);

    const triggerDataFetch = () => setFetchData(t => !t);
    const getAllData = () => {
        setLoading(true);
        endpoint
            .get("/users-and-role")
            .then((response) => {
                setLoading(false);

                let roles = response.data.data.roles;
                roles = roles.map(function (r) {
                    return { value: r.id, label: r.rolename };
                });

                
                setRoleOptions(roles);
                let users = response.data.data.users;
                users = users.map(function (u) {
                    return { value: u.id, label: u.name };
                });
                setUserOptions(users);
              

                 setData(response.data.data.usersRole);
            })
            .catch((error) => {
                // console.error(`Error: ${error}`)
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);

            endpoint.post("assign-user-role", {
            user_id: selectedUser.value,
            role_id: selectedRole.value,
      
          }).then((response) => {
           
            SuccessAlert(response.data.message);
          
        triggerDataFetch();
             setLoading(false);
       
             setSelectedUser({});
             setSelectedRole({});

        })
        .catch((error) => {
        //   console.error(`Error: ${error}`);
          ErrorAlert(error.response.message)
      
               setLoading(false)
          });
    };

    const removeDataItem= (id) => {
        setData(current =>
          current.filter(data => {
            // 👇️ remove object that has id equal to 2
            return data.id !== id;
          }),
        );
        return data;
      };

    const handleUserChange = (selectedOption) => {
        setSelectedUser(selectedOption);
     
    
    };

    const handleRoleChange = (selectedOption) => {
        setSelectedRole(selectedOption);
       
     
    };

    const reset = () => {
        setSelectedUser("");
        setSelectedRole("");
    };

    const columns = [
        {
            name: "#",

            cell: (row, index) => index + 1,
            width: "10%",
        },

        {
            name: "Name",
            selector: (row) => [row.name],
            sortable: true,
            width: "40%",
            cell: (row) => <h6 className="fs-12 fw-semibold">{row.name}</h6>,
        },
        {
            name: "SubModule Name",
            selector: (row) => [row.role.rolename],
            sortable: true,
            width: "40%",
            cell: (row) => <h6 className="fs-12 fw-semibold">{row.role.rolename}</h6>,
        },
       
       
    ];

    return (
        <>
            <div>
                <div id="page-wrapper" className="box box-default">
                    <div className="container-fluid">
                        <div className="col-md-12 text-success">
                            {/* <!--2nd col-->  */}
                            {/* <big><b>@yield('pageTitle')</b></big>  */}
                        </div>
                        <br />
                        <hr />
                        <Row className="row">
                            <Col xs={2} md={2}></Col>
                            <Col xs={8} md={8}>
                                {" "}
                                <br />
                                <Card>
                                    <Card.Body>
                                        <form className="form-horizontal">
                                            <Row className="mb-6">
                                                <Col md={12}>
                                                    <label
                                                        style={{
                                                            display: "inline-block",
                                                            marginRight: "20px",
                                                        }}
                                                    >
                                                        User
                                                    </label>
                                                    <div
                                                        className="col-md-9"
                                                        style={{
                                                            display: "inline-block",
                                                            position: "absolute",
                                                        }}
                                                    >
                                                        <Select
                                                            name="form-field-name"
                                                            // value={selectedUser}
                                                            //  styles={pStyle}
                                                               onChange={handleUserChange}
                                                            labelKey="name"
                                                            valueKey="id"
                                                            className="mb-2"
                                                            options={userOptions}
                                                            disabled={isLoading}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>

                                            <Row className="mb-6">
                                                <Col md={12}>
                                                    <label
                                                        htmlFor="rolename"
                                                        style={{
                                                            display: "inline-block",
                                                            marginRight: "20px",
                                                        }}
                                                    >
                                                        {" "}
                                                        Role
                                                    </label>
                                                    <div
                                                        className="col-md-9"
                                                        style={{
                                                            display: "inline-block",
                                                            position: "absolute",
                                                        }}
                                                    >
                                                        <Select
                                                            id="rolename"
                                                            name="rolname"
                                                            // value={selectedRole}
                                                              onChange={handleRoleChange}
                                                            labelKey="name"
                                                            valueKey="id"
                                                            className=""
                                                            options={roleOptions}
                                                            disabled={isLoading}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                            {/* </Col> */}

                                            <div className="mt-4 form-group">
                                                <div className="col-sm-offset-2 text-center col-sm-12">
                                                    <button  disabled={isLoading} className={isLoading? "btn btn-success btn-sm pull-center btn-loading":"btn btn-success btn-sm pull-center"}
                                                      
                                                        onClick={handleSubmit}
                                                    >
                                                        Assign
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xs={3} md={4}></Col>
                        </Row>
                    </div>
                </div>

                <Card>
                    <Card.Body>
                        <h3 className="text-center">Assigned Users</h3>
                        {isLoading ? (
                            <Loader />
                        ) : (
                            <Row className="row">
                                <Col md={12} className="col-md-12">
                                    <DataTable
                                        //  fixedHeader
                                        columns={columns}
                                        // selectableRows
                                        data={data}
                                       
                                        defaultSortField="id"
                                        defaultSortAsc={false}
                                        striped={true}
                                        center={true}
                                        pagination
                                        highlightOnHover
                                    />
                                </Col>
                            </Row>
                        )}
                    </Card.Body>
                </Card>
            </div>
        </>
    );
};
