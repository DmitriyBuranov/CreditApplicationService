import 'bootstrap/dist/css/bootstrap.min.css'
import React, {  useState } from 'react';
import { Button, Form, Container, Row, Col} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';

function CreateClientPage() {
    let navigate = useNavigate();
    const [client, setClient] = useState([]);

    function handleChanges(e) {
        const { name, value } = e.target;
        setClient(client => ({ ...client, [name]: value }));
        e.preventDefault();
    };

    function createClient(){
        const dataForRequest = {
            name: client.name,
            surname: client.surname,
            birthday: new Date(client.birthday).toISOString(),
            createdAt: new Date(),
            salary: Number(client.salary)
        }

        fetch("/api/v1/Clients/", {
            method: 'POST', 
            body: JSON.stringify(dataForRequest) ,
            headers: {
                'Content-Type': 'application/json'
              },
        })
        .then((data) => {
            console.log(data);
        })
        .catch(error => console.error('Unable to create Client', error));   

        navigate("/ClientsPage");
    }




    return (
        <div>
            <Container>
                <h1>Create a client</h1>
                <Form onSubmit={createClient} onChange={handleChanges}>
                    <Row className="mb-3" xs={2} md={4} lg={4}>
                        <Form.Group as={Col} controlId="formGridSurname">
                            <Form.Label>Surname</Form.Label>
                            <Form.Control type="text" name="surname" required/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text"  name="name" required/>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3" xs={2} md={4} lg={4}>
                        <Form.Group as={Col} controlId="formGridBirthday">
                            <Form.Label>Birthday</Form.Label>
                            <Form.Control type="date"  name="birthday" required/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridSalary">
                            <Form.Label>Salary</Form.Label>
                            <Form.Control type="number"  name="salary" required/>
                        </Form.Group>
                    </Row>

                    <Row  xs={2} md={2} lg={6}>
                    <Button className="ms-2"  variant="primary" type="submit">
                        Create
                    </Button>
                    <Link to="/ClientsPage">
                    <Button className="ms-4" variant="light">
                        Back
                    </Button>
                    </Link>
                    </Row>
                </Form>
            </Container>
        </div>
    );
}

export default CreateClientPage;