import React, { useState, useEffect, Fragment } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const EmpDirectory = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [checked, setChecked] = useState(false);

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [dateofjoining, setDateofjoining] = useState('');
    const [photofilename, setPhotofilename] = useState('');
    const [isactive, setIsactive] = useState(false);

    const [editid, setEditId] = useState('');
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
        axios.get(`http://localhost:24654/api/Employee/${id}`)
        .then((result) => {
            setEditname(result.data.name);
            setEditdepartment(result.data.department);
            setEditdateofjoining(result.data.dateofjoining);
            setIseditactive(result.data.iseditactive);
            setEditId(result.data.id);
        }).catch((error) => {
            toast.error(error);
        })
    }


    const handleDelete = (id) => {
        if (window.confirm("This will delete the employee record. Are you sure?") === true) {
            axios.delete(`http://localhost:24654/api/Employee/${id}`)
            .then((result)=>{
                if (result.status == 200){
                    toast.success('Employee record has been deleted');
                    getData();
                }
            }).catch((error) => {
                toast.error(error);
            })
        }
    }

    const handleSave = () => {
        const url = 'http://localhost:24654/api/Employee';
        const data = {
            "id" : id,
            "name" : name,
            "department" : department,
            "dateofjoining" : dateofjoining,
            "isactive" : isactive,
        }

        axios.post(url, data)
        .then ((result) => {
            getData();
            clear();
            toast.success('Employee record has been added');
        }).catch((error) => {
            toast.error(error);
        })
    }

    const handleUpdate = () => {
        const url = `http://localhost:24654/api/Employee/${editid}`;
        const data = {
            "id" : editid,
            "name" : editname,
            "department" : editdepartment,
            "dateofjoining" : editdateofjoining,
            "isactive" : iseditactive,
        }

        axios.put(url, data)
        .then((result) => {
            handleClose();
            getData();
            clear(); 
            toast.success('Employee record has been updated');
        }).catch((error) => {
            toast.error(error);
        })
    }

    const handleActiveChange = (e) => {
        if (e.target.checked) {
            setIsactive(1);
        }
        else {
            setIsactive(0);
        }
    }

    const HandleIseditactive = (e) => {
        if (e.target.checked) {
            setIseditactive(1);
        }
        else {
            setIseditactive(0);
        } 
    }

    const clear = () => {
        setName('');
        setDepartment('');
        setDateofjoining('');
        setIsactive(0);
        setPhotofilename('');

        setEditname('');
        setEditdepartment('');
        setEditdateofjoining('');
        setEditPhotofilename('');
        setIseditactive(0);
    }

    return (
        <Fragment>
            <ToastContainer />
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
                        <input type="checkbox" 
                        checked = {isactive  === 1 ? true : false}
                        onChange={(e) => handleActiveChange(e)} value={isactive} />
                        <label>Is this an active record?</label>
                    </Col>
                    <Col>
                        <Button variant="primary" color="success" onClick={() => handleSave()}>Submit</Button>
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
                                <input type="text" className="form-control" placeholder={name}
                                    value={editname} onChange={(e) => setEditname(e.target.value)} />
                            </Col>
                            <Col>
                                <input type="text" className="form-control" placeholder={department}
                                    value={editdepartment} onChange={(e) => setEditdepartment(e.target.value)} />
                            </Col>
                            <Col>
                                <input type="date" className="form-control" placeholder={dateofjoining}
                                    value={editdateofjoining} onChange={(e) => setEditdateofjoining(e.target.value)} />
                            </Col>
                            <Col>
                                <input type="checkbox" 
                                checked = {iseditactive  === 1 ? true : false}
                                onChange={(e) => HandleIseditactive(e)} value={iseditactive} />
                                <label>Is this an active record?</label>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

export default EmpDirectory;