import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function UserDashboard() {

    const [totalUser, setTotalUser] = useState([]);
    const [totalSubject, setTotalSubject] = useState([]);
    const [totalCS, setTotalCS] = useState([]);

    useEffect(() => {

        const getTotalUser = async() => {

            const user_response = await fetch(
                "http://localhost:8000/api/userlist/getusertotal",
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    }
                }
            );

            const user_result = await user_response.json();

            setTotalUser(user_result.data);

        }

        const getTotalSubject = async() => {

            const subject_response = await fetch(
                "http://localhost:8000/api/userlist/getsubjecttotal",
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    }
                }
            );

            const subject_result = await subject_response.json();

            setTotalSubject(subject_result.data);

            // console.log(subject_result.data);

        }

        const getTotalCS = async() => {

            const crs_response = await fetch(
                "http://localhost:8000/api/userlist/getcstotal",
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    }
                }
            );

            const crs_result = await crs_response.json();

            setTotalCS(crs_result.data);

            // console.log(crs_result.data);

        }

        getTotalUser();
        getTotalSubject();
        getTotalCS();

    }, []);

    return (

        <div className='row px-5'>

            <div>
                <h2 style={{textAlign: "start", marginTop: "40px", marginLeft: "40px"}}>Dashboard Overview </h2>
            </div>

            <br /><br />

            <div className='container'>

                <div className='row'>

                    <div className="col">

                        <div className="card mb-3" style={{ color: "black" , maxWidth: "340px" }}>
                            <div className="row g-0">
                                <div className="col-md-4 align-self-center">

                                {totalUser.map((item) => (

                                    <h5 style={{textAlign: "center"}} >
                                        {item.total_user}
                                    </h5>

                                ))}

                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <Link to={'../userlist'} className='btn btn-info border-dark title'>
                                        จำนวนผู้ใช้ในฐานข้อมูลทั้งหมด
                                        </Link>
                                        {/* <h5 className="card-title">จำนวนผู้ใช้ในฐานข้อมูลทั้งหมด</h5> */}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="col">

                        <div className="card mb-3" style={{ color: "black" , maxWidth: "340px" }}>
                            <div className="row g-0">
                                <div className="col-md-4 align-self-center">

                                {totalSubject.map((item) => (

                                    <h5 style={{textAlign: "center"}} >
                                        {item.total_subject}
                                    </h5> 

                                ))}

                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <Link to={'../subjectlist'} className='btn btn-info border-dark title'>
                                        จำนวนรายวิชาในฐานข้อมูลทั้งหมด
                                        </Link>
                                        {/* <h5 className="card-title">จำนวนรายวิชาในฐานข้อมูลทั้งหมด</h5> */}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="col">

                        <div className="card mb-3" style={{ color: "black" , maxWidth: "340px" }}>
                            <div className="row g-0">
                                <div className="col-md-4 align-self-center">

                                {totalCS.map((item) => (

                                    <h5 style={{textAlign: "center"}} >
                                        {item.total_crscdl}
                                    </h5>

                                ))}

                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <Link to={'../courseschedule'} className='btn btn-info border-dark title'>
                                        จำนวนรายวิชาที่ลงทะเบียนทั้งหมด
                                        </Link>
                                        {/* <h5 className="card-title">จำนวนรายวิชาที่ลงทะเบียนทั้งหมด</h5> */}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="col">

                        <div className="card mb-3" style={{ color: "black" , maxWidth: "340px" }}>
                            <div className="row g-0">
                                <div className="col-md-4 align-self-center">

                                    <h5 style={{textAlign: "center"}}>
                                        32
                                    </h5>

                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">จำนวนผู้ใช้ในฐานข้อมูลทั้งหมด</h5>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

            <br /><br />

            <div className='container mt-5'>

                <div class="card bg-dark" style={{ color: "black" , width: "100%", height: "60vh"}}>
                    <div class="card-body">


                        {/* This is some text within a card body.  */}

                        
                    </div>
                </div>

            </div>

        </div>
        
    );

};

export default UserDashboard;