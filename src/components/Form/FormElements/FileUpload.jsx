import { FileUploadOutlined } from '@mui/icons-material';
import React from 'react'
import styled from 'styled-components';
// import axios from 'axios'
const InputBox = styled.input`
  width: 100%;
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
`
const FileUpload = ({ files, setFiles, removeFile }) => {

    const uploadHandler = (event) => {
        const file = event.target.files[0];
        file.isUploading = true;
        setFiles([...files, file])

        //upload
        const formData = new FormData();
        formData.append(
            file.name,
            file,
            file.name
        )

        //   axios.post('http://fileendpoint/', formData)
        //   .then((res) =>{
        //     file.isUploading = false;
        //     setFiles([...files, file])

        //   })
        //   .catch((err) =>{
        //       console.log(err)
        //       removeFile(file.name)
        //   })
       
    }

    return (
        <>
          <label htmlFor="file" style={{cursor: "pointer"}}>Attach Vehicle Partculars (pdf): <span><FileUploadOutlined /></span></label> <br />
            <InputBox type="file" id="file" style={{display: "none"}} onChange={uploadHandler} />
        </>
    )
}

export default FileUpload