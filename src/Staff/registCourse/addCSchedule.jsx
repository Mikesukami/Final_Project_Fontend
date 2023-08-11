import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, FormSelect } from 'react-bootstrap';

function AddSchedule() {

    const [validated, setValidated] = useState(false);

    const [userTList, setUserTList] = useState([]);
    const [userTAList, setUserTAList] = useState([]);
    const [getUserList, setGetUserList] = useState(0);

    const [subjectList, setSubjectList] = useState([]);
    const [getSubjectList, setGetSubjectList] = useState('');

    const [semesterList, setSemesterList] = useState([]);
    const [getSemesterList, setGetSemesterList] = useState('');
 
    const [educaYear, setEducaYear] = useState('');

    const [teachType, setTeachType] = useState([]);
    const [getTeachType, setGetTeachType] = useState('');

    const [dayList, setDayList] = useState([]);
    const [getDayList, setGetDayList] = useState(0);

    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    

    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value); // Update the selected radio button
    };
    
    const handleSubmit = (event) => {

        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            doAdd();
        }

        setValidated(true);

    };

    const goBack = () => {
        window.history.back();
    }


    useEffect(() => {

        const getUserTData = async() => {

            const response = await fetch(
                "http://localhost:8000/api/regiscourse/userlist/lecturer", 
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

            setUserTList(result.data);

        }

        const getUserTAData = async() => {

            const response = await fetch(
                "http://localhost:8000/api/regiscourse/userlist/assistant", 
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

            setUserTAList(result.data);

        }

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

        const getSemesterData = async() => {

            const response = await fetch(
                "http://localhost:8000/api/regiscourse/getsemester",
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    }
                }
            );

            const result = await response.json();

            setSemesterList(result.data);

        }

        const getTeachtypeData = async() => {

            const response = await fetch(
                "http://localhost:8000/api/regiscourse/getteachtype",
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    }
                }
            );

            const result = await response.json();

            setTeachType(result.data);

        }

        const getDayData = async() => {

            const response = await fetch(
                "http://localhost:8000/api/regiscourse/getday",
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    }
                }
            );

            const result = await response.json();

            setDayList(result.data);

        }

        getUserTData();
        getUserTAData();
        getSubjectData();
        getSemesterData();
        getTeachtypeData();
        getDayData();

    }, []);


    const doAdd = async() => {

        // console.log(getSubjectList);
        // console.log(selectedOption);
        // console.log(getUserList);
        // console.log(getSemesterList);
        // console.log(educaYear);
        // console.log(getTeachType);
        // console.log(getDayList);
        // console.log(startTime);
        // console.log(endTime);



        const add_schedule = await fetch(
            "http://localhost:8000/api/regiscourse/add_schedule", 
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    
                    subject_code: getSubjectList,
                    semester: getSemesterList,
                    year: educaYear,
                    day: getDayList,
                    st_time: startTime,
                    e_time: endTime,
                    t_type: getTeachType

                })
            }
        );

        const schedule_data = await add_schedule.json();

        console.log(schedule_data);

        const get_lastSchedule = await fetch(
            "http://localhost:8000/api/regiscourse/getlastschedule", 
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            }
        );

        const get_lastSchedule_data = await get_lastSchedule.json();

        // console.log(get_lastSchedule_data);

        if(selectedOption === 'Teacher') {
            console.log(get_lastSchedule_data.data[0].crscdl_id);
            
            const add_t_regist = await fetch(
                "http://localhost:8000/api/regiscourse/add_t_regist", 
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
            
                        schedule: get_lastSchedule_data.data[0].crscdl_id,
                        user: getUserList
                        
                    })
                }
            );
            
            const t_regist_data = await add_t_regist.json();

            if(t_regist_data.result) {
                window.location.href = ('../courseschedule');
            }
        
        } else if(selectedOption === 'Assistant') {
            console.log(get_lastSchedule_data.data[0].crscdl_id);
            
            const add_ta_regist = await fetch(
                "http://localhost:8000/api/regiscourse/add_ta_regist", 
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
            
                        schedule: get_lastSchedule_data.data[0].crscdl_id,
                        user: getUserList
                        
                    })
                }
            );
            
            const ta_regist_data = await add_ta_regist.json();

            if(ta_regist_data.result) {
                window.location.href = ('../courseschedule');
            }
        
        }

        



    }

    return (

        <div style={{color: "black"}}>

            <div className='row'>

                <div className='col-sm-6 offset-3'>

                    <div className='centerd'>
                        <img src='https://www.sci.psu.ac.th/wp-content/uploads/2020/06/Logo_Subbrand_Faculty-of-Science-Full_TH_Artboard-b.svg' 
                            alt='...' 
                            style={{ width: '70%', alignItems: "center"}}

                        />
                    </div>

                    <div className='card pt-5 centered' style={ { padding: "30px", borderRadius: "40px" } }>

                        <h2 id='center'>Add Course Schedule Form</h2>

                        <div className='card-body'>

                            <Form noValidate validated={validated} onSubmit={handleSubmit}>

                                <FormGroup className='mb-3' controlId='subject'>
                                    <Form.Label>Subject</Form.Label>
                                    <Form.Select aria-label="Default select example" onChange={(e) => setGetSubjectList(e.target.value)} value={getSubjectList}>
                                        <option key={0} value={0} style={{textAlign: "center"}}>---------- Select Subject ----------</option>
                                        
                                        {subjectList.map((item) => (
                                            <option key={item.subject_id} value={item.subject_id} selected>{item.subject_code} {item.subject_name_th}</option> 
                                        ))}
                                    </Form.Select>
                                </FormGroup>

                             
                                <div className='row'>

                                    <div className='col col-3 col-md-3'>

                                        <FormGroup className='mb-3' controlId='teacher'>
                                            <Form.Label>Select Role</Form.Label>
                                            <br />
                                            
                                            <label>
                                                <input
                                                type="radio"
                                                name="role"
                                                value="Teacher"
                                                checked={selectedOption === 'Teacher'}
                                                onChange={handleOptionChange}
                                                />
                                                Teacher
                                            </label>
                                            <br />
                                            <label>
                                                <input
                                                type="radio"
                                                name="role"
                                                value="Assistant"
                                                checked={selectedOption === 'Assistant'}
                                                onChange={handleOptionChange}
                                                />
                                                Assistant
                                            </label>

                                        </FormGroup>
                                        
                                    </div>

                                    <div className='col'>

                                        {selectedOption === 'Teacher' && ( // Show the select input if 'Teacher' is selected
                                            
                                            <FormGroup className='mb-3' controlId='teacher'>
                                                <Form.Label>Teacher</Form.Label>
                                                <FormSelect aria-label="Default select example" onChange={(e) => setGetUserList(e.target.value)} value={getUserList}>
                                                    <option required value="" selected style={{textAlign: "center"}}>----- Select Teacher -----</option>
                                                
                                                    {userTList.map((item) => (
                                                        <option key={item.user_id} value={item.user_id}>{item.prefix_name} {item.firstname} {item.lastname}</option> 
                                                    ))}
                                                </FormSelect>
                                                <Form.Control.Feedback type="invalid">
                                                Please select.
                                                </Form.Control.Feedback>
                                            </FormGroup>
                                        
                                        )}

                                        {selectedOption === 'Assistant' && ( // Show the select input if 'Assistant' is selected
                                            
                                            <FormGroup className='mb-3' controlId='teacher'>
                                                <Form.Label>Assistant</Form.Label>
                                                <FormSelect aria-label="Default select example" onChange={(e) => setGetUserList(e.target.value)} value={getUserList}>
                                                    <option selected style={{textAlign: "center"}}>----- Select Assistant -----</option>
                                                
                                                    {userTAList.map((item) => (
                                                        <option key={item.user_id} value={item.user_id}>{item.prefix_name} {item.firstname} {item.lastname}</option> 
                                                    ))}
                                                </FormSelect>
                                                
                                            </FormGroup>
                                        
                                        )}

                                    </div>

                                </div>

                                <div className='row'>

                                    <div className='col'>

                                        <FormGroup className='mb-3' controlId='semester'>
                                            <Form.Label>Semester</Form.Label>
                                            <Form.Select aria-label="Default select example" onChange={(e) => setGetSemesterList(e.target.value)} value={getSemesterList}>
                                                <option key={0} value={0}>Select Semester</option>
                                                
                                                {semesterList.map((item) => (
                                                    <option key={item.sem_id} value={item.sem_id} selected>{item.sem_name_th}</option> 
                                                ))}
                                            </Form.Select>
                                        </FormGroup>
   
                                    </div>

                                    <div className='col'>
                                        <FormGroup className='mb-3' controlId='educa_year'>
                                            <Form.Label>Education Year</Form.Label>
                                            <Form.Control type="text" value={ educaYear } onChange={(e) => setEducaYear (e.target.value)} placeholder="Enter education year" required/>
                                            <Form.Control.Feedback type="invalid">
                                                Please enter education year.
                                            </Form.Control.Feedback>
                                        </FormGroup>
                                    </div>                                    

                                </div>

                                <div className='row'>
   
                                    <div className='col'>
                                        <FormGroup className='mb-3' controlId='t_type'>
                                            <Form.Label>Teach Type</Form.Label>
                                            <FormSelect aria-label="Default select example" onChange={(e) => setGetTeachType(e.target.value)} value={getTeachType}>
                                                <option key={0} value={0}>Select Teach Type</option>
                                                
                                                {teachType.map((item) => (
                                                    <option key={item.t_type_id} value={item.t_type_id} selected>{item.t_type_name}</option> 
                                                ))}
                                            </FormSelect>
                                        </FormGroup>
                                    </div>

                                    <div className='col'>
                                        <FormGroup className='mb-3' controlId='day'>
                                            <Form.Label>Day</Form.Label>
                                            <FormSelect aria-label="Default select example" onChange={(e) => setGetDayList(e.target.value)} value={getDayList}>
                                                <option key={0} value={0}>Select Day</option>
                                                
                                                {dayList.map((item) => (
                                                    <option key={item.day_id} value={item.day_id} selected>{item.day_name}</option>
                                                ))}
                                            </FormSelect>
                                        </FormGroup>
                                    </div>

                                    <div className='col'>
                                        <FormGroup className='mb-3' controlId='st_time'>
                                            <Form.Label>Start Time</Form.Label>
                                            <input class="form-control timePicker" type='time' step={2} onChange={(e) => setStartTime(e.target.value)} value={startTime} />
                                        </FormGroup>
                                    </div>

                                    <div className='col'>
                                        <FormGroup className='mb-3' controlId='e_time'>
                                            <Form.Label>End Time</Form.Label>
                                            <input class="form-control timePicker" type='time' step={2} onChange={(e) => setEndTime(e.target.value)} value={endTime} />
                                        </FormGroup>
                                    </div>

                                </div>

                               

                                <div>
                                    <Button type='submit' defaultValue="add" className="btn-md under-line">
                                        Add
                                    </Button>
                                    <Button type='submit' onClick={goBack} defaultValue="back" className="btn-md under-line float-end">
                                        Back
                                    </Button>
                                </div>

                            </Form>

                        </div>

                    </div>

                </div>

            </div>

        </div>
        
    );

};

export default AddSchedule;