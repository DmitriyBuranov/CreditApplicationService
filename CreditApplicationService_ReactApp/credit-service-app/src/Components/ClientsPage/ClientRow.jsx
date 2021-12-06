import React, { useEffect, useState } from 'react';
import { Button, Form, Container, Row, Col, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import {helper} from "../../Services/helper"

function ClientRow(props) {

    function onDeleteClient(e) {
        fetch('api/v1/Clients?id=' + props.client.id, {
            method: 'DELETE',
        })
            .then((data) => {
                console.log(data);
                props.cb();
            })
            .catch(error => console.error('Unable to get CLients.', error));
    };

    return (
        <tr>
            <td>{props.client.id}</td>
            <td>{props.client.surname}</td>
            <td>{props.client.name}</td>
            <td>{helper.FormatDate(props.client.birthday)}</td>
            <td>{helper.FormatDate(props.client.createdAt)}</td>
            <td>
                <Row>
                    <Col>
                        <Link to={{ pathname: `/UpdateClientPage/${props.client.id}` }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                            </svg>
                        </Link>
                    </Col>
                    <Col><svg onClick={onDeleteClient} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                    </svg>
                    </Col>
                    <Col>
                        <Link to = {{ pathname: `/CreateCreditApplicationPage/${props.client.id}` }} >
                            <Button size="sm">Apply for credit</Button>
                        </Link>
                    </Col>
                </Row>
            </td>
        </tr>
    );

}




export default ClientRow;