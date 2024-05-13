import React from 'react'
import FileItem from './FileItem'

const FileList = ({files, removeFile}) => {
    const deleteFileHandler = (_name) =>{
        //
        console.log('deleted')
    }
  return (
    <ul>
        {files.map((fileName, id) =>(
            <FileItem key={id}
            file={fileName}
            deleteFile={deleteFileHandler}
            />
        
        ))}
    </ul>
  )
}

export default FileList