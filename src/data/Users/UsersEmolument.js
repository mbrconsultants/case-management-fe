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
import { DropdownButton, ButtonGroup, Card, Button, Row, Col, InputGroup, Dropdown } from "react-bootstrap";

export const UsersEmolument = () => {
  const [isLoading, setLoading] = useState(false);
  
	const [data, setStaff] = useState([]);
	//get all documented staff
	const users = async () => {
    setLoading(true)
		await endpoint
			.get("/user/profiles/documented/all/show")
			.then((res) => {
				setStaff(res.data.data);
        setLoading(false)
				// console.log("home emo",res.data.data);
			})
			.catch((err) => {
        // console.log(err)
      });
	};

	useEffect(() => {
		users();
	}, []);

  const columns = [
    {
      name: "#",
      cell: (row, index) => (index + 1),
      width: "65px",
    },
    {
      name: "File Number",
      selector: (row) => [row.file_number],

      style: { textAlign: 'right' },
      sortable: true,

      width: "130px",
      cell: (row) =>
        <div className="fs-12 fw-bold ">{row.file_number !== null ? (row.file_number).toUpperCase() : ""}</div>
      ,
    },
    {
      name: "Fullname",
      selector: (row) => [row.first_name],

      style: { textAlign: 'right' },
      sortable: true,

      width: "180px",
      cell: (row) =>
        <div className="fs-12 fw-bold ">
        {/* {row.first_name !== null ? (row.first_name).toUpperCase() : ""} */}
        {(row.first_name).toUpperCase() + ' ' + (row.last_name).toUpperCase() + " " + (row.other_name).toUpperCase()}
        </div>
      ,
    },
    // {
    //   name: "Last Name",
    //   selector: (row) => [row.last_name],

    //   style: { textAlign: 'right' },
    //   sortable: true,

    //   width: "160px",
    //   cell: (row) =>
    //     <div className="fs-12 fw-bold ">{row.last_name !== null ? (row.last_name).toUpperCase() : ""}</div>
    //   ,
    // },
    // {
    //   name: "Other Name",
    //   selector: (row) => [row.other_name],

    //   style: { textAlign: 'right' },
    //   sortable: true,

    //   width: "140px",
    //   cell: (row) =>
    //     <div className="fs-12 fw-bold ">{row.other_name !== null ? (row.other_name).toUpperCase() : ""}</div>
    //   ,
    // },
    {
      name: "Department",
      selector: (row) => [row.Department.name],

      style: { textAlign: 'right' },
      sortable: true,

      width: "180px",
      cell: (row) =>
        <div className="fs-12 fw-bold ">{(row.Department !== null ? row.Department.name : "")}</div>
      ,
    },
    {
      name: "Status",
      selector: (row) => [row.Status],

      style: { textAlign: 'right' },
      sortable: true,

      width: "100px",
      cell: (row) =>
        <div

          className={`fs-12 fw-bold badge bg-${row.Status.color}`}>
          {row.Status.name}
          {/* {  row.status===2 ? status=' Registered' : status= 'Not Registered'} */}
        </div>
      ,
    },
    {
      name: "Actions",
      selector: (row) => [row.id],

      style: { textAlign: 'right' },
      sortable: true,

      width: "300px",
      cell: (row) =>
        <div className="fs-12 fw-bold mx-1 ">
          <td>
            <Link to={`/staffemolument/${row.id}`} className="btn btn-primary btn-sm mx-1"> <span className="fe fe-edit"> Create Emolument </span></Link>
            <Link to={`#`} className="btn btn-info btn-sm mx-1 "> <span className="fe fe-eye"> View </span></Link>
          </td>
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
              //  selectableRows
              data={data}
              // customStyles={customStyles}
              // persistTableHead
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