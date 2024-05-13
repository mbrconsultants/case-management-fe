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

export const CreateUserType = () => {

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


  const [userType, setUserType] = useState({
    name: '', description: '', status: ''
  });

  const [newUserType, setNewUserType] = useState({
    userType_id:'', name:'', description: '', status: ''
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

  const statusList = [
    {id: 1, label: "Active", value: 1},
    {id: 2, label: "Inactive", value: 0}
  ]

  useEffect(() => {
    getAllData();
  }, []);


  const getAllData = async () => {
    await endpoint.get(`/user-type/gaetallusertypes`)
      .then((res) => {
        // console.log("all operation", res.data.data)
        setData(res.data.data)
      })
      .catch((err) => {
        // console.log(err)
      })
  } 

  // const getStatus1 = async () => {
  //   await endpoint.get(`/user-type/get-user-type-s1`)
  //     .then((res) => {
  //       console.log("all user type status 1", res.data.data)
  //       setData(res.data.data)
  //     })
  //     .catch((err) => console.log(err))
  // }

  // const getStatus0 = async () => {
  //   await endpoint.get(`/user-type/get-user-type-s0`)
  //     .then((res) => {
  //       console.log("all user type status 2", res.data.data)
  //       setData(res.data.data)
  //     })
  //     .catch((err) => console.log(err))
  // }


  
  const handleSubmit = async (e) => {
    e.preventDefault()
   await endpoint.post(`/user-type/createusertype`, userType).then(res => {
        // console.log(res)
        setUserType({...userType, name:'', description: '', status: ''})
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
    setNewUserType({...newUserType, userType_id:row.id, name:row.name, description:row.description, status:row.status})
    setOpen(true);
  }

  const handleEdit = async () => {
    // console.log("status id to update", newStatus.status_id)
    setLoading(true)
    // console.log("my updating data", newRole)
    await endpoint.put(`user-type/updateusertype/${newUserType.userType_id}`, newUserType).then((res) => {
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
    await endpoint.delete(`/user-type/deleteusertype/${idToDelete}`).then((res) => {
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
    setUserType("");
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
      name: "Name",
      selector: (row) => [row.name],
      sortable: true,
      width: "25%",
      cell: (row) => (
        <h6 className="fs-12 fw-semibold">{row.name}</h6>
      ),
    },
    {
      name: "Description",
      selector: (row) => [row.description],
      sortable: true,
      width: "30%",
      cell: (row) => (
        <h6 className="fs-12 fw-semibold">{row.description}</h6>
      ),
    },
    {
      name: "Status",
      selector: (row) => [row.status],
      sortable: true,
      width: "20%",
      cell: (row) => (
        <h6 className="fs-12 fw-semibold">{ row.status === 1 ? "Active" : "Inactive" }</h6>
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
                <Col xs={6} md={6} > <br />

                  <Card >

                    <Card.Body>
                      <div className="form-horizontal">
                        <div className="form-group">
                          <label className="col-md-6  cecontrol-label">Name</label>
                          <div className="col-md-12">
                            <input type="text" className="form-control" name="name"
                            value={userType.name}
                            onChange={(e) => {
                              setUserType({...userType, name: e.target.value})
                            }} 
                            required />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-md-6  cecontrol-label">Description</label>
                          <div className="col-md-12">
                            <input type="text" className="form-control" name="description"
                            value={userType.description}
                            onChange={(e) => {
                              setUserType({...userType, description: e.target.value})
                            }} 
                            required />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-md-6  cecontrol-label">Status</label>
                          <div className="col-md-12">
                            <select className="form-control" style={{ width: '100%', marginTop: '0px' }}
                              {...register("status", { required: "Please select gender" })}
                              onChange={(event) =>
                                setUserType({ ...userType, status: event.target.value })
                                }
                              >
                                <option>--Select--</option>
                                {statusList.map(status => (<option value={status.value}>{status.label}</option>))}
                            </select>
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="col-sm-offset-2 text-center col-sm-9">
                            <button className={isLoading ? "btn btn-success pull-right btn-loading" : "btn btn-success btn-sm pull-right"} disabled={isLoading} 
                            onClick={handleSubmit}
                            >Add User Type</button>
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
              <h3 className="text-center">ALL User Type</h3>
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
                                    <div className="col-md-12">
                                      <input id="name" type="text" className="form-control" 
                                      defaultValue={newUserType.name} 
                                      onChange={(e) => setNewUserType({...newUserType, name: e.target.value })} 
                                      required />
                                    </div>
                                  </div>
                                  <div className="form-group">
                                    <label className="col-md-6  cecontrol-label">Description</label>
                                    <div className="col-md-12">
                                      <input id="description" type="text" className="form-control" 
                                      defaultValue={newUserType.description} 
                                      onChange={(e) => setNewUserType({...newUserType, description: e.target.value })} 
                                      required />
                                    </div>
                                  </div>
                                  <div className="form-group">
                                    <label className="col-md-6  cecontrol-label">Status</label>
                                      <select
                                          className="form-control"
                                          name="status"

                                          defaultValue={newUserType.status}
                                          onChange={(e) => setNewUserType({ ...newUserType, status: e.target.value })}

                                      >
                                          <option value={newUserType.status}>{
                                              newUserType.status === 1 ? `Active` : newUserType.status === 0 ? `Inactive` : `--Select status`
                                          }</option>
                                          {statusList.map((status) => (<option key={status.id} value={status.value}> {status.label} </option>))}
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
                      <DialogTitle>Delete Operation
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