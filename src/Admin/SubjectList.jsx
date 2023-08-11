import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function SubjectList() {

    const [subjectList, setSubjectList] = useState([]);

    useEffect(() => {

        const getSubjectData = async() => {

            const response = await fetch(
                "http://localhost:8000/api/subjectlist",
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    }
                }
            );

            const result = await response.json();

            setSubjectList(result.data);

        }

        getSubjectData();

    }, []);

    const onDelete = async (subject_id) => {

        const response = await fetch(
            "http://localhost:8000/api/subjectlist/delete/",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    subjectId: subject_id
                })
            }

            
        );

        const result = await response.json();
        
            // console.log(result)
        
        const getSubjectData = async() => {

            const response = await fetch(
                "http://localhost:8000/api/subjectlist", 
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

            setSubjectList(result.data);

        }

        getSubjectData();

        alert("Deleted Successfully.");

    }

    return (
      
        <div className='row px-5'>

            <h2 className='mt-2'>Subject List</h2>

            <hr />

            <div className='my-4'>
                <Link to={'add'} className='btn btn-warning boarder-dark float-end'>
                    Add
                </Link>
            </div>

            <br />

            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="main-box clearfix">

                            <div className="table-responsive">

                            {subjectList && subjectList.length > 0 ? ( 

                                <table className="table user-list">
                                    <thead>
                                        <tr>
                                            <th><span>Subject Code</span></th>
                                            <th><span>Subject Title</span></th>
                                            <th className="text-center"><span>Credit</span></th>
                                            {/* <th><span>Email</span></th> */}
                                            <th><span>Options</span></th>
                                            {/* <th>&nbsp;</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>

                                    {subjectList.map((item) => (

                                        <tr key={item.subject_id}>
                                            <td>
                                                {/* <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" /> */}
                                                <h5>{item.subject_code}</h5>
                                                {/* <span className="user-subhead">{item.role_name}</span> */}
                                            </td>
                                            <td>
                                                {item.subject_name_th}
                                            </td>
                                            <td className="text-center">
                                                <span className="label label-default">{item.credit}</span>
                                            </td>
                                            {/* <td>
                                                <a href="#">{item.email}</a>
                                            </td> */}
                                            <td>
                                                {/* <a href="#" className="table-link"> */}
                                                    <span className="fa-stack">
                                                        <Link to={'edit/' + item.subject_id} className='btn btn-info border-dark'>
                                                        Edit
                                                        </Link>
                                                        <Button
                                                        variant='danger'
                                                        size='md'
                                                        style={{ marginLeft: "20px" }}
                                                        onClick={() => onDelete(item.subject_id)}
                                                        >
                                                        Delete
                                                        </Button>
                                                    </span>
                                                {/* </a> */}
                                            </td>
                                        </tr>

                                    ))}

                                    </tbody>
            
                                </table>
                            ) : (
                                <p>No subjects found.</p>
                            )}
                            
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>

        </div>
        
    );

};

export default SubjectList;