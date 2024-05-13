import { Row, Col, Card, Button } from "react-bootstrap";
import React, { useState, useContext, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import "react-data-table-component-extensions/dist/index.css";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { Context } from "../../context/Context";
import moment from "moment";
import {
	CForm,
	CCol,
	CFormLabel,
	CFormFeedback,
	CFormInput,
	CInputGroup,
	CInputGroupText,
	CButton,
	CFormCheck,
} from "@coreui/react";
import { useForm } from "react-hook-form";
import { ErrorAlert, SuccessAlert } from "../../data/Toast/toast";
import endpoint from "../../context/endpoint";
import "./SearchStaff.css";

export const SearchStaff = ({handleSearch, data, setDisciplinaryFormFields }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const [isLoading, setLoading] = useState(false);
	const [suggestions, setSuggestions] = useState([]);
	const [users, setUsers] = useState("");

	const onChangeHandler = (users) => {
		let matches = [];
		if (users.length > 0) {
			matches = data.filter((userData) => {
				const regex = new RegExp(`${users}`, "gi");
				return userData.first_name.match(regex);
			});
		}
		setSuggestions(matches);
		setUsers(users);
	};
	const onSuggestHandler = (suggestion) => {
		// console.log("user", suggestion.first_name+' '+suggestion.last_name+' '+suggestion.other_name)
		setUsers(suggestion.first_name+' '+suggestion.last_name+' '+suggestion.other_name);
		if(users){
			setDisciplinaryFormFields(suggestion)
		}
		setSuggestions([]);
	};

	return (
		<Row>
			<Col
				lg={12}
				xl={12}
				md={12}
				sm={12}>
				<Card>
					<Card.Header>
						<Card.Title as="h3">Search Staff.</Card.Title>
					</Card.Header>
					<Card.Body>
						<CForm onSubmit={handleSubmit(handleSearch)}>
							<div className="input-group">
								<input
									type="text"
									// name="searchKey"
									// {...register("searchKey")}
									className="form-control"
									onChange={(e) => onChangeHandler(e.target.value)}
									value={users}
									placeholder="Search For Staff..."
								/>
								<Button
									type="submit"
									className="input-group-text btn btn-primary">
									<i
										className="fa fa-search"
										aria-hidden="true"></i>
								</Button>
							</div>
						</CForm>
						<ul>
							{suggestions &&
								suggestions.map((suggestion, index) => (
									<div key={index} className="suggestion"
										onClick={() => {
											// console.log("user suggestion", suggestion)
											onSuggestHandler(suggestion)
										}}
									>
									<a className="dataItem" style={{color:'black'}} href={`/staffdocumentation/${suggestion.id}`}>
									 	{suggestion.first_name} {suggestion.last_name} {suggestion.other_name} 
									</a>
										
									</div>
								))}
						</ul>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	);
};
