import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const GoBackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Button
      className="btn btn-primary float-right mt-7"
      variant="default-light"
      onClick={goBack}
    >
      Back
    </Button>
  );
};

export default GoBackButton;
