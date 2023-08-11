import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function WorkLoad() {

    const [registList, setRegistList] = useState([]);
    const getuserId = localStorage.getItem('user_id');


    useEffect(() => {

        const getRegistData = async() => {

            const response = await fetch(
                "http://localhost:8000/api/user/regis_course",
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    }
                }
            );

            const result = await response.json();

            const calAttendFilter = result.data.filter((item) => item.user_id === Number(getuserId));

            setRegistList(calAttendFilter);

        }

        getRegistData();

    }, []);


    return (
      
        <div className='row px-5'>
            
            <h2 className='mt-2'>Attendance List</h2>

            <hr />

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

                                        <tr key={item.crscdl_id}>
                                            <td>
                                                <h5>{item.subject_code}</h5>
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
                                            <td className='text-center'>
                                                {/* <a href="#" className="table-link"> */}
                                                    <span className="fa-stack">
                                                        <Link to={'add/' + item.crscdl_id} className='btn btn-info border-dark'>
                                                        Attend
                                                        </Link>
                                                        <Link to={'calculate/' + item.crscdl_id} className='btn btn-success border-dark'>
                                                        Calculate
                                                        </Link>
                                                        {/* <Button
                                                        variant='danger'
                                                        size='md'
                                                        style={{ marginLeft: "20px" }}
                                                        onClick={() => onDelete(item.reg_c_id)}
                                                        >
                                                        Delete
                                                        </Button> */}
                                                    </span>
                                                {/* </a> */}
                                            </td>
                                        </tr>

                                    ))}

                                    </tbody>
            
                                </table>
                            ) : (
                                <p>No Attendance found.</p>
                            )}
                            
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>

        </div>
        
    );

};

export default WorkLoad;