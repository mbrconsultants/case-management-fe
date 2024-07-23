import { Breadcrumb, Col, Row, Card, Button } from "react-bootstrap";
import CommentData from "../../../data/Cases/CommentData";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import endpoint from "../../context/endpoint";
// import Loader from "../Loader/loader";
import Loader from "../../../data/Loader/loader";
import endpoint from "../../../../src/context/endpoint";

export default function CaseComment() {
  const [data, setData] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    getCaseComment();
  }, []);

  const getCaseComment = async () => {
    setLoading(true);
    try {
      const res = await endpoint.get(`/case/show/${id}`);
      setComments(res.data.data.Remarks);
      setData(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header ">
        <div>
          <h1 className="page-title">All Comments </h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
              View Comments
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>

      <Row>
        <Col sm={12} className="col-12">
          <Card>
            <Card.Header>
              <div className="d-flex align-items-center w-100">
                <div className="card-title text-center mb-0 flex-grow-1">
                  Case Comments For {data.suite_no}
                </div>
              </div>
            </Card.Header>

            <Card.Body>
              <div className="">
                <CommentData
                  comments={comments}
                  data={data}
                  loading={loading}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
