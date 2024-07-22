import { Breadcrumb, Col, Row, Card, Button } from "react-bootstrap";
import CaseComment from "../../../data/Cases/CaseComment";

export default function Caselist() {
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

      {/* <Search.SearchStaff handleSearch={handleSearch} data={data}/> */}

      <Row>
        <Col sm={12} className="col-12">
          <Card>
            <Card.Header>
              <div className="d-flex align-items-center w-100">
                <div className="card-title text-center mb-0 flex-grow-1">
                  Case Comments{" "}
                </div>
              </div>
            </Card.Header>

            <Card.Body>
              <div className="">
                <div className="">
                  <CaseComment />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
