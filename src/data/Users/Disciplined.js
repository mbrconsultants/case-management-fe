import React, { useState, useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import "react-data-table-component-extensions/dist/index.css";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { OverlayTrigger, Tooltip, Badge } from "react-bootstrap";
import endpoint from "../../context/endpoint";
import { Context } from "../../context/Context";
import moment from 'moment';

import { DropdownButton, ButtonGroup, Card, Button, Row, Col, InputGroup, Dropdown } from "react-bootstrap";

export const Disciplined = ({data}) => {

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>S/NO.</th>
            <th>FILE NO.</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>PHONE</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {data.map((staff, index)=>
          <tr key={staff.id}>
            <td>{index + 1}</td>
            <td>NJC/P20</td>
            <td>{staff.staffName}</td>
            <td>{staff.staffEmail}</td>
            <td>{staff.staffPhone}</td>
            <td>{staff.Status.name}</td>
            <td>
                <Badge
                  bg="success"
                  className="badge bg-danger   me-1 mb-1 mt-1"
                >
                  Active
                </Badge>
            </td>
          </tr>
          )}
       
        </tbody>
      </table>
    </div>
  )
}
