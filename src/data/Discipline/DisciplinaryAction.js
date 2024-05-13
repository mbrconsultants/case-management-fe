import React, { useState, useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import "react-data-table-component-extensions/dist/index.css";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { OverlayTrigger, Tooltip, Modal } from "react-bootstrap";
import endpoint from "../../context/endpoint";
import { ErrorAlert, SuccessAlert } from "../Toast/toast";
import { DropdownButton, ButtonGroup, Card, Button, Row, Col, InputGroup, Dropdown } from "react-bootstrap";
import { EditDisciplinaryAction } from "./EditDisciplinaryAction";


export const DisciplinaryActions = ({disciplinaryData}) => {

  const [isLoading, setLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const [disciplinaryId, setDisciplinaryId] = useState("")
  const [data, setDisciplinaryList] = useState("");

  const handleShowEditModal = () => {
    setShowEditModal(true)
  }

  const handleShowDeleteModal = () => {
    setShowDeleteModal(true)
  }

  useEffect(() => {

    getDisciplinaryList()

  }, [disciplinaryData]);

  const getDisciplinaryList = async () => {
    await endpoint.get(`/discipline/get_disciplinaryActions`)
      .then((res) => {
        // console.log(res.data.data)
        setDisciplinaryList(res.data.data)
      })
      .catch((err) => {
        // console.log(err)
      })
  }

  const deleteDisciplinaryAction = async (e, id) => {
    e.preventDefault()
    // console.log(id)
    //point to update subcategory endpoint with category id: catId and update category
    await endpoint.delete(`/discipline/delete_disciplinaryAction/${id}`).then((res) => {
      // console.log(res.data.data)
      SuccessAlert(res.data.message)
      setDisciplinaryList((disAList) => disAList.filter((disa) => disa.id !== id))
      setShowDeleteModal(false)

    }).catch((err) => {
      setShowDeleteModal(false)
      ErrorAlert(err.response.data.message)
      // console.log(err)
    })
  }

  const columns = [
    {
      name: "#",
      cell: (row, index) => (index + 1),
      width: "65px",
    },
    {
      name: "Name",
      selector: (row) => [row.disciplinary_action_name],

      style: { textAlign: 'right' },
      sortable: true,

      width: "250px",
      cell: (row) =>
        <div className="fs-12 fw-bold ">
        { (row.disciplinary_action_name)}
        </div>
      ,
    },
    {
      name: "Description",
      selector: (row) => [row.disciplinary_action_description],

      style: { textAlign: 'right' },
      sortable: true,

      width: "300px",
      cell: (row) =>
        <div className="fs-12 fw-bold ">
        { (row.disciplinary_action_description)}
        </div>
      ,
    },
    {
      name: "Actions",
      selector: (row) => [row.id],

      style: { textAlign: 'right' },
      sortable: true,

      width: "140px",
      cell: (row) =>
        <div className="fs-12 fw-bold ">
           <Link to="#" className="btn btn-primary btn-sm" variant="primary"  onClick={(e) => {
            handleShowEditModal();
            setDisciplinaryId(row)
            }}> <span className="fe fe-edit"> Edit </span></Link>

          <button type="button" onClick={ (e) => {
            handleShowDeleteModal();
            setDisciplinaryId(row)
          }} className="btn btn-danger btn-sm mx-1" variant="danger"><span className="fe fe-trash"> </span></button>
        </div>
      ,
    }

  ]

  const tableDatas = {
    columns,
    data,
  };


  return (
    <>
    <DataTableExtensions {...tableDatas}>
      {isLoading ?
        <div>
          <div style={{ display: 'flex', justifyContent: 'right', marginRight: "20px" }} className="mb-9" >
            <img
              src={require("../../assets/images/loader.svg").default}
              className="loader-img mb-4"
              alt="Loader"

            />

          </div>
          <div className="mb-2" style={{ textAlign: "center", marginTop: "20px", paddingTop: "20px" }}>Loading...</div>
        </div> : <DataTable
          //  fixedHeader
          columns={columns}
          //  selectableRows
          data={data}
          // customStyles={customStyles}
          // persistTableHead
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
        />}

    </DataTableExtensions>

    <Modal show={showEditModal} >

              <Modal.Header >
                  <Button
                      onClick={() => {
                        setDisciplinaryId("");
                        setShowEditModal(false);
                      }}
                      className="btn-close"
                      variant=""
                  >
                      x
                  </Button>
              </Modal.Header>
              {disciplinaryId ?
                  <EditDisciplinaryAction disciplinary={disciplinaryId} setDisciplinaryId={setDisciplinaryId} setShowEditModal={setShowEditModal} getDisciplinaryList={getDisciplinaryList}/>
                : ''}
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
                          <Card.Title as="h3">Remove Disciplinary Action</Card.Title>

                      </Card.Header>
                      <Card.Body>
                          <Col lg={12} md={12}>
                              Please confirm you are about to delete disciplinary action
                          </Col>

                      </Card.Body>

                  </Card>
                  </div>
              </Modal.Body>
              <Modal.Footer>
                  <Button variant="warning" className="me-1" onClick={() => setShowDeleteModal(false)}>
                      Close
                  </Button>
                  <Button type="submit" onClick={(e) => deleteDisciplinaryAction(e, disciplinaryId.id)} variant="primary" className="me-1"> <span className="fe fe-arrow-right"></span>
                      Delete Disciplinary Action
                  </Button>

              </Modal.Footer>
    </Modal>
    </>
  )
};
