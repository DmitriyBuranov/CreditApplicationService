import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect, useState } from 'react';
import {useParams} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Button, Form, Container, Row, Col} from 'react-bootstrap'
import {clientService} from "../../Services/ClientsServices"
import {helper} from "../../Services/helper"

function UpdateClientPage(props) {

    let navigate = useNavigate();

    const params = useParams();
    const id = Number(params.id);
    const [client, setClient] = useState([]);

    useEffect(() => {
        clientService.GetClientById(id)
            .then((data) => {
                console.log(data);
                setClient(data);
                setClient(client => ({ ...client, birthday: helper.FormatDate(data.birthday) }));
            })
            .catch(error => console.error('Unable to get Client by id.', error));                 
    }, [id]);

    function handleChanges(e) {
        const { name, value } = e.target;
        setClient(client => ({ ...client, [name]: value }));
        e.preventDefault();
    };

    function updateClient(){
        clientService.UpdateClient(client)
        .then((data) => {
            console.log(data);
        })
        .catch(error => console.error('Unable to update Client', error)); 
        
        navigate("/ClientsPage");
    }

    return (
        <div>
            <Container>
                <h1>Update a client</h1>
                <Form onSubmit={updateClient} onChange={handleChanges}>
                    <Row className="mb-3" xs={2} md={4} lg={4}>

                        <Form.Group as={Col} controlId="formGridId">
                            <Form.Label>Id</Form.Label>
                            <Form.Control type="text" name="id" disabled defaultValue = {client.id}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridSurname">
                            <Form.Label>Surname</Form.Label>
                            <Form.Control type="text" name="surname" defaultValue = {client.surname} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name"  defaultValue = {client.name}/>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3" xs={2} md={4} lg={4}>
                        <Form.Group as={Col} controlId="formGridBirthday">
                            <Form.Label>Birthday</Form.Label>
                            <Form.Control type="date" name="birthday"  defaultValue = {client.birthday}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridSalary">
                            <Form.Label>Salary</Form.Label>
                            <Form.Control type="number" name="salary"  defaultValue = {client.salary}/>
                        </Form.Group>
                    </Row>

                    <Row  xs={2} md={2} lg={6}>
                    <Button className="ms-2"  variant="primary" type="submit">
                        Save
                    </Button>

                    </Row>
                </Form>
            </Container>
        </div>
    );
}

export default UpdateClientPage;