import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import { Card, Row, Col, Modal, Button } from "react-bootstrap"
import DataTable from "react-data-table-component";
import endpoint from "../../context/endpoint";
import { Context } from "../../context/Context";
import moment from 'moment';
import { ErrorAlert, SuccessAlert } from "../Toast/toast";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Loader from "../Loader/loader";
import { log } from "nvd3";
import { useForm } from "react-hook-form";

export const CreateRoleFunction = () => {

  const {
		register,
		formState: { errors },
	} = useForm();

  const { user } = useContext(Context);
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [operations, setOperation] = useState([])
  const [usertypes, setUserType] = useState([]);
  const [roles, setRole] = useState([]);
  const [roleFunctionOperation, setRoleFunctionOperation] = useState("")
  const [rolefunctionUserType, setRoleFunctionUserType] = useState("")
  const [roleFunctionRole, setRoleFunctionRole] = useState("")
  

  const [rolefunction, setRoleFunction] = useState({
    operations_id: '', user_type_id: '', role_id: ''
  });

  const [newRoleFunction, setNewRoleFunction] = useState({
    rolefunction_id: '', operations_id:'', user_type_id:'', role_id: ''
  })

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [idToDelete, setIdToDelete] = useState('')

  const handlePageChange = page => {
    setPage(page);
  }

  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);

  }

  useEffect(() => {
    getAllData();
    getUsertypes();
    getOperations();
    getRoles();
  }, []);


  const getAllData = async () => {
    await endpoint.get(`/role-function/getallrolefunctions`)
      .then((res) => {
        // console.log("all role functions", res.data.data)
        setData(res.data.data)
      })
      .catch((err) => {
        // console.log(err)
      })
  } 

  const getUsertypes = async () => {
    await endpoint.get(`/user-type/get-user-type-s1`)
      .then((res) => {
        // console.log("all user type status 1", res.data.data)
        setUserType(res.data.data)
      })
      .catch((err) => {
        // console.log(err)
      })
  }

  const getOperations = async () => {
    await endpoint.get(`/operations/getalloperations`)
      .then((res) => {
        // console.log("all operations", res.data.data)
        setOperation(res.data.data)
      })
      .catch((err) => {
        // console.log(err)
      })
  }

  const getRoles = async () => {
    await endpoint.get(`/role/getRoles`)
      .then((res) => {
        // console.log("all roles", res.data.data)
        setRole(res.data.data)
      })
      .catch((err) => {
        // console.log(err)
      })
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
   await endpoint.post(`/role-function/createrolefunction`, rolefunction).then(res => {
        // console.log(res)
        setRoleFunction({...rolefunction, operations_id:'', user_type_id: '', role_id: ''})
        getAllData()
        SuccessAlert(res.data.message);
        setLoading(false);

    }).catch((err) => {
        setLoading(false);
        ErrorAlert(err.response.data.message)
        // console.log(err)
    });
}


  const onEdit = (row) => {
    // console.log("role to edit", row.id)
    setNewRoleFunction({...newRoleFunction, rolefunction_id:row.id, operations_id:row.operations_id, user_type_id:row.user_type_id, role_id:row.role_id})
    setOpen(true);
  }

  const handleEdit = async () => {
    // console.log("status id to update", newStatus.status_id)
    setLoading(true)
    // console.log("my updating data", newRole)
    await endpoint.put(`role-function/updaterolefunction/${newRoleFunction.rolefunction_id}`, newRoleFunction).then((res) => {
      // console.log(res.data);
      getAllData()
      setLoading(false)
      setOpen(false);
      SuccessAlert(res.data.message)

    }).catch((err) => {
      setLoading(false)
      ErrorAlert(err.response.data.message)
      // console.log(err)
    })
  }


  const onDelete = (row) => {
    setOpen(false);
    setIdToDelete(row.id);
    setDeleteOpen(true);
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    await endpoint.delete(`/role-function/deleterolefunction/${idToDelete}`).then((res) => {
          // console.log(res.data)
          SuccessAlert(res.data.message)
          getAllData()
          setLoading(false)
          setDeleteOpen(false);
    }).catch((err) => {
      ErrorAlert(err.response.data.message)
      // console.log(err)
    })
  }

  const reset = () => {
    setRoleFunction("");
    setId("")
  }

  const onClose = () => {
    reset();
    setOpen(false);
    setDeleteOpen(false);
  }

  const columns = [
    {
      name: "#",

      cell: (row, index) => (index + 1) + ((page - 1) * perPage),
      width: "10%"
    },
    {
      name: "Operation",
      selector: (row) => [row.Operation.name],
      sortable: true,
      width: "25%",
      cell: (row) => (
        <h6 className="fs-12 fw-semibold">{row.Operation.name}</h6>
      ),
    },
    {
      name: "User Type",
      selector: (row) => [row.UserType.name],
      sortable: true,
      width: "30%",
      cell: (row) => (
        <h6 className="fs-12 fw-semibold">{row.UserType.name}</h6>
      ),
    },
    {
      name: "Role",
      selector: (row) => [row.Role.role_name],
      sortable: true,
      width: "20%",
      cell: (row) => (
        <h6 className="fs-12 fw-semibold">{row.Role.role_name}</h6>
      ),
    },
    {
      name: "Action",
      cell: (row) => (<Row> <Col xs={4} style={{ paddingRight: "0px", paddingLeft: "0px" }}><button className="btn btn-sm btn-secondary" 
      onClick={(e) => { onEdit(row) }} 
      variant="secondary" title="Action" size="sm">Edit</button>

      </Col><Col xs={4}>
        <button className="btn btn-sm btn-danger" 
            onClick={(e) => { onDelete(row) }} 
            variant="danger" title="Action" size="sm"
          >Delete
        </button>
      </Col>
      </Row>)
    },

  ];

  return (
    <>
      {load ?

        <Loader /> :

        <div>
          <div id="page-wrapper" className="box box-default">
            <div className="container-fluid">
              <div className="col-md-12 text-success">
              </div>
              <br />
              <hr />
              <Row className="row">
                <Col xs={2} md={2}></Col>
                <Col xs={8} md={8} > <br />

                  <Card >

                    <Card.Body>
                      <div className="form-horizontal">
                        <div className="form-group">
                          <label className="col-md-6  cecontrol-label">Operation</label>
                          <select name="operations_id" style={{ width: '100%', marginTop: '0px' }}
                            className="form-control" required
                              onChange={(e) => {
                                setRoleFunctionOperation(e.target.value)
                                setRoleFunction({ ...rolefunction, operations_id: e.target.value })
                              }}
                              value={rolefunction.operations_id}
                          >
                              <option>--Select--</option>
                              {operations.map(operation => (<option key={operation.id} value={operation.id}>{operation.name}</option>))}

                          </select>
                        </div>

                        <div className="form-group">
                          <label className="col-md-6  cecontrol-label">User Type</label>
                            <select name="user_type_id" style={{ width: '100%', marginTop: '0px' }}
                              className="form-control" required
                                onChange={(e) => {
                                    setRoleFunctionUserType(e.target.value)
                                    setRoleFunction({ ...rolefunction, user_type_id: e.target.value })
                                }}
                                value={rolefunction.user_type_id}
                              >
                                <option>--Select--</option>
                                {usertypes.map(usertype => (<option key={usertype.id} value={usertype.id}>{usertype.name}</option>))}

                            </select>
                        </div>

                        <div className="form-group">
                          <label className="col-md-6  cecontrol-label">Role</label>
                          <select name="role_id" style={{ width: '100%', marginTop: '0px' }}
                            className="form-control" required
                              onChange={(e) => {
                                setRoleFunctionRole(e.target.value)
                                setRoleFunction({ ...rolefunction, role_id: e.target.value })
                              }}
                              value={rolefunction.role_id}
                          >
                              <option>--Select--</option>
                              {roles.map(role => (<option key={role.id} value={role.id}>{role.role_name}</option>))}

                          </select>
                        </div>

                        <div className="form-group">
                          <div className="col-sm-offset-2 text-center col-sm-9">
                            <button className={isLoading ? "btn btn-success pull-right btn-loading" : "btn btn-success pull-right"} disabled={isLoading} 
                            onClick={handleSubmit}
                            >Add Role Function</button>
                          </div>
                        </div>
                      </div>
                    </Card.Body>

                  </Card>
                </Col>
                <Col xs={3} md={4}></Col>
              </Row>
            </div>
          </div>
          <Card >
            <Card.Body >
              <h3 className="text-center">ALL Role Functions</h3>
              <Row className="row">
                <Col md={12} className="col-md-12">
                  <DataTable
                    //  fixedHeader
                    columns={columns}
                    // selectableRows
                    data={data}
                    // customStyles={customStyles}
                    // persistTableHead
                    defaultSortField="id"
                    defaultSortAsc={false}
                    striped={true}
                    center={true}
                    pagination
                    onChangePage={handlePageChange}
                    onChangeRowsPerPage={handlePerRowsChange}
                    paginationRowsPerPageOptions={[10, 15, 20, 25, 30, 50, 100]}

                    paginationPerPage={perPage}
                    highlightOnHover
                  />

                  <Modal show={open} >
                    <Modal.Body className="text-center p-4">
                      <DialogTitle>Edit UserType
                        <Button
                          onClick={onClose}
                          className="btn-close"
                          variant=""
                          disabled={isLoading}
                        >
                          x
                        </Button>
                      </DialogTitle>
                      <DialogContent>

                        <Row className="row">
                          <Col> <br />

                            <Card>

                              <Card.Body>
                                <form className="form-horizontal">
                                  <div className="form-group">
                                    <label className="col-md-6  cecontrol-label">Name</label>
                                    <select name="operations_id"
                                          className="form-control" required
                                          onChange={(e) => {
                                            setRoleFunctionOperation(e.target.value)
                                            setNewRoleFunction({ ...newRoleFunction, operations_id: e.target.value })
                                          }}
                                          defaultValue={newRoleFunction.operations_id}
                                      >
                                      
                                          <option>--Select--</option>
                                          {operations.map(operation => (<option key={operation.id} value={operation.id}>{operation.name}</option>))}

                                      </select>
                                  </div>
                                 
                                  <div className="form-group">
                                    <label className="col-md-6  cecontrol-label">User Type</label>
                                    <select name="user_type_id"
                                          className="form-control" required
                                          onChange={(e) => {
                                            setRoleFunctionUserType(e.target.value)
                                            setNewRoleFunction({ ...newRoleFunction, user_type_id: e.target.value })
                                          }}
                                          defaultValue={newRoleFunction.user_type_id}
                                      >
                                      
                                          <option>--Select--</option>
                                          {usertypes.map(usertype => (<option key={usertype.id} value={usertype.id}>{usertype.name}</option>))}

                                      </select>
                                  </div>

                                  <div className="form-group">
                                    <label className="col-md-6  cecontrol-label">User Type</label>
                                    <select name="role_id"
                                          className="form-control" required
                                          onChange={(e) => {
                                            setRoleFunctionRole(e.target.value)
                                            setNewRoleFunction({ ...newRoleFunction, role_id: e.target.value })
                                          }}
                                          defaultValue={newRoleFunction.role_id}
                                      >
                                      
                                          <option>--Select--</option>
                                          {roles.map(role => (<option key={role.id} value={role.id}>{role.role_name}</option>))}

                                      </select>
                                  </div>
                                </form>

                              </Card.Body>

                            </Card>
                          </Col>
                          <Row>
                            <Col style={{ display: 'flex', justifyContent: 'center', marginLeft: "60px" }}>
                              <Button onClick={onClose} disabled={isLoading} variant="danger" className="me-1">Cancel</Button>
                            </Col>
                            <Col style={{ display: 'flex', justifyContent: 'center', marginLeft: "60px" }}>
                              <Button 
                              onClick={handleEdit}
                               disabled={isLoading} variant="success" className={isLoading ? "me-1  btn-loading" : "me-1"}> {isLoading ? "Save" : "Save"}</Button>
                            </Col>
                          </Row>
                        </Row>

                      </DialogContent>
                      <DialogActions>

                      </DialogActions>
                      {/* </Dialog> */}
                    </Modal.Body>

                  </Modal>
                          
                  <Modal show={deleteOpen}>
                    <Modal.Body className="text-center p-4">
                      <DialogTitle>Delete Role Function
                        <Button
                          onClick={onClose}
                          className="btn-close"
                          variant=""
                        >
                          x
                        </Button>
                      </DialogTitle>
                      <DialogContent>


                        <div>

                          <div className="modal-body">
                            <p>Do you really want to delete <span className="fw-bold"></span> operation? <br /> This process cannot be undone.</p>
                          </div>

                          <Row>
                            <Col xs={5} md={5} align="right">
                              <button type="button" className="btn btn-sm btn-secondary" 
                              onClick={onClose}
                              >Cancel</button>
                            </Col>
                            <Col xs={1} md={1}  ></Col>
                            <Col xs={5} md={5} align="left">
                              <button 
                              onClick={handleDelete}
                               className="btn btn-sm btn-danger">Yes, Delete </button>
                            </Col>
                          </Row>

                        </div>

                      </DialogContent>
                    </Modal.Body>
                  </Modal>
                 
                </Col>
              </Row>
              {/* <!-- /.col -->  */}

            </Card.Body>
          </Card>
        </div>
      }
    </>
  )
}