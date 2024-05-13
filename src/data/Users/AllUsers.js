import React, { useState, useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import "react-data-table-component-extensions/dist/index.css";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { OverlayTrigger, Tooltip, Badge } from "react-bootstrap";
import endpoint from "../../context/endpoint";
import { Context } from "../../context/Context";
import { CForm, CCol, CFormLabel, CFormFeedback, CFormInput, CInputGroup, CInputGroupText, CButton, CFormCheck, } from "@coreui/react";
import moment from 'moment';
import {Modal, FormGroup, Form } from "react-bootstrap";
import { ErrorAlert, SuccessAlert } from "../../data/Toast/toast";
import { DropdownButton, ButtonGroup, Card, Button, Row, Col, InputGroup, Dropdown } from "react-bootstrap";
import Loader from "../Loader/loader";
import { useForm } from 'react-hook-form';

export const AllUsers = () => {
  const { handleSubmit, register, formState: { errors }, reset } = useForm()
  const [data, setUsersList] = useState('')
  const [value, setValue] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [roles, setRoles]=useState([]);

 

  //get list
  const getUsersList = async () => {
    setLoading(true);
    await endpoint.get('/user/list/1')
      .then((res) => {
        setUsersList(res.data.data)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
      })
  }
     //get roles
     const getRoles = async () => {
      setLoading(true);
      await endpoint.get('/role/getRoles')
        .then((res) => {
          setRoles(res.data.data)
          setLoading(false)
        })
        .catch((err) => {
          setLoading(false)
          // console.log(err)
        })
    }
 

  const handleShowEditModal = (row) => {
    setValue(row);
    setShowEditModal(true)
    // console.log("user:",row);
    reset();
}

const handleShowDeleteModal = (row) => {
  setValue(row);
  setShowDeleteModal(true)
}
useEffect(() => {
  getUsersList()
  getRoles()
}, [])


//Edit department
const modifyUser = async (data) => {
  await endpoint.put(`/user/modify/${value.id}`, data)
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
    {
      name: "#",
      cell: (row, index) => (index + 1),
      width: "65px",
    },
    {
      name: "First Name",
      selector: (row) => [row.fullname],

      style: { textAlign: 'right' },
      sortable: true,

      width: "300px",
      cell: (row) =>
        <div className="fs-12 fw-bold ">{row.fullname.toUpperCase()}</div>
      ,
    },
  
 
    {
      name: "Email",
      selector: (row) => [row.email],

      style: { textAlign: 'right' },
      sortable: true,

      width: "200px",
      cell: (row) =>
        <div className="fs-12 fw-bold ">{row.email !== null ? (row.email) : ""}</div>
      ,
    },
    {
      name: "Role",
      selector: (row) => [row.Role.role_name],

      style: { textAlign: 'right' },
      sortable: true,

      width: "200px",
      cell: (row) =>
        <div className="fs-12 fw-bold ">{row.Role ? (row.Role.role_name ) : ""}</div>
      ,
    },
 
    {
      name: "Action",
      selector: (row) => [row.id],

      style: { textAlign: 'right' },
      cell: (row) => (
        <div className="fs-12 fw-bold">
          <button
            className="btn btn-warning btn-sm my-1"
            variant="warning"
            onClick={() => handleShowEditModal(row)}
          >
            <span className="fe fe-edit"> </span>
          </button>
          <button
            className="btn btn-danger btn-sm"
            variant="danger"
            onClick={() => handleShowDeleteModal(row)}
          >
            <span className="fe fe-trash"> </span>
          </button>
        </div>
      )
    }

  ]

  const tableDatas = {
    columns,
    data,
  };

  return (
    <>
      {
        <DataTableExtensions {...tableDatas}>
          {isLoading ? <Loader />
            : <DataTable
              fixedHeader
              columns={columns}
              // selectableRows
              data={data}
              // customStyles={customStyles}
              persistTableHead
              defaultSortField="id"
              defaultSortAsc={false}
              striped={true}
              center={true}
              pagination
              paginationServer
              // paginationTotalRows={totalRows}
              // onChangePage={handlePageChange}
              // onChangeRowsPerPage={handlePerRowsChange}
              paginationRowsPerPageOptions={[10, 15, 20, 25, 30, 50, 100]}
              // onChangeRowsPerPage(currentRowsPerPage, currentPage)
              // paginationPerPage={perPage}
              highlightOnHover
            />
          }

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
                <label htmlFor="exampleInputname">First Name</label>
                <Form.Control
                  type="text"
                  name="name"
                  {...register("first_name")}
                  readOnly
                  defaultValue={value && value.Profile ? value.Profile.first_name : ''}
                  className="form-control"
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="exampleInputname">Last Name</label>
                <Form.Control
                  type="text"
                  readOnly
                  {...register("last_name")}
                  defaultValue={value && value.Profile ? value.Profile.last_name : ''}
                  className="form-control"
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="exampleInputname">Other Names</label>
                <Form.Control
                  type="text"
                  readOnly
                  {...register("other_name")}
                  defaultValue={value && value.Profile ? value.Profile.other_name : ''}
                  className="form-control"
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="exampleInputname">Email</label>
                <Form.Control
                  type="text"
                  {...register("email")}
                  defaultValue={value && value.Profile ? value.email : ''}
                  className="form-control"
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="exampleInputname">Password</label>
                <Form.Control
                  type="password"
                  {...register("password")}
                  // defaultValue={value && value.Profile ? value.email : ''}
                  className="form-control"
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="exampleInputname">New Password</label>
                <Form.Control
                  type="password"
                  {...register("new_password")}
                  // defaultValue={value && value.Profile ? value.email : ''}
                  className="form-control"
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="exampleInputname">Roles</label>
                <select className="form-control" {...register("role_id", { required: "Please select roles" })}>
                                        <option  defaultValue={value.Role && value.Role.id ? value.Role.id:""}>{value.Role && value.Role.role_name ? value.Role.role_name : '--Select Roles-- '}</option>
                                        {roles.map(role => (<option key={role.id} value={role.id}>{role.role_name}</option>))}
                                    </select>

                                    {errors.r?.type === "required" && ( <span className='text-danger'> Role required </span> )}
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
                            <Card.Title as="h3">Remove Unit</Card.Title>

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
