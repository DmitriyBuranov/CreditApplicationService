import 'bootstrap/dist/css/bootstrap.min.css'

import { Button, Card, Form, Container, Row, Col, Table } from 'react-bootstrap'

function ClientsPage() {

    return (
        <div>
            <Container>
                <p>Clients</p>
                <Form>
                    <Form.Label>Search by Name</Form.Label>
                    <Row>
                        <Col  md={4}>
                            <Form.Control
                                type="text"
                                name="searchExpression"
                            />
                        </Col>
                        <Col>
                            <Button variant="secondary">Search</Button>
                        </Col>
                        <Col className="d-flex flex-row-reverse" >
                            <Button >Create a new client</Button>
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
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <Row>
                                    <Col></Col>
                                    <Col></Col>
                                    <Col>
                                        <Button size="sm">Apply for credit</Button></Col>
                                </Row>
                            </td>
                        </tr>
                    </tbody>
                </Table>

            </Container>
        </div>
    )

}

export default ClientsPage;