import React from 'react';
import { Link } from "react-router-dom"
import { Row, Col } from "react-bootstrap"

const Footer = () => {
	const year = new Date()
	const curYear = year.getFullYear()
	return (
		<div className="footer">
			<div className="container">
				<Row className="align-items-center flex-row-reverse">
					<Col className="text-center" sm={12} md={12} lg={12}>
						Copyright © {curYear} <Link to="#">NJC</Link>. Designed and Developed by <Link to="https://mbrcomputers.com/"> MBR COMPUTERS CONSULTANTS LIMITED </Link> All rights reserved
					</Col>
				</Row>
			</div>
		</div>
	);
}

export default Footer;
