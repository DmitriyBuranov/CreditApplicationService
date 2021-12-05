import 'bootstrap/dist/css/bootstrap.min.css'

import { Button, Form, Container, Row, Col, Table } from 'react-bootstrap'

function CreditApplicationsPage() {

    return (
        <div>
            <Container>
                <p>Credit applications</p>
                <Form>
                    <Form.Label>Search by Result</Form.Label>
                    <Row>
                        <Col md={4}>
                            <Form.Select name="searchVariant">
                                <option>Approved</option>
                                <option>Denied</option>
                            </Form.Select> 
                        </Col>
                        <Col>
                            <Button variant="secondary">Show</Button>
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
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </div>
    )

}


export default CreditApplicationsPage;