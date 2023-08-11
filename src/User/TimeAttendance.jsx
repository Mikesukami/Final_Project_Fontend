import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams } from 'react-router-dom';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function TimeAttendance() {

    const MySwal = withReactContent(Swal);
    
    const params = useParams();

    const [validated, setValidated] = useState(false);

    const [userId, setUserId] = useState(0);
    const [subjectId, setSubjectId] = useState("");
    const [sjcode, setSJcode] = useState("");
    const [sjname_th, setSJname_th] = useState("");
    const [sjname_en, setSJname_en] = useState("");

    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);

    const [getTeachType, setGetTeachType] = useState("");

    // const userAct = localStorage.getItem('act_name');
    const getuserId = localStorage.getItem('user_id');

    const date = new Date();

    // let day = date.getDate();
    // let month = date.getMonth() + 1;
    // let year = date.getFullYear() + 543;
    // let currentDate = `${day}/${month}/${year}`;

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

        const getRegist = async() => {
            
            const response = await fetch(
                `http://localhost:8000/api/user/regis_course/add/` + params.id,
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

            if (result.result && result.data.length > 0) {
            
                const crscdlData = result.data[0];
                setUserId(crscdlData.user_id);
                setSubjectId(crscdlData.subject_id);
                setSJcode(crscdlData.subject_code);
                setSJname_th(crscdlData.subject_name_th);
                setSJname_en(crscdlData.subject_name_en);
                setGetTeachType(crscdlData.t_type_id);
                setStartTime(crscdlData.st_time);
                setEndTime(crscdlData.e_time);
            
            }
        }

        getRegist();

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
                    crscdl_id: params.id,
                    st_time: startTime,
                    e_time: endTime,
                    classTime: calculateHours(),
                    t_type: getTeachType,
                    user_id: getuserId

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

        } else {
            alert('Fuck you.');
        }

    }

    return (

        <div className="row px-5">

            <h2 className="mt-2">Time Attendance</h2>

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

            </div>

            <div className="container-md px-5 mt-2">
                
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

            </div>

        </div>

    );

}

export default TimeAttendance;