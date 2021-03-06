import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect, useState } from 'react';
import { Button, Form, Container, Row, Col, Table } from 'react-bootstrap'
import {helper} from "../../Services/helper"

function CreditApplicationsPage() {

    const [credits, setCredits] = useState([]);
    const [searchExpression, setSearchExpression] = useState();

    //TO DO убрать запрос в сервис

    useEffect(() => {
        search();
    }, []);


    function search() {
        fetch('api/v1/CreditApplications/WithCLientsInfo' + searchExpression)
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                setCredits(data);
            })
            .catch(error => console.error('Unable to get credits with clients', error));;
    };



    function handleChanges(e) {
        console.log("Catch changes");
        setSearchExpression(e.currentTarget.value);
    };

    function isBlank(str) {
        return (!str || /^\s*$/.test(str));
    };

    return (
        <div>
            <Container>
                <h1>Credit applications</h1>
                <Form>
                    <Form.Label>Search by Result</Form.Label>
                    <Row>
                        <Col md={4}>
                            <Form.Select name="type" defaultValue="All" onChange={handleChanges}>
                                <option name="approved">Approved</option>
                                <option name="denied">Denied</option>
                                <option name="all">All</option>
                            </Form.Select>
                        </Col>
                        <Col>
                            <Button variant="secondary" onClick={search}>Show</Button>
                        </Col>
                    </Row>
                </Form>

                <Table className="mt-3" striped bordered hover>
                    <thead>
                        <tr>
                            <th>Credit Id</th>
                            <th>Client Id</th>
                            <th>Surname</th>
                            <th>Name</th>
                            <th>Created</th>
                            <th>Result</th>
                        </tr>
                    </thead>
                    <tbody>

                        {credits.map((credit, i) => (
                            <tr  key={i}>
                                <td>{credit.creditId}</td>
                                <td>{credit.clientId}</td>
                                <td>{credit.surname}</td>
                                <td>{credit.name}</td>
                                <td>{helper.FormatDate(credit.createdAt)}</td>
                                <td>{(credit.result)? "Approved": "Denied"}</td>
                            </tr>
                        ))}

                    </tbody>
                </Table>
            </Container>
        </div>
    )

}


export default CreditApplicationsPage;