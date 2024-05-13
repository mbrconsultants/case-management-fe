import React, { useState, useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import "react-data-table-component-extensions/dist/index.css";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { OverlayTrigger, Tooltip, Badge } from "react-bootstrap";
import endpoint from "../../context/endpoint";
import { Context } from "../../context/Context";
import moment from 'moment';
import Loader from "../Loader/loader";

export const Users = () => {

  const [data, setUsersList] = useState('')
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const getUsersList = async () => {
      setLoading(true);
      await endpoint.get('/user/profiles/all/show')
        .then((res) => {
          // console.log("users list response", res.data.data)
          setUsersList(res.data.data)
          setLoading(false)
        })
        .catch((err) => {
          setLoading(false)
          // console.log(err)
        })
    }
    getUsersList()
  }, [])


  const columns = [
    {
      name: "S/N.",
      cell: (row, index) => (index + 1),
      width: "65px",
    },
    // {
    //   name: "FILE NO.",
    //   selector: (row) => [row.file_number],

    //   style: { textAlign: 'right' },
    //   sortable: true,

    //   width: "150px",
    //   cell: (row) =>
    //     <div className="fs-12 fw-bold ">{row.file_number !== null ? (row.file_number) : ""}</div>
    //   ,
    // },
    {
      name: "NAME",
      selector: (row) => [row.first_name],

      style: { textAlign: 'right' },
      sortable: true,

      width: "300px",
      cell: (row) =>
        <div className="fs-12 fw-bold ">{row.title !== null ? (row.title).toUpperCase() : "" } {row.first_name !== null ? (row.first_name).toUpperCase() : "" } {row.last_name !== null ? (row.last_name).toUpperCase() : "" } {row.other_name !== null ? (row.other_name).toUpperCase() : "" }
        </div>
      ,
    },
    {
      name: "GENDER",
      selector: (row) => [row.gender],

      style: { textAlign: 'right' },
      sortable: true,

      width: "130px",
      cell: (row) =>
        <div className="fs-12 fw-bold ">{row.gender !== null ? (row.gender).toUpperCase() : ""}</div>
      ,
    },
    {
      name: "PHONE",
      selector: (row) => [row.phone],

      style: { textAlign: 'right' },
      sortable: true,

      width: "200px",
      cell: (row) =>
        <div className="fs-12 fw-bold ">{row.phone !== null ? (row.phone).toUpperCase() : ""}</div>
      ,
    },
    // {
    //   name: "EMAIL",
    //   selector: (row) => [row.email],

    //   style: { textAlign: 'right' },
    //   sortable: true,

    //   width: "280px",
    //   cell: (row) =>
    //     <div className="fs-12 fw-bold ">{row.email !== null ? (row.email) : ""}</div>
    //   ,
    // },
    {
      name: "STATUS",
      selector: (row) => [row.Profile.Status.name],

      style: { textAlign: 'right' },
      sortable: true,

      width: "150px",
      cell: (row) =>
        <div className="fs-12 fw-bold ">
          <Badge bg={row.staff_status_color ? row.staff_status_color : ''} className="badge me-1 mb-1 mt-1">
            {(row.staff_status ? row.staff_status : '')}
          </Badge>
        </div>
      ,
    },
    {
      name: "Action",
      style: { textAlign: 'right' },
      // width: "120px",
      cell: (row) =>
        <div className="fs-12 fw-bold ">
          <Link to={`/staffdocumentation/${row.id}`} className="btn btn-primary btn-sm"> <span className="fe fe-edit"> Documentation </span></Link>
        </div>
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
              // paginationServer
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
    </>
  )

};
