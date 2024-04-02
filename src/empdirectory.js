import React, { useState, useEffect, Fragment } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from 'axios';

const EmpDirectory = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [checked, setChecked] = useState(false);

    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [dateofjoining, setDateofjoining] = useState('');
    const [photofilename, setPhotofilename] = useState('');
    const [isactive, setIsactive] = useState(false);

    const [editname, setEditname] = useState('');
    const [editdepartment, setEditdepartment] = useState('');
    const [editdateofjoining, setEditdateofjoining] = useState('');
    const [editphotofilename, setEditPhotofilename] = useState('');
    const [iseditactive, setIseditactive] = useState(false);

    const [data, setData] = useState([]);


    useEffect(() => {
        getData();
    }, [])


    const getData = () => {
        axios.get('http://localhost:24654/api/Employee')
            .then((result) => {
                setData(result.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleEdit = (id) => {
        handleShow();
    }


    const handleDelete = (id) => {
        if (window.confirm("This will delete the employee record. Are you sure?") === true) {
            alert(id);
        }
    }

    return (
        <Fragment>
            <Container style={{ marginTop: '20px' }}>
                <Row >
                    <Col>
                        <input type="text" className="form-control" placeholder="Employee Name"
                            value={name} onChange={(e) => setName(e.target.value)} />
                    </Col>
                    <Col>
                        <input type="text" className="form-control" placeholder="Employee Department"
                            value={department} onChange={(e) => setDepartment(e.target.value)} />
                    </Col>
                    <Col>
                        <input type="date" className="form-control" placeholder="Date of Joining"
                            value={dateofjoining} onChange={(e) => setDateofjoining(e.target.value)} />
                    </Col>
                    <Col>
                        <input type="checkbox" onChange={(e) => setIsactive(e)} value={isactive} />
                        <label>Is this an active record?</label>
                    </Col>
                    <Col>
                        <Button variant="primary" color="success">Submit</Button>
                    </Col>
                </Row>
            </Container>
            <br></br>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Date of Joining</th>
                        <th>Activity Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.length > 0 ?
                            data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.EmployeeName}</td>
                                        <td>{item.Department}</td>
                                        <td>{item.DateOfJoining}</td>
                                        <td>{item.IsActive}</td>
                                        <td colSpan={2}>
                                            <Button variant="primary" color="success" style={{ marginRight: "10px" }} onClick={() => handleEdit(item.id)}> Edit </Button>
                                            <Button variant="secondary" color="error" onClick={() => handleDelete(item.id)}>Delete</Button>
                                        </td>
                                    </tr>

                                )
                            })
                            :
                            'Loading...'
                    }
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Employee record</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col>
                                <input type="text" className="form-control" placeholder="Employee Name"
                                    value={editname} onChange={(e) => setEditname(e.target.value)} />
                            </Col>
                            <Col>
                                <input type="text" className="form-control" placeholder="Employee Department"
                                    value={editdepartment} onChange={(e) => setEditdepartment(e.target.value)} />
                            </Col>
                            <Col>
                                <input type="date" className="form-control" placeholder="Date of Joining"
                                    value={editdateofjoining} onChange={(e) => setEditdateofjoining(e.target.value)} />
                            </Col>
                            <Col>
                                <input type="checkbox" onChange={(e) => setIseditactive(e)} value={iseditactive} />
                                <label>Is this an active record?</label>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

export default EmpDirectory;