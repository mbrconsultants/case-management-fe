import React, { useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Loader from "../Loader/loader";

const CommentData = ({ comments, data, loading }) => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
  };

  const commentColumns = [
    {
      name: "S/N",
      cell: (row, index) => index + 1 + (page - 1) * perPage,
      width: "7%",
    },
    {
      name: "Comment",
      selector: (row) => row.comment,
      sortable: true,
      width: "93%",
      cell: (row) => <div>{row.comment}</div>,
    },
  ];

  return (
    <>
      <div>
        {/* <Card className="card border"> */}
        <Card className="">
          {loading && <Loader />}
          {!loading && comments && (
            <Card.Body>
              {/* <h5 className="text-center">{data.suite_no}</h5> */}
              <Row className="row">
                <Col md={12} className="col-md-12">
                  <DataTable
                    columns={commentColumns}
                    data={comments}
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
                </Col>
              </Row>
            </Card.Body>
          )}
        </Card>
      </div>
    </>
  );
};

export default CommentData;
