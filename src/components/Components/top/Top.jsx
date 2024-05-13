import React,{ useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Context } from "../../../context/Context";


const Container = styled.div`
    background-color: #0F0F0F;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px;
    height: 80px;
    color: white;
    @media only screen and (max-width: 800px) {
        flex-direction: column;
    } 
`
const Left = styled.div`
    display: flex;
    gap: 20px;
`
const ItemWrapper = styled.div`
    display: flex;
`
const ItemIcon = styled.img`
    
`
const ItemDetails = styled.div`
    margin-left: 10px;
`

const Center = styled.div`
 @media only screen and (max-width: 800px) {
     h2{
         font-size: 20px;
         margin-top: 30px;
      }

      
    } 
`

const Right = styled.div`
   @media only screen and (max-width: 800px) {
       
   display:none
    } 
`
const Top = () => {
    const { user, dispatch } = useContext(Context)
  return (
    <Container>
        
       
        <div style={{display:'flex', alignItems:'center', justifyContent:'center' , margin:"auto"}}>
          
        <Center  >
              <h2>AUDIT MANAGEMENT SYSTEM</h2>
        </Center>
        </div>
        <div>
        <Right>
        {user?
      
            <Link to="/dashboard" className='link'>
               Dashboard
            </Link>
            :""}
            
        </Right>
        </div>
       
    </Container>
  )
}

export default Top