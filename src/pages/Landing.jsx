import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Top from '../components/Components/top/Top'

import { Context } from "../context/Context";
import { Breadcrumb, Col, Row, Card } from "react-bootstrap";

const Containers = styled.div`
  
`
const BodyArea = styled.div`
    display: flex;
    align-content: center;
    justify-content: center;
    flex-direction: column;
    justify-content: center;
    height: calc(100vh - 140px);
    background-repeat: no-repeat;   
    background-image: url('/img/banner.jpeg');
    background-size: cover;

`
const Footer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    background-color: #0F0F0F;
    color: white;
    
`
const Logo = styled.img`
    /* margin: 30px; */
    width: 150px;
    height: 150px;
    border-radius: 50%;
    @media only screen and (max-width: 800px) {
    width: 120px;
    height: 120px;
    }
`
const Title = styled.h2`
    font-weight: bold;
    color: #FFFFFF;
    text-transform: uppercase;
    font-size: 24px;
    cursor: pointer;
    text-align: center;
    margin-top: 30px;
    @media only screen and (max-width: 800px) {
    font-size: 1.5rem;
    
    }
`
const Button = styled.button`
    background-color: #04A95D;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    padding: 10px 100px;
    margin-top: 20px;
    color: #fff;
    cursor: pointer;
    text-decoration: none;  
    border-radius: 5px;
    :hover{
        color: #fff;
    }  
    @media only screen and (max-width: 800px) {
    width: 80vw;
    font-size: 1rem;
    margin-top: 1rem;
    }    
`
const Details = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  p{
    color: white;
    font-size: 18px;
    margin-bottom: 29px;
  }
  @media only screen and (max-width: 800px) {
       padding: 5px 10px;
       p{
         text-align: center;
       }
    } 
`
const ItemWrapper = styled.div`
    display: flex;
`
const ItemIcon = styled.img`
    
`
const ItemDetails = styled.div`
    margin-left: 10px;
`
const Right = styled.div`
display: none;
   @media only screen and (max-width: 768px) {
        display: block;
    } 
    `

  //   #NightDiv{
  //     display: none;
  // }
  // @media only screen and (max-width:768px{
  //     #NightDiv{
  //         display: block;
  //     }
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
    } `
const Landing = () => {
  const { user, dispatch } = useContext(Context)



  return (
    <Containers>
      <Top />
      <BodyArea>
          <Details>
            <Logo src="/img/njc-logo.png" alt='njc logo' />
            <Title>
              NATIONAL JUDICIARY COUNCIL
            </Title>
            <p>A FAST, SIMPLE AND EFFICIENT way to review and verify the accuracy of financial records.</p>
            {user? 
            
            
            <Right>
            {user?
          
                <Link to="/dashboard" className='link'>
                   <Button>   Dashboard </Button> 
                </Link>
                :""}
                
            </Right>
            :
            <Link to="/login" className='link'>
              <Button>   
              Login 
              </Button> 
            </Link>
           }
          </Details>
      </BodyArea>
      <Container>
      <Right>
        <Row>
        <Col>
            <ItemWrapper>
                <ItemIcon src="/img/mailicon.svg" alt=''/>

                <ItemDetails>
                    <span>Email Address:</span> <br />
                    <span>info@njc.gov.ng</span>
                </ItemDetails>
            </ItemWrapper>
            </Col>
            <Col>
            <ItemWrapper>
                <ItemIcon src="/img/telicon.svg" alt=''/>
                <ItemDetails>
                    <span>Quick Contact:</span> <br />
                    <span>09-4603190</span>
                </ItemDetails>
            </ItemWrapper>
            </Col>
            
            </Row>
        </Right>
        </Container>
     
    </Containers>
  )
}

export default Landing

