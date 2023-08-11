import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function TimeAttendanceLogs() {

    const userId = localStorage.getItem('user_id');
    const Act_Role = localStorage.getItem('role_name');

    const [attList, setAttList] = useState([]);

    useEffect(() => {

        const getLogsDataLecturer = async() => {

            const response = await fetch(
                "http://localhost:8000/api/user/regis_course/lecturer_logs",
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    }
                }
            );

            const result = await response.json();

            const filter_result = result.data.filter((item) => item.user_id === Number(userId));

            setAttList(filter_result);

        }

        const getLogsDataTA = async() => {

            const response = await fetch(
                "http://localhost:8000/api/user/regis_course/ta_logs",
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    }
                }
            );

            const result = await response.json();

            const filter_result = result.data.filter((item) => item.user_id === Number(userId));

            setAttList(filter_result);

        }

        if(Act_Role === 'Lecturer') {
            getLogsDataLecturer();
        } else {
            getLogsDataTA();
        }

    }, []);

    return (

        <div className="row px-5">

            <h2 className="mt-2">Time Attendance Logs</h2>

            <hr />

            <br />

            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="main-box clearfix">

                            <div className="table-responsive">

                            {attList && attList.length > 0 ? (

                                <table className="table user-list">
                                    <thead>
                                        <tr>
                                            <th><span>Subject Code</span></th>
                                            {/* <th><span>Subject Title</span></th> */}
                                            <th className="text-center"><span>Start/End Time</span></th>
                                            <th className="text-center"><span>Teach Type</span></th>
                                            <th className="text-center"><span>ID</span></th>
                                            <th><span>Note</span></th>
                                            {/* <th>&nbsp;</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>

                                    {attList.map((item) => (

                                        <tr key={item.att_id}>
                                            <td>
                                                <h5>{item.subject_code}</h5>
                                            </td>
                                            {/* <td>
                                                {item.subject_name_th}
                                            </td> */}
                                            <td className="text-center">
                                                <span className="label label-default">{item.st_time} / {item.e_time}</span>
                                            </td>
                                            <td className="text-center">
                                                {item.t_type_id}
                                            </td>
                                            <td className="text-center">
                                                {item.user_id}
                                            </td>
                                            <td className='text-center'>
                                                {/* <a href="#" className="table-link"> */}
                                                    <span className="fa-stack">
                                                        {/* <Link to={'add/' + item.crscdl_id} className='btn btn-info border-dark'>
                                                        Add
                                                        </Link> */}
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
                                <p>No Time Attendance logs found.</p>
                            )}
                            
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );

}

export default TimeAttendanceLogs;