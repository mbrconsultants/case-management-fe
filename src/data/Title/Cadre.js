import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-data-table-component-extensions/dist/index.css";
import endpoint from "../../context/endpoint";
import {Modal, FormGroup, Form } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { ErrorAlert, SuccessAlert } from "../../data/Toast/toast";
import { CForm } from "@coreui/react";
import { DropdownButton, ButtonGroup, Card, Button, Row, Col, InputGroup, Dropdown } from "react-bootstrap";


export const Cadre = ({cadres, getCadreList}) => {
    const { handleSubmit, register, formState: { errors }, reset } = useForm()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [cadreId, setCadreId] = useState("")
  const [ isLoading, setLoading] = useState(false);
  const [leaveId, setleaveId] = useState("")
  const [name, setNewTitile] = useState("")
  const [ show, setShow] = useState(false);
  const handleShowEditModal = () => {setShowEditModal(true)}
  const handleShowDeleteModal = () => {setShowDeleteModal(true)}
  const [ cadre, setCadreList] = useState([]);

  //delete function
  const deleteLeave = async (e, id) => {
    e.preventDefault()
    // await endpoint.delete(`/designation/delete/${TitleId.id}`).then((res) => {
    //          SuccessAlert(res.data.message);
    //         setShowDeleteModal(false)
    //         getDesignationList()
    // }).catch((error) => {
    //     if (error.response) {
    //         ErrorAlert(error.response.data.description);
       
    //     }
    // })
  }
  useEffect(() => {
    setCadreList([cadres])
  }, [cadres])

//edit designation
  const updateTitle = async (data) => {
    // await endpoint.put(`/designation/edit/${TitleId.id}`, data).then((res) => {
    //         setLoading(false);
    //         SuccessAlert(res.data.message);
    //         getDesignationList()
    //         setShowEditModal(false);
    //         setLoading(false);
    // }).catch((error) => {
    //   if (error.response) {
    //         ErrorAlert(error.response.data.description);
    //     }
    // })
   
  }

  return (
    <>
    <div className="table-responsive">
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>S/NO.</th>
            <th>Name</th>
            {/* <th>Created By</th>
            <th>ACTIONS</th> */}
          </tr>
        </thead>
        <tbody>
         {cadres.map((data, index)=>
          <tr key={data.id} >
            <td>{index + 1}</td>
            <td>{data.name == null ? "" : data.name.toUpperCase()}</td>
            {/* <td>
            <Link to="#"  className="btn btn-warning btn-sm my-1" variant="warning"  onClick={(e) => {handleShowEditModal(); setCadreId(data)}}>
                        <span className="fe fe-edit"> </span>
                    </Link>
                <Link to="#" onClick={(e) => {handleShowDeleteModal(); setCadreId(data)}} className="btn btn-danger btn-sm" variant="danger"> <span className="fe fe-trash"> </span> </Link>
            </td> */}
          </tr>
       )}
        </tbody>
      </table>
    </div>
    
        
    </>
  )
  
};
