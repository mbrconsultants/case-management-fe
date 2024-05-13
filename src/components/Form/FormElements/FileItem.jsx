import React from 'react'

const FileItem = ({file}) => {
  return (
    <li key={file.name}>
        <p>{file.name}</p>
    </li>
  )
}

export default FileItem