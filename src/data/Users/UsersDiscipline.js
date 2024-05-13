import { DropdownButton, ButtonGroup, Card, Button, Row, Col, InputGroup, Dropdown } from "react-bootstrap";

export const UsersDiscipline = ({ handleShow, data }) => {
    let id = 1
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
          {data.length > 0 ?
          <tbody>
            {data.map((staff, index)=>
            <tr>
            <td>{index + 1}</td>
            <td>NJC/P20</td>
            <td>{staff.staffName}</td>
            <td>{staff.staffEmail}</td>
            <td>{staff.staffPhone}</td>
            <td>{staff.Status.name}</td>
            <td>
                <Button className="btn btn-success btn-sm mx-1" onClick={handleShow}> <span className="fe fe-edit"> Enter Disciplinary Action </span></Button>
              </td>
            </tr>
            )}
          </tbody>
          :
          <div>
            No Record
          </div>
        }
        </table>
      </div>
    )
  }