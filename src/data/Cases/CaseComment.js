import React, { useState, useContext, useEffect } from "react";
import endpoint from "../../context/endpoint";



const CaseComment = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);


 // Show delete modal
 const handleShowDeleteModal = (row) => {
    setData(row);
    setShowDeleteModal(true);
  };


  useEffect(() => {
    getCaseComment();
  }, []);


  const getCaseComment = async () => {
    setLoading(true);
    try {
      const res = await endpoint.get("/case/comments");
      setData(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }


  const columns = [
    { name: "#", cell: (row, index) => index + 1, width: "65px" },
    {
      name: "Name",
      selector: (row) => row.suite_no,
      style: { textAlign: "right" },
      sortable: true,
      width: "120px",
      cell: (row) => (
        <div className="fs-12 fw-bold">{row.name.toUpperCase()}</div>
      ),
    },
    {
      name: "Action",
      selector: (row) => row.id,
      style: { textAlign: "right" },
      cell: (row) => (
        <div className="fs-12 fw-bold d-flex justify-content-end align-items-center">
          <button
            className="btn btn-dark btn-sm bright-btn btn-dark-bright"
            onClick={() => handleShowDeleteModal(row)}>
            <span className="fe fe-trash"> </span>
          </button>
        </div>
      ),
    },
  ];


};

export default CaseComment;
