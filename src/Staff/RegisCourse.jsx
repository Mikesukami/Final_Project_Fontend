import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function RegisCourseList() {

    const [registList, setRegistList] = useState([]);

    useEffect(() => {

        const getRegistData = async() => {

            const response = await fetch(
                "http://localhost:8000/api/regiscourse",
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    }
                }
            );

            const result = await response.json();

            setRegistList(result.data);

        }

        getRegistData();

    }, []);

    const onDelete = async (reg_c_id) => {

        const response = await fetch(
            "http://localhost:8000/api/regiscourse/delete/",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    reg_courseId: reg_c_id
                })
            }

            
        );

        const result = await response.json();
        
            // console.log(result)
        
        const getRegistData = async() => {

            const response = await fetch(
                "http://localhost:8000/api/regiscourse", 
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    }
                }
            );

            const result = await response.json();
            // console.log(result);

            setRegistList(result.data);

        }

        getRegistData();

        alert("Deleted Successfully.");

    }

    return (
      
        <div className='container-md'>
            <h1 style={{textAlign: "center"}}>Register Course List</h1>

            <div className='d-flex float-end c'>
                <Link to={'add/'} className='btn btn-warning boarder-dark float-end' style={{marginRight: "250px"}}>
                    Add
                </Link>
            </div>

            <br />

            <div className='container-md bg-primary justify-content-center' >

                {registList && registList.length > 0 ? (

                <Table className='table table-bordered border-primary' style={{ color: "white" }}>
                    <thead className='table-dark'>
                        <tr>
                            {/* <th>Number</th> */}
                            <th>Subject Code</th>
                            <th>Subject Name</th>
                            <th>Lecturer</th>
                            <th>Semester / Year</th>
                            <th>Action
                            {/* <th> */}
                               
                                {/* <Button className='d-flex float-end' variant='warning'>Add</Button> */}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {registList.map((item) => (
                            <tr key={item.reg_c_id}>
                                {/* <td>{item.reg_c_id}</td> */}
                                <td>{item.subject_code}</td>
                                <td>{item.subject_name_th}</td>
                                <td>{item.firstname } {item.lastname}</td>
                                <td>{item.sem_id } / {item.educ_year}</td>
                                <td>
                                    <Link to={'edit/' + item.reg_c_id} className='btn btn-info border-dark'>
                                    Edit
                                    </Link>
                                    <Button
                                    variant='danger'
                                    size='md'
                                    style={{ marginLeft: "20px" }}
                                    onClick={() => onDelete(item.reg_c_id)}
                                    >
                                    Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                ) : (
                    <p>No users found.</p>
                )}

            </div>

        </div>
        
    );

};

export default RegisCourseList;