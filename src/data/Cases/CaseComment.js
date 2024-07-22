import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import endpoint from "../../context/endpoint";
import Loader from "../Loader/loader";
import { Card, Row, Col } from "react-bootstrap";
import DataTable from "react-data-table-component";

const CaseComment = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const id = params.id;

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
  };

  useEffect(() => {
    getCaseComment();
  }, []);

  const getCaseComment = async () => {
    setLoading(true);
    try {
      const res = await endpoint.get(`/case/show/${id}`);
      setComments(res.data.data.Remarks);
      // console.log("Start ************************************************");
      // console.log("Case", res.data.data);
      // console.log("End ##################################################");

      // console.log("Start ************************************************");
      // console.log("Case Comments", res.data.data.Remarks);
      // console.log("End ##################################################");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
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
        <Card className="card border">
          {loading && <Loader />}
          {!loading && comments && (
            <Card.Body>
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

export default CaseComment;
