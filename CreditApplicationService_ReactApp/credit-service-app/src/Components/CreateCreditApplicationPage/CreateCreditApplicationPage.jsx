import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap'



function CreateCreditApplicationPage() {

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

    function formatDate(date) {
        date = new Date(date);
        var dd = date.getDate();
        if (dd < 10) dd = '0' + dd;

        var mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        var yyyy = date.getFullYear();

        return yyyy + '-' + mm + '-' + dd;
    }

    function createCreditApplication() {
        const dataForRequest = {
            clientId: client.id,
            amountOfCredit: Number(client.amountOfCredit),
            termsInMonths: Number(client.termsInMonths)
        }

        fetch("/api/v1/CreditApplications", {
            method: 'POST',
            body: JSON.stringify(dataForRequest),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((data) => {
                console.log((data)? "Approved!" : "Denied :(");
            })
            .catch(error => console.error('Unable to create credit application', error));
    }

    return (
        <div>
            <Container>
                <p>Apply for a credit</p>
                <Form >
                    <Card>
                        <Row className="mb-3 ms-2" xs={2} md={4} lg={4}>
                            <Form.Group as={Col} controlId="formGridId">
                                <Form.Label>Id</Form.Label>
                                <Form.Control type="text" disabled name="clientId" defaultValue={client.id} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridSurname">
                                <Form.Label>Surname</Form.Label>
                                <Form.Control type="text" disabled defaultValue={client.surname} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" disabled defaultValue={client.name} />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3 ms-2" xs={2} md={4} lg={4}>
                            <Form.Group as={Col} controlId="formGridBirthday">
                                <Form.Label>Birthday</Form.Label>
                                <Form.Control type="date" disabled defaultValue={client.birthday} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridSalary">
                                <Form.Label>Salary</Form.Label>
                                <Form.Control type="number" disabled defaultValue={client.salary} />
                            </Form.Group>
                        </Row>
                    </Card>
                </Form>
                <Form onSubmit={createCreditApplication} onChange={handleChanges}>
                    <Row className="mb-3 ms-2" xs={2} md={4} lg={4}>
                        <Form.Group as={Col} controlId="formGridAmountOfCredit">
                            <Form.Label>Amount of credit (from 100 000 to 2 000 000)</Form.Label>
                            <Form.Control type="number"
                                name="amountOfCredit"
                                min="100000" max="2000000"
                                required />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3 ms-2" xs={2} md={4} lg={4}>
                        <Form.Group as={Col} controlId="formGridAmountOfCredit">
                            <Form.Label>Term (in months from 13 to 60)</Form.Label>
                            <Form.Control type="number"
                                name="termsInMonths"
                                min="13" max="60"
                                defaultValue="13"
                                required />
                        </Form.Group>
                    </Row>

                    <Row xs={2} md={2} lg={6}>
                        <Link to="/ClientsPage">
                            <Button className="ms-2" variant="light">
                                Back to Clients
                            </Button>
                        </Link>

                        <Button className="ms-2" variant="primary" type="submit">
                            Apply
                        </Button>
                    </Row>
                </Form>
            </Container>
        </div>
    )

}

export default CreateCreditApplicationPage;