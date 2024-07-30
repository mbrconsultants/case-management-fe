import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { Modal, FormGroup, Form, Button, Card, Col } from "react-bootstrap";
import { CForm, CCol, CFormLabel, CFormFeedback, CFormInput, CInputGroup, CInputGroupText, CButton, CFormCheck, } from "@coreui/react";
import endpoint from "../../context/endpoint";
import { useForm } from 'react-hook-form';
import Loader from "../Loader/loader";
import { ErrorAlert, SuccessAlert } from "../../data/Toast/toast";

export const AllUsers = () => {
  const { handleSubmit, register, formState: { errors }, reset } = useForm()
  const [data, setUsersList] = useState('')
  const [value, setValue] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [roles, setRoles]=useState([]);
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    getUsersList();
    getRoles();
  }, []);

  const getUsersList = async () => {
    setLoading(true);
    try {
      const res = await endpoint.get('/user/list');
      setUsersList(res.data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }

  const getRoles = async () => {
    setLoading(true);
    try {
      const res = await endpoint.get('/role/getRoles');
      console.log("Roles List", res.data.data);
      setRoles(res.data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }

  const handleShowEditModal = (row) => {
    setValue(row);
    setShowEditModal(true)
    // console.log("user:",row);
    reset();
}

  // const modifyUser = async (data) => {
  //   setLoading(true);
  //   try {
  //     // await endpoint.post('/user/modify', { ...data, user_id: user.id });
  //     await endpoint.put(`/user/modify`, { ...data, user_id: user.id })
  //     .then((res) => {
  //       setLoading(false);
  //       SuccessAlert(res.data.message);
  //       getUsersList()
  //       setShowEditModal(false);
  //     }).catch((error) => {
  //     if (error.response) {
  //         ErrorAlert(error.response.data.description);
  //     }
  //     })
  //   }
  // }

  const modifyUser = async (data) => {
    await endpoint.post(`/user/modify`, { ...data, user_id: value.id })
    .then((res) => {
      setLoading(false);
      SuccessAlert(res.data.message);
      getUsersList()
      setShowEditModal(false);
      setLoading(false);
  }).catch((error) => {
  if (error.response) {
      ErrorAlert(error.response.data.description);
  }
  })
}

  const columns = [
    { name: "#", cell: (row, index) => (index + 1), width: "65px" },
    { 
      name: "Surname", 
      selector: (row) => row.surname, 
      sortable: true, 
      width: "200px" 
    },
    { 
      name: "First Name", 
      selector: (row) => row.first_name, 
      sortable: true, 
      width: "200px" 
    },
    { 
      name: "Email", 
      selector: (row) => row.email, 
      sortable: true, 
      width: "200px" 
    },
    { 
      name: "Role", 
      // selector: (row) => row.Row ? row.Role.role_name : "",
      selector: (row) => row.Role.role_name,
      sortable: true, 
      width: "200px" 
    },
    {
      name: "Action",
      selector: (row) => row.id,
      cell: (row) => (
        <div className="d-flex justify-content-end">
          <Link to={`/user/${row.id}`} className="btn btn-primary btn-sm mx-3">View</Link>
          <button className="btn btn-warning btn-sm" onClick={() => handleShowEditModal(row)}>Edit</button>
        </div>
      )
    }
  ];

  const tableDatas = { columns, data };

  return (
    <>
      {isLoading ? <Loader /> : 
        <DataTableExtensions {...tableDatas}>
          <DataTable
            columns={columns}
            data={data}
            fixedHeader
            pagination
            highlightOnHover
          />
        </DataTableExtensions>
      }

    <Modal show={showEditModal}>
      <Modal.Header>
        <Button
          onClick={() => setShowEditModal(false)}
          className="btn-close"
          variant=""
        >
          x
        </Button>
      </Modal.Header>
      <CForm onSubmit={handleSubmit(modifyUser)} className="row g-3 needs-validation">
        <Modal.Body>
          <div>
            <Card>
              <Card.Header>
                <Card.Title as="h3">Update User Details</Card.Title>
              </Card.Header>
              <Card.Body>
                <Col lg={12} md={12}>
                  <FormGroup>
                    <label htmlFor="exampleInputname">Surname</label>
                    <Form.Control
                      style={{ border: "1px solid #000", padding: "10px" }}
                      type="text"
                      name="name"
                      {...register("surname")}
                      defaultValue={value && value ? value.surname : ''}
                      className="form-control"
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="exampleInputname">First Name</label>
                    <Form.Control
                      style={{ border: "1px solid #000", padding: "10px" }}
                      type="text"
                      {...register("first_name")}
                      defaultValue={value && value ? value.first_name : ''}
                      className="form-control"
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="exampleInputname">Middle Name</label>
                    <Form.Control
                      style={{ border: "1px solid #000", padding: "10px" }}
                      type="text"
                      {...register("middle_name")}
                      defaultValue={value && value ? value.middle_name : ''}
                      className="form-control"
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="exampleInputname">Email</label>
                    <Form.Control
                      style={{ border: "1px solid #000", padding: "10px" }}
                      type="text"
                      {...register("email")}
                      defaultValue={value && value ? value.email : ''}
                      className="form-control"
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="exampleInputname">Password</label>
                    <Form.Control
                      style={{ border: "1px solid #000", padding: "10px" }}
                      type="password"
                      {...register("password")}
                      // defaultValue={value && value.Profile ? value.email : ''}
                      className="form-control"
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="exampleInputname">New Password</label>
                    <Form.Control
                      style={{ border: "1px solid #000", padding: "10px" }}
                      type="password"
                      {...register("new_password")}
                      // defaultValue={value && value.Profile ? value.email : ''}
                      className="form-control"
                    />
                  </FormGroup>
                  <FormGroup className='custom-select-wrapper'>
                    <label htmlFor="exampleInputname">Roles</label>
                    {/* <select className='form-control custom-select' {...register("role_id", { required: "Please select roles" })} style={{ border: "1px solid #000", padding: "10px" }} */}

                    <select className="form-control custom-select" {...register("role_id", { required: "Please select roles" })} style={{ border: "1px solid #000", padding: "10px" }}>
                        {/* <option  value={value.Role && value.Role.id ? value.Role.id:""}>
                          {value.Role && value.Role.role_name ? value.Role.role_name : '--Select Roles-- '}
                          </option> */}
                        {roles.map(role => (
                          <option key={role.id} value={role.id}>
                            {role.role_name}
                          </option>))}
                    </select>
                    {/* {errors.r?.type === "required" && ( <span className='text-danger'> Role required </span> )} */}
                  </FormGroup>
                  
                </Col>
              </Card.Body>
            </Card>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" className="me-1" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" type="submit" className="me-1">
            <span className="fe fe-arrow-right"></span> Save
          </Button>
        </Modal.Footer>
      </CForm>
    </Modal>

    <Modal show={showDeleteModal} >
                    <Modal.Header >
                        <Button
                            onClick={() => setShowDeleteModal(false)}
                            className="btn-close"
                            variant=""
                        >
                            x
                        </Button>
                    </Modal.Header>

                    <Modal.Body>
                        <div>
                        <Card>

                            <Card.Header>
                                <Card.Title as="h3">Remove User</Card.Title>

                            </Card.Header>
                            <Card.Body>
                                <Col lg={12} md={12}>
                                    Please confirm you are about to delete ?
                                </Col>

                            </Card.Body>

                        </Card>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="warning" className="me-1" onClick={() => setShowDeleteModal(false)}>
                            Close
                        </Button>
                        {/* <Button variant="danger" className="me-1" onClick={(e) => deleteDepartment(e, UnitId.id)}>
                            Delete
                        </Button> */}
                    </Modal.Footer>


    </Modal>
    </>
  )
};
