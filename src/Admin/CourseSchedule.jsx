import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CourseSchedule() {

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
      
        <div className='row px-5'>
            
            <h2 className='mt-2'>Register Course List</h2>

            <hr />

            <br />

            <div className='my-2'>
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

                            {registList && registList.length > 0 ? (

                                <table className="table user-list">
                                    <thead>
                                        <tr>
                                            <th><span>Subject Code</span></th>
                                            <th><span>Subject Title</span></th>
                                            <th className="text-center"><span>Semester / Year</span></th>
                                            <th className="text-center"><span>Teach Type</span></th>
                                            <th><span>Options</span></th>
                                            {/* <th>&nbsp;</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>

                                    {registList.map((item) => (

                                        <tr key={item.reg_c_id}>
                                            <td>
                                                {/* <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" /> */}
                                                <h5>{item.subject_code}</h5>
                                                {/* <span className="user-subhead">{item.role_name}</span> */}
                                            </td>
                                            <td>
                                                {item.subject_name_th}
                                            </td>
                                            <td className="text-center">
                                                <span className="label label-default">{item.sem_id} / {item.educ_year}</span>
                                            </td>
                                            <td className="text-center">
                                                {item.t_type_name}
                                            </td>
                                            <td>
                                                {/* <a href="#" className="table-link"> */}
                                                    <span className="fa-stack">
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
                                                    </span>
                                                {/* </a> */}
                                            </td>
                                        </tr>

                                    ))}

                                    </tbody>
            
                                </table>
                            ) : (
                                <p>No Register Courses found.</p>
                            )}
                            
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>

        </div>
        
    );

};

export default CourseSchedule;