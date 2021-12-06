import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect, useState } from 'react';
import { Button, Form, Container, Row, Col, Table } from 'react-bootstrap'
import ClientRow from './ClientRow';
import {clientService} from "../../Services/ClientsServices"

function ClientsPage() {

    const [clients, setClients] = useState([]);
    const [searchExpression, setSearchExpression] = useState();

    useEffect(() => {
        search();   
    }, []);

    function handleChanges(e){
        console.log("Catch changes in surname");
        setSearchExpression(e.currentTarget.value);
    };

    function search(){
        clientService.GetClients(searchExpression)
        .then((data) => {
            console.log(data);
            setClients(data);
        })
        .catch(error => console.error('Unable to get Clients by Surname.', error));            ;
    };

    return (
        <div>
            <Container>
                <h1>Clients</h1>
                <Form>
                    <Form.Label>Search by Surame</Form.Label>
                    <Row>
                        <Col md={4}>
                            <Form.Control
                                type="text"
                                name="searchExpression"
                                onChange = {handleChanges}
                            />
                        </Col>
                        <Col>
                            <Button variant="secondary" onClick={search}>Search</Button>
                        </Col>
                        <Col className="d-flex flex-row-reverse" >
                            <Button href="/CreateClientPage" >Create a new client</Button>
                        </Col>
                    </Row>
                </Form>
                <Table className="mt-3" striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Surname</th>
                            <th>Name</th>
                            <th>Birthday</th>
                            <th>Created</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((client, i) => (
                            <ClientRow key={i} client={client} cb={search}></ClientRow>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )

}


export default ClientsPage;