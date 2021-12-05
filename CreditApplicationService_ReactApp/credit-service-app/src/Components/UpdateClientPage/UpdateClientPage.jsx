import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect, useState } from 'react';
import {useParams} from "react-router-dom";
import { Button, Form, Container, Row, Col} from 'react-bootstrap'

function UpdateClientPage(props) {

    const params = useParams();
    const id = Number(params.id);
    const [client, setClient] = useState([]);

    useEffect(() => {
        fetch('/api/v1/Clients/' + id)
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                setClient(data);
                setClient(client => ({ ...client, birthday: formatDate(data.birthday) }));
            })
            .catch(error => console.error('Unable to get Client by id.', error));                 
    }, [id]);

    function handleChanges(e) {
        const { name, value } = e.target;
        setClient(client => ({ ...client, [name]: value }));
        e.preventDefault();
    };

    function updateClient(){
        const dataForRequest = {
            name: client.name,
            surname: client.surname,
            birthday: new Date(client.birthday).toISOString(),
            createdAt: new Date(client.createdAt).toISOString(),
            salary: Number(client.salary)
        }

        fetch("/api/v1/Clients/"+ id, {
            method: 'PUT', 
            body: JSON.stringify(dataForRequest) ,
            headers: {
                'Content-Type': 'application/json'
              },
        })
        .then((data) => {
            console.log(data);
        })
        .catch(error => console.error('Unable to update Client', error));   
    }

    function formatDate(date) {
        date = new Date(date);
        var dd = date.getDate();
        if (dd < 10) dd = '0' + dd;
      
        var mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;
      
        var yyyy = date.getFullYear();
      
        return yyyy+ '-' + mm + '-' + dd;
    }

    return (
        <div>
            <Container>
                <p>Update a client</p>
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