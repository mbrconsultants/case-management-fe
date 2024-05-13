import React, { useState, useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import "react-data-table-component-extensions/dist/index.css";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import endpoint from "../../context/endpoint";
import { Context } from "../../context/Context";
import moment from 'moment';
import { ErrorAlert, SuccessAlert } from "../../data/Toast/toast";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Loader from "../Loader/loader";
import { DropdownButton, Modal, Form, FormGroup, ButtonGroup, Card, Button, Row, Col, InputGroup, Dropdown } from "react-bootstrap";
import { CForm, CCol, CFormLabel, CFormFeedback, CFormInput, CInputGroup, CInputGroupText, CButton, CFormCheck, CFormTextarea, CFormSelect, } from "@coreui/react";
import { EditDiscipline } from "./EditDiscipline";

export const DisciplineType = () => {

const [showEditModal, setShowEditModal] = useState(false)
const [showDeleteModal, setShowDeleteModal] = useState(false)

const navigate = useNavigate();
const [profiles, setProfile] = useState([])
const [violations, setViolation] = useState([])
const [disciplinaries, setDisciplinaryAction] = useState([])
const [status, setStatus] = useState([])
const [disciplineData, setDisciplineData] = useState([])
const [disViolation, setDisViolation] = useState("")
const [disProfile, setDisProfile] = useState("")
const [disDisciplinary, setDisDisciplinary] = useState("")
const [disStatus, setDisStatus] = useState("")
const [disciplineId, setDisciplineId] = useState("")
const [data, setDisciplineList] = useState("");
const [id, setId] = useState("");
const [open, setOpen] = useState(false);
const [deleteOpen, setDeleteOpen] = useState(false);

const [load, setLoad] = useState(false);
const [isLoading, setLoading] = useState(false);
const [idToDelete, setIdToDelete] = useState('')

// const handleShowEditModal = () => {
//   setShowEditModal(true)
// }

//   const handleShowDeleteModal = () => {
//     setShowDeleteModal(true)
//   }

const handlePageChange = page => {
  setPage(page);
}

const handlePerRowsChange = async (newPerPage, page) => {
  setPerPage(newPerPage);

}

const [page, setPage] = useState(1);
const [perPage, setPerPage] = useState(10);

const [disciplineInput, setDiscipline] = useState({
  profile_id: '',
  violations_id: '',
  offences: '',
  disciplinary_actions_id: '',
  duration: '',
  status_id: '',
});

const [newDiscipline, setNewDiscipline] = useState({
  discipline_id:'', 
  profile_id: '',
  violations_id: '',
  offences: '',
  disciplinary_actions_id: '',
  duration: '',
  status_id: '',
})

  useEffect(() => {
    getDisciplineList()
    getProfile()
    getViolation()
    getDisciplinaryAction()
    getStatus()
  }, []);

  //list of profile
const getProfile = async () => {
  await endpoint.get(`/user/profiles/all/show`)
      .then((res) => {
      // console.log("Profile Data", res.data.data)
      setProfile(res.data.data)
      })
      .catch((err) => {
        // console.log(err)
      })
  }
  
  //   List of violation
  const getViolation = async () => {
  await endpoint.get(`/discipline/get_violationsTypes`)
      .then((res) => {
      // console.log("Violation Data", res.data.data)
      setViolation(res.data.data)
      })
      .catch((err) => {
        // console.log(err)
      })
  }
  
  //   List of disciplinary action
  const getDisciplinaryAction = async () => {
  await endpoint.get(`/discipline/get_disciplinaryActions`)
      .then((res) => {
      // console.log("DisciplinaryAction Data", res.data.data[1])
      setDisciplinaryAction(res.data.data)
      })
      .catch((err) => {
        // console.log(err)
      })
  }
  
  //   List of disciplinary action
  const getStatus = async () => {
      await endpoint.get(`/staff-status/list`)
          .then((res) => {
          // console.log("Status Data", res.data.data[1])
          setStatus(res.data.data)
          })
          .catch((err) => {
            // console.log(err)
          })
      }
      
  
  const handleInput = (e) => {
      e.persist();
      setDiscipline({...disciplineInput, [e.target.name]: e.target.value})
  }
  

  const getDisciplineList = async () => {
    await endpoint.get(`/discipline/listTakenDisciplinaryActions`)
      .then((res) => {
        // console.log("discipline lists", res.data.data)
        setDisciplineList(res.data.data)
      })
      .catch((err) => {
        // console.log(err)
      })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
   await endpoint.post(`/discipline/takeADisciplinaryAction`, disciplineInput).then(res => {
        // console.log(res)
        setDisciplineData(res)
        setDiscipline
        ({
            ...disciplineInput, 
            profile_id: '',
            violations_id: '',
            offences: '',
            disciplinary_actions_id: '',
            duration: '',
            status_id: ''
        })
        getDisciplineList()
        SuccessAlert(res.data.message);
        setLoading(false);

    }).catch((err) => {
        setLoading(false);
        ErrorAlert(err.response.data.message)
        // console.log(err)
    });  
}

  const onEdit = (row) => {
    // console.log("discipline to edit", row.id)
    setNewDiscipline({...newDiscipline, 
      discipline_id:row.id, 
      profile_id:row.profile_id,
      violations_id:row.violations_id,
      offences:row.offences,
      disciplinary_actions_id:row.disciplinary_actions_id,
      duration:row.duration,
      status_id:row.status_id
    })
    setOpen(true);
    // console.log("discipline to update", newDiscipline)
  }

  const handleEdit = async (e) => {
    e.preventDefault()
    // console.log("discipline id to update", newDiscipline.discipline_id)
    setLoading(true)
    // console.log("my updating data", newDiscipline)
    await endpoint.put(`discipline/editTakenDisciplinaryActions/${newDiscipline.discipline_id}`, newDiscipline).then((res) => {
      // console.log(res.data);
      getDisciplineList()
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
    // console.log("discipline to delete", row.id)
    setOpen(false);
    setIdToDelete(row.id);
    setDeleteOpen(true);
  }

  const handleDelete = async (e) => {
    console.log("discipline new to delete", idToDelete)
    e.preventDefault()
    await endpoint.delete(`/discipline/deleteTakenDisciplinaryAction/${idToDelete}`).then((res) => {
          // console.log(res.data)
          SuccessAlert(res.data.message)
          getDisciplineList()
          setLoading(false)
          setDeleteOpen(false);
    }).catch((err) => {
      ErrorAlert(err.response.data.message)
      // console.log(err)
    })
  }

  const reset = () => {
    //setRole("");
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
      name: "Staff Name",
      selector: (row) => [row.Profile.first_name],
      sortable: true,
      width: "30%",
      cell: (row) => (
        <h6 className="fs-12 fw-semibold">{row.Profile.first_name} {row.Profile.last_name}</h6>
      ),
    },
    {
      name: "Violation",
      selector: (row) => [row.Violation.violation_type],
      sortable: true,
      width: "30%",
      cell: (row) => (
        <h6 className="fs-12 fw-semibold">{row.Violation.violation_type}</h6>
      ),
    },
    {
      name: "Offence",
      selector: (row) => [row.offences],
      sortable: true,
      width: "30%",
      cell: (row) => (
        <h6 className="fs-12 fw-semibold">{row.offences}</h6>
      ),
    },
    {
      name: "Disciplinary Action",
      selector: (row) => [row.DisciplinaryAction.disciplinary_action_name],
      sortable: true,
      width: "30%",
      cell: (row) => (
        <h6 className="fs-12 fw-semibold">{row.DisciplinaryAction.disciplinary_action_name}</h6>
      ),
    },
    {
      name: "Duration",
      selector: (row) => [row.duration],
      sortable: true,
      width: "20%",
      cell: (row) => (
        <h6 className="fs-12 fw-semibold">{row.duration}</h6>
      ),
    },
    {
      name: "Status",
      selector: (row) => [row.Status.name],
      sortable: true,
      width: "20%",
      cell: (row) => (
        <h6 className="fs-12 fw-semibold">{row.Status.name}</h6>
      ),
    },
    {
      name: "Action",
      cell: (row) => (<Row > <Col xs={4} style={{ paddingRight: "0px", paddingLeft: "0px" }}><button className="btn btn-sm btn-secondary" 
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
              <Row className="row form-group">
                <Col lg={12} md={12}> <br />
                <div>
                  <Card>
                  <Card.Body>
                    <div className="">
                <div className="">
                    <CForm onSubmit={(e)  => handleSubmit(e)}
                                className="row g-3 needs-validation"
                            >
                              <CCol lg={6} md={6}>
                                <FormGroup>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputname">Staff Name</label>
                                        <select name="profile_id" style={{ width: '100%', marginTop: '0px' }} 
                                            className="form-control" required
                                            onChange={(e) => {
                                                setDisProfile(e.target.value)
                                                setDiscipline({ ...disciplineInput, profile_id: e.target.value })
                                            }}
                                            value={disciplineInput.profile_id}
                                        >
                                            <option>--Select--</option>
                                            {profiles.map(profile => (<option key={profile.id} value={profile.id}>{profile.first_name} {profile.last_name} {profile.other_name}</option>))}

                                        </select>
                                    </div>
                                </FormGroup>
                            </CCol>
                                <CCol lg={6} md={6}>
                                <FormGroup>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputname">Violation</label>
                                        <select name="violations_id" style={{ width: '100%', marginTop: '0px' }} 
                                            className="form-control" required
                                            onChange={(e) => {
                                                setDisViolation(e.target.value)
                                                setDiscipline({ ...disciplineInput, violations_id: e.target.value })
                                            }}
                                            value={disciplineInput.violations_id}
                                        >
                                            <option>--Select--</option>
                                            {violations.map(violation => (<option key={violation.id} value={violation.id}>{violation.violation_type}</option>))}

                                        </select>
                                    </div>
                                </FormGroup>
                                </CCol>
                                <CCol lg={6} md={6}>
                                  <FormGroup>
                                      <label htmlFor="exampleInputname">Offences</label>
                                      <Form.Control type="text" name="offences" 
                                      onChange={(e) => setDiscipline({ ...disciplineInput, offences: e.target.value })} 
                                      value={disciplineInput.offences} 
                                      className="form-control" 
                                      />
                                  </FormGroup>
                                </CCol>
                               
                                <CCol lg={6} md={6}>
                                <FormGroup>
                                    <label htmlFor="exampleInputname">Duration</label>
                                    <Form.Control type="text" name="duration" 
                                    onChange={(e) => setDiscipline({ ...disciplineInput, duration: e.target.value })} 
                                    value={disciplineInput.duration} 
                                    className="form-control" 
                                    />
                                </FormGroup>
                                </CCol>
                                <CCol lg={6} md={6}>
                                <FormGroup>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputname">Disciplinary Action</label>
                                        <select name="disciplinary_actions_id" style={{ width: '100%', marginTop: '0px' }} 
                                            className="form-control" required 
                                            onChange={(e) => {
                                                setDisDisciplinary(e.target.value)
                                                setDiscipline({ ...disciplineInput, disciplinary_actions_id: e.target.value })
                                            }}
                                            value={disciplineInput.disciplinary_actions_id}
                                        >
                                            <option>--Select--</option>
                                            {disciplinaries.map(disciplinary => (<option key={disciplinary.id} value={disciplinary.id}>{disciplinary.disciplinary_action_name}</option>))}

                                        </select>
                                    </div>
                                </FormGroup>                                   
                                </CCol>

                                <CCol lg={6} md={6}>
                                  <FormGroup>
                                      <div className="form-group">
                                          <label htmlFor="exampleInputname">Status</label>
                                          <select name="status_id" style={{ width: '100%', marginTop: '0px' }} 
                                              className="form-control" required
                                              onChange={(e) => {
                                                  setDisStatus(e.target.value)
                                                  setDiscipline({ ...disciplineInput, status_id: e.target.value })
                                              }}
                                              value={disciplineInput.status_id}
                                          >
                                              <option>--Select--</option>
                                              {status.map(stat => (<option key={stat.id} value={stat.id}>{stat.name}</option>))}

                                          </select>
                                      </div>
                                  </FormGroup>                                 
                                </CCol>

                                <CCol xs={12} className="text-center">
                                    <CButton color="primary" type="submit">
                                        <span className=''></span> Save Discipline
                                    </CButton>
                                </CCol>
                            </CForm>
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
          <Card>
            <Card.Body >
              <h3 className="text-center">DISCIPLINE LIST</h3>
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
                    //center={true}
                    pagination
                    onChangePage={handlePageChange}
                    onChangeRowsPerPage={handlePerRowsChange}
                    paginationRowsPerPageOptions={[10, 15, 20, 25, 30, 50, 100]}

                    paginationPerPage={perPage}
                    highlightOnHover
                  />

                  <Modal show={open} >
                    <Modal.Body className="text-center p-4">
                      <DialogTitle>Edit Module
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

                        <Row className="row form-group">
                            <Col lg={12} md={12}> <br />
                            <div>
                              <Card>
                              <Card.Body>
                                <div className="">
                            <div className="">
                              <CForm onSubmit={(e)  => handleEdit(e)}
                                className="row g-3 needs-validation"
                            >
                                <CCol lg={6} md={6}>
                                <FormGroup>

                                  <div className="form-group">
                                      <label htmlFor="exampleInputname">Staff Name</label>
                                      <select name="profile_id"
                                          className="form-control" required
                                          onChange={(e) => {
                                              setDisProfile(e.target.value)
                                              setNewDiscipline({ ...newDiscipline, profile_id: e.target.value })
                                          }}
                                          defaultValue={newDiscipline.profile_id}
                                      >
                                      
                                          <option>--Select--</option>
                                          {profiles.map(profile => (<option key={profile.id} value={profile.id}>{profile.first_name} {profile.last_name} {profile.other_name}</option>))}

                                      </select>
                                  </div>
                                </FormGroup>
                                </CCol>

                                <CCol lg={6} md={6}>
                                  <FormGroup>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputname">Violation</label>
                                        <select name="violations_id"
                                            className="form-control" required
                                            onChange={(e) => {
                                                setDisViolation(e.target.value)
                                                setNewDiscipline({ ...newDiscipline, violations_id: e.target.value })
                                            }}
                                            defaultValue={newDiscipline.violations_id}
                                        >
                                            <option>--Select--</option>
                                            {violations.map(violation => (<option key={violation.id} value={violation.id}>{violation.violation_type}</option>))}

                                        </select>
                                    </div>
                                    </FormGroup>
                                  </CCol>

                                  <CCol lg={6} md={6}>
                                    <FormGroup>
                                    <div className="form-group">
                                      <label htmlFor="exampleInputname">Offences</label>
                                        <Form.Control type="text" name="offences" 
                                        onChange={(e) => setNewDiscipline({ ...newDiscipline, offences: e.target.value })} 
                                        defaultValue={newDiscipline.offences} 
                                        className="form-control" 
                                      />
                                    </div>
                                    </FormGroup>
                                  </CCol>

                                  <CCol lg={6} md={6}>
                                    <FormGroup>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputname">Disciplinary Action</label>
                                        <select name="disciplinary_actions_id"
                                            className="form-control" required
                                            onChange={(e) => {
                                                setDisDisciplinary(e.target.value)
                                                setNewDiscipline({ ...newDiscipline, disciplinary_actions_id: e.target.value })
                                            }}
                                            defaultValue={newDiscipline.disciplinary_actions_id}
                                        >
                                            <option>--Select--</option>
                                            {disciplinaries.map(disciplinary => (<option key={disciplinary.id} value={disciplinary.id}>{disciplinary.disciplinary_action_name}</option>))}

                                        </select>
                                    </div>
                                    </FormGroup>
                                  </CCol>

                                  <CCol lg={6} md={6}>
                                    <FormGroup>
                                    <div className="form-group">
                                      <label htmlFor="exampleInputname">Duration</label>
                                        <Form.Control type="text" name="duration" 
                                        onChange={(e) => setNewDiscipline({ ...newDiscipline, duration: e.target.value })} 
                                        defaultValue={newDiscipline.duration} 
                                        className="form-control" 
                                      />
                                    </div>
                                    </FormGroup>
                                  </CCol>

                                  <CCol lg={6} md={6}>
                                    <FormGroup>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputname">Status</label>
                                        <select name="status_id"
                                            className="form-control" required
                                            onChange={(e) => {
                                                setDisStatus(e.target.value)
                                                setNewDiscipline({ ...newDiscipline, status_id: e.target.value })
                                            }}
                                            defaultValue={newDiscipline.status_id}
                                        >
                                            <option>--Select--</option>
                                            {status.map(stat => (<option key={stat.id} value={stat.id}>{stat.name}</option>))}

                                        </select>
                                    </div>
                                    </FormGroup>
                                  </CCol>
                            </CForm>
                          </div>
                        </div>
                            </Card.Body>
                          </Card>
                        </div>
                        </Col>
                      <Col xs={3} md={4}></Col>
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
                      <DialogTitle>Delete Discipline
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
                            <p>Do you really want to delete <span className="fw-bold"></span> discipline? <br /> This process cannot be undone.</p>
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
};
