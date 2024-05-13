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

export const CreateStatus = () => {

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


  const [status, setStatus] = useState({
    name: '',
    description: '',
    color: '', 
    active: '',
    staff_status: ''
  });

  const [newStatus, setNewStatus] = useState({
    status_id:'', name:'', description:'', color: '', active: '', staff_status: ''
  })

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [idToDelete, setIdToDelete] = useState('')

  const staffStatus = [
    {id: 1, label: "Active", value: 1},
    {id: 2, label: "Inactive", value: 0}
  ]

  const activeStatus = [
    {id: 1, label: "Active", value: 1},
    {id: 2, label: "Inactive", value: 0}
  ]

  const colors = [
    {label:"green"},{label:"red"},{label:"blue"},{label:"yellow"},{label:"gray"}
  ]

  useEffect(() => {
    getAllData();
  }, []);


  const getAllData = async () => {
    await endpoint.get(`/staff-status/list`)
      .then((res) => {
        // console.log("all status", res.data.data)
        setData(res.data.data)
      })
      .catch((err) => {
        // console.log(err)
      })
  } 

  const handlePageChange = page => {
    setPage(page);
  }

  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);

  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
   await endpoint.post(`/staff-status/create`, status).then(res => {
        // console.log(res)
        setStatus({...status, name:'', description: '', color: '', active: '', staff_status: ''})
        // console.log("statst", status);
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
    setNewStatus({...newStatus, status_id:row.id, name:row.name, description:row.description, color:row.color,active:row.active,staff_status:row.staff_status})
    setOpen(true);
    // console.log("status to update", newStatus)
  }

  const handleEdit = async () => {
    // console.log("status id to update", newStatus.status_id)
    setLoading(true)
    // console.log("my updating data", newRole)
    await endpoint.put(`staff-status/edit/${newStatus.status_id}`, newStatus).then((res) => {
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
    // console.log("role to delete", row.id)
    setOpen(false);
    setIdToDelete(row.id);
    setDeleteOpen(true);
  }

  const handleDelete = async (e) => {
    // console.log("status2 to delete", idToDelete)
    e.preventDefault()
    await endpoint.delete(`/staff-status/delete/${idToDelete}`).then((res) => {
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
    setStatus("");
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
      width: "15%",
      cell: (row) => (
        <h6 className="fs-12 fw-semibold">{row.name}</h6>
      ),
    },
    {
      name: "Description",
      selector: (row) => [row.description],
      sortable: true,
      width: "25%",
      cell: (row) => (
        <h6 className="fs-12 fw-semibold">{row.description}</h6>
      ),
    },
    {
      name: "Colour",
      selector: (row) => [row.color],
      sortable: true,
      width: "15%",
      cell: (row) => (
        <h6 className="fs-12 fw-semibold">{row.color}</h6>
      ),
    },
    {
      name: "Active",
      selector: (row) => [row.active],
      sortable: true,
      width: "15%",
      cell: (row) => (
        <h6 className="fs-12 fw-semibold">{ row.active === 1 ? "Active" : "Inactive" }</h6>
      ),
    },
    {
      name: "Staff Status",
      selector: (row) => [row.staff_status],
      sortable: true,
      width: "15%",
      cell: (row) => (
        <h6 className="fs-12 fw-semibold">{ row.staff_status === 1 ? "Active" : "Inactive" }</h6>
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
          <div className="container-fluid">

                  <Card>

                    <Card.Body>
                      <div className="form-horizontal">
                        <div className="form-group">
                          <label className="col-md-6  cecontrol-label">Name</label>
                          <div className="col-md-12">
                            <input type="text" className="form-control" name="name"
                            value={status.name}
                            onChange={(e) => {
                              setStatus({...status, name: e.target.value})
                            }} 
                            required />
                          </div>
                        </div>

                        <div className="form-group">
                          <label className="col-md-6  cecontrol-label">Description</label>
                          <div className="col-md-12">
                          
                            <input type="text" className="form-control" name="description" 
                             value={status.description}
                            onChange={(e) => {
                              setStatus({...status, description: e.target.value})
                            }}
                            required />
                          </div>
                        </div>

                        <div className="form-group">
                          <label className="col-md-6  cecontrol-label">Colour</label>
                          <select className="form-control" name="color" style={{ width: '100%', marginTop: '0px' }}
                              value={status.color}
                            onChange={(e) => {
                              setStatus({...status, color: e.target.value})
                            }}
                            >
                              <option  value="">--Select--</option>
                              {colors.map(col => (<option value={col.label}>{col.label}</option>))}
                            </select>
                        </div>

                        {/* <div className="form-group">
                          <label className="col-md-6  cecontrol-label">Status</label>
                          <select className="form-control" name="active" style={{ width: '100%', marginTop: '0px' }}
                           value={status.active}
                            onChange={(e) => {
                              setStatus({...status, active: e.target.value})
                            }}
                            >
                              <option>--Select--</option>
                              {activeStatus.map((activeStat) => (<option key={activeStat.id} value={activeStat.value}>{activeStat.label}</option>))}
                            </select>
                        </div> */}

                        {/* <div className="form-group">
                          <label className="col-md-6  cecontrol-label">Staff Status</label>
                          <select className="form-control" name="staff_status" style={{ width: '100%', marginTop: '0px' }}
                             value={status.staff_status}
                            onChange={(e) => {
                              setStatus({...status, staff_status: e.target.value})
                            }}
                            >
                              <option>--Select--</option>
                              {staffStatus.map((staffStat) => (<option key={staffStat.id} value={staffStat.value}>{staffStat.label}</option>))}
                            </select>
                        </div> */}

                        <div className="form-group">
                          <div className="col-sm-offset-2 text-center col-sm-9">
                            <button className={isLoading ? "btn btn-success pull-right btn-loading" : "btn btn-success pull-right"} disabled={isLoading} 
                            onClick={handleSubmit}
                            >Add Status</button>
                          </div>
                        </div>
                      </div>
                    </Card.Body>

                  </Card>
                </div>
                </Col>
                <Col xs={3} md={4}></Col>
              </Row>
            </div>
          </div>
          <Card >
            <Card.Body >
              <h3 className="text-center">ALL Staff Status</h3>
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
                      <DialogTitle>Edit Staff Status
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
                                      defaultValue={newStatus.name} 
                                      onChange={(e) => setNewStatus({...newStatus, name: e.target.value })} 
                                      required />
                                    </div>
                                  </div>

                                  <div className="form-group">
                                    <label className="col-md-6  cecontrol-label">Description</label>
                                    <div className="col-md-12">
                                      <input id="description" type="text" className="form-control"  
                                      defaultValue={newStatus.description} 
                                      onChange={(e) => setNewStatus({...newStatus, description: e.target.value })} 
                                      required />
                                    </div>
                                  </div>

                                  <div className="form-group">
                                    <label className="col-md-6  cecontrol-label">Colour</label>
                                    <select className="form-control" name="color" style={{ width: '100%', marginTop: '0px' }}
                                        value={newStatus.color}
                                      onChange={(e) => {
                                        setNewStatus({...newStatus, color: e.target.value})
                                      }}
                                      >
                                        <option value="">--Select--</option>
                                        {colors.map(col => (<option value={col.label}>{col.label}</option>))}
                                    </select>
                                  </div>

                                  <div className="form-group">
                                    <label className="col-md-6  cecontrol-label">Status</label>
                                    <select className="form-control" name="active" style={{ width: '100%', marginTop: '0px' }}
                                        defaultValue={newStatus.active}
                                      onChange={(e) => {
                                        setNewStatus({...newStatus, active: e.target.value})
                                      }}
                                      >
                                       <option value={newStatus.active}>{
                                            newStatus.active === 1 ? `Active` : newStatus.active === 0 ? `Inactive` : `--Select status`
                                        }</option>
                                        {activeStatus.map((activestat) => (<option key={activestat.id} value={activestat.value}> {activestat.label} </option>))}
                                    </select>
                                  </div>

                                  <div className="form-group">
                                    <label className="col-md-6  cecontrol-label">Staff Status</label>
                                    <select className="form-control" name="staff_status" style={{ width: '100%', marginTop: '0px' }}
                                        defaultValue={newStatus.staff_status}
                                      onChange={(e) => {
                                        setNewStatus({...newStatus, staff_status: e.target.value})
                                      }}
                                      >
                                        <option value={newStatus.staff_status}>{
                                          newStatus.staff_status === 1 ? `Active` : newStatus.staff_status === 0 ? `Inactive` : `--Select status`
                                        }</option>
                                        {staffStatus.map((staffStat) => (<option key={staffStat.id} value={staffStat.value}>{staffStat.label}</option>))}
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
                      <DialogTitle>Delete Status
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
                            <p>Do you really want to delete <span className="fw-bold"></span> status? <br /> This process cannot be undone.</p>
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