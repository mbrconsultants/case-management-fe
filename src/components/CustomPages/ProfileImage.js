import React from 'react'

const ProfileImage = ({profileImage}) => {
  return (
    <>
        <img className="img-fluid avatar brround cover-image" crossOrigin="anonymous" src={profileImage} alt="alt..." style={{height:`200px`, width:`200px`}}/>
    </>
  )
}

export default ProfileImage