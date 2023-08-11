import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from 'react-router-dom';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function CalculateAttendance() {

    const MySwal = withReactContent(Swal);
    
    const params = useParams();

    const [validated, setValidated] = useState(false);

    const [AttendList, setAttendList] = useState([]);

    const [userId, setUserId] = useState(0);
    const [subjectId, setSubjectId] = useState("");
    const [sjcode, setSJcode] = useState("");
    const [sjname_th, setSJname_th] = useState("");
    const [sjname_en, setSJname_en] = useState("");
    const [credit, setCredit] = useState(0);

    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);

    const [getTeachType, setGetTeachType] = useState("");

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [role, setRole] = useState("");
    const [actRank, setActRank] = useState("");

    const [rateBudget, setRateBudget] = useState(0);


    const [lectureCount, setLectureCount] = useState(0);
    const [labCount, setLabCount] = useState(0);

    const [atdDate, setAtdDate] = useState("");

    // const userAct = localStorage.getItem('act_name');
    const getuserId = localStorage.getItem('user_id');

    const date = new Date();

    const cv_date = new Date((item) => item.atd_date);

    const day = cv_date.getUTCDate();
    const month = cv_date.getUTCMonth() + 1;
    const year = cv_date.getUTCFullYear();
    let convertDate = `${day}/${month}/${year}`;

    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    const currentDate = date.toLocaleDateString('th-TH', options);
    const formattedDate = date.toISOString().slice(0, 10);
    
    // console.log(formattedDate);


    // console.log(currentDate); // "17-6-2022"

    var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(2);

    const handleTimeChange = (e) => {
        const { name, value } = e.target;
        if (name === 'startTime') {
          setStartTime(value);
        } else if (name === 'endTime') {
          setEndTime(value);
        }
      };
    
      // Function to calculate the difference in hours between startTime and endTime
      const calculateHours = () => {
        if (startTime && endTime) {
            const [startHour, startMinute] = startTime.split(':');
            const [endHour, endMinute] = endTime.split(':');
      
            const start = Number(startHour) * 60 + Number(startMinute);
            const end = Number(endHour) * 60 + Number(endMinute);
      
            let hours = (end - start) / 60;
            if (hours < 0) {
              hours += 24; // If the endTime is before the startTime, add 24 hours (assuming it spans across two days)
            }
            return hours.toFixed(0); // Limit to 2 decimal places
          }
          return '';
      };

    const handleSubmit = (event) => {

        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            // doAdd();
            saveAttendance();
        }

        setValidated(true);

    };

    const goBack = () => {
        window.history.back();
    }

    useEffect(() => {

        const getCalAttend = async() => {
            
            const response = await fetch(
                `http://localhost:8000/api/user/regis_course/calculate/` + params.id,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    }
                }
            );

            const result = await response.json();

            // console.log(result.data);

            const calAttendFilter = result.data.filter((item) => item.user_id === Number(getuserId));

            // setAttendList(result.data);
            setAttendList(calAttendFilter);

            // console.log(calAttendFilter)

            // if (result.result && result.data.length > 0) {
            if (calAttendFilter && calAttendFilter.length > 0) {
            
                const calAttendlData = calAttendFilter[0];
                setUserId(calAttendlData.user_id);
                setSubjectId(calAttendlData.subject_id);
                setSJcode(calAttendlData.subject_code);
                setSJname_th(calAttendlData.subject_name_th);
                setSJname_en(calAttendlData.subject_name_en);
                setGetTeachType(calAttendlData.t_type_id);
                setCredit(calAttendlData.credit);
                setFirstname(calAttendlData.firstname);
                setLastname(calAttendlData.lastname);
                setRole(calAttendlData.role_name);
                setActRank(calAttendlData.act_name);

                if(calAttendlData.role_name === 'Lecturer') {
                    setRateBudget(calAttendlData.lecturer_rate);
                } else if(calAttendlData.role_name === 'Teacher Assistant') {
                    setRateBudget(calAttendlData.ta_rate);
                }

            }
        }

        const getCountAttend = async() => {

            const count_response = await fetch(
                `http://localhost:8000/api/user/regis_course/calculate/`+ params.id + `/count_attend`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    }
                }
            )

            const count_result = await count_response.json();

            // console.log(count_result.data);

            // console.log(count_result.data[0].user_id);
            // console.log(getuserId);
            
            const countAttendlData = count_result.data[0];
           
            setLectureCount(isNaN(parseInt(countAttendlData.Lecture_Count, 10)) ? 0 : parseInt(countAttendlData.Lecture_Count, 10));
            setLabCount(isNaN(parseInt(countAttendlData.Lab_Count, 10)) ? 0 : parseInt(countAttendlData.Lab_Count, 10));

        }

        getCalAttend();
        getCountAttend();

    }, [])

    const saveAttendance = async() => {

        // console.log(currentDate);
        // console.log(time);
        // console.log(subjectId);
        // console.log(startTime);
        // console.log(endTime);
        // console.log(calculateHours());
        // console.log(getTeachType);
        // console.log(userId);

        const add_attendance = await fetch(
            "http://localhost:8000/api/user/regis_course/add", 
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    
                    c_date: formattedDate,
                    c_time: time,
                    subject_id: subjectId,
                    st_time: startTime,
                    e_time: endTime,
                    classTime: calculateHours(),
                    t_type: getTeachType,
                    user_id: userId

                })
            }
        );

        const confirm_att = await add_attendance.json();

        if(confirm_att.result) {

            MySwal.fire({
                title: <strong>Success!</strong>,
                html: <i>Inserted data successfully!</i>,
                icon: 'success',
                timer: 1000
            }).then(() => {
                // dispatch(redirect('/'));
                window.location.href = ('../../workload');
            })

        }

    }

    var total_value;

    AttendList.forEach((item) => {
        
    });

    return (

        <div className="row px-5">

            <h2 className="mt-2">Calculate Budget</h2>

            <hr />

            <br />

            <div className='container-md p-3'>

                <h3 className="mt-2">ข้อมูลรายวิชา</h3>

                <br />

                
                <div className="row px-5">

                    <div className="col-md-4">
                        <h4 className="mt-2 ps-5 float-end">รหัสรายวิชา :</h4>
                    </div>

                    <div className="col-md-8">
                        <h4 className="mt-2 ps-5">{sjcode}</h4>
                        
                    </div>

                </div>

                <div className="row px-5">

                    <div className="col-md-4">
                        <h4 className="mt-2 ps-5 float-end">ชื่อวิชา (ไทย) :</h4>
                    </div>

                    <div className="col-md-8">
                        <h4 className="mt-2 ps-5">{sjname_th}</h4>
                        
                    </div>

                </div>

                <div className="row px-5">

                    <div className="col-md-4">
                        <h4 className="mt-2 ps-5 float-end">ชื่อวิชา (อังกฤษ) :</h4>
                    </div>

                    <div className="col-md-8">
                        <h4 className="mt-2 ps-5">{sjname_en}</h4>
                        
                    </div>

                </div>

                <div className="row px-5">

                    <div className="col-md-4">
                        <h4 className="mt-2 ps-5 float-end">หน่วยกิต :</h4>
                    </div>

                    <div className="col-md-8">
                        <h4 className="mt-2 ps-5">{credit}</h4>
                        
                    </div>

                </div>

            </div>

            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="main-box clearfix">

                            <div className="table-responsive">

                                <table className="table user-list">

                                    <thead>
                                        <tr>
                                            <th><span>Name</span></th>
                                            <th><span>Role</span></th>
                                            <th><span>Academic Rank</span></th>
                                            <th><span>Attendance Count</span></th>
                                            <th><span>Budget</span></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td>
                                                <h5>{firstname} {lastname}</h5>
                                            </td>
                                            <td>
                                                <h5>{role}</h5>
                                            </td>
                                            <td>
                                                <h5>{actRank}</h5>
                                            </td>
                                            <td className="text-center">
                                                <h5>
                                                Lecture {lectureCount} 
                                                / 
                                                Lab {labCount}
                                                </h5>
                                            </td>
                                            <td className="text-center">
                                                <h5>{rateBudget}</h5>
                                            </td>
                                        </tr>
                                    </tbody>

                                </table>

                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="main-box clearfix">

                            <div className="table-responsive">

                            {AttendList && AttendList.length > 0 ? (

                                <table className="table user-list">
                                    <thead>
                                        <tr>
                                            <th><span>Date</span></th>
                                            <th><span>Time</span></th>
                                            <th className="text-center"><span>Teach Type</span></th>
                                            <th className="text-center"><span>Total Hours</span></th>
                                            <th><span>Total</span></th>
                                            {/* <th>&nbsp;</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>

                                    {AttendList.map((item) => (

                                        <tr key={item.atd_id}>
                                            <td>
                                                <h5>{item.atd_date}</h5>
                                            </td>
                                            <td>
                                                {item.st_time}
                                                &nbsp; : &nbsp;
                                                {item.e_time} 
                                            </td>
                                            <td className="text-center">
                                                {item.t_type_name}
                                            </td>
                                            <td className="text-center">
                                                <span className="label label-default">{item.class_time}</span>
                                            </td>

                                            <td className="text-center">
                                                <span>
                                                    {item.role_name === 'Lecturer' ? item.lecturer_rate * item.class_time : item.ta_rate * (item.class_time * 0.5)}
                                                </span>
                                            </td>

                                        </tr>

                                    ))}

                                    <tr>
                                    <td colSpan="4" className="text-center">Total:</td>
                                    <td className="text-center">
                                        <span>
                                            {AttendList.reduce((acc, item) => acc + (item.role_name === 'Lecturer' ? item.lecturer_rate * item.class_time : item.ta_rate * (item.class_time * 0.5)), 0)}
                                        </span>
                                    </td>
                                    </tr>

                                    </tbody>
            
                                </table>
                            ) : (
                                <p>No Attendance Data found.</p>
                            )}
                            
                            </div>

                            <div>
                                <Button type='button' onClick={goBack} defaultValue="back" className="btn-md under-line float-end">
                                    Back
                                </Button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="container-md px-5 mt-2">
                
                <div class="card">

                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    
                        <div class="card-body">

                            <div className="row px-5">

                                <div className="col-md-4">
                                    <h4 className="mt-2 ps-5">วันที่</h4>
                                </div>

                                <div className="col-md-8">
                                    <h4 className="mt-2 ps-5">{currentDate}</h4>
                                    
                                </div>

                            </div>

                            <div className="row px-5">

                                <div className="col-md-4">
                                    <h4 className="mt-2 ps-5">เวลา</h4>
                                </div>

                                <div className="col-md-8">
                                    <h4 className="mt-2 ps-5">{time}</h4>
                                </div>

                            </div>

                            <div className="row px-5">

                                <div className="col-md-4">
                                    <h4 className="mt-2 ps-5">เวลาเริ่ม</h4>
                                </div>

                                <div className="col-md-8">
                                    <h4 className="mt-2 ps-5">
                                        <input 
                                            type="time" 
                                            className="timePicker" 
                                            name="startTime"
                                            onChange={handleTimeChange}
                                            value={startTime}
                                            timeIntervals={15}
                                            timeCaption="Time"
                                            dateFormat="h:mm aa"

                                        />
                                    </h4>
                                </div>

                            </div>

                            <div className="row px-5">

                                <div className="col-md-4">
                                    <h4 className="mt-2 ps-5">เวลาสิ้นสุด</h4>
                                </div>

                                <div className="col-md-8">
                                    <h4 className="mt-2 ps-5">
                                        <input 
                                            type="time" 
                                            name="endTime"
                                            className="timePicker" 
                                            onChange={handleTimeChange}
                                            value={endTime}
                                            timeIntervals={15}
                                            timeCaption="Time"
                                            dateFormat="h:mm aa"

                                        />
                                    </h4>
                                </div>

                            </div>

                            <div className="row px-5">

                                <div className="col-md-4">
                                    <h4 className="mt-2 ps-5">จำนวนชั่วโมง</h4>
                                </div>

                                <div className="col-md-8">
                                    <h4 className="mt-2 ps-5">{calculateHours()}</h4>
                                </div>

                            </div>

                            <div>
                                <Button type='submit' defaultValue="add" className="btn-md under-line">
                                    Add
                                </Button>
                                <Button type='button' onClick={goBack} defaultValue="back" className="btn-md under-line float-end">
                                    Back
                                </Button>
                            </div>

                        </div>

                    </Form>
                </div>

            </div> */}

        </div>

    );

}

export default CalculateAttendance;