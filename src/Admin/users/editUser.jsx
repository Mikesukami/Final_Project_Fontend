import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

function EditUser() {

    const return_back = useNavigate();

    const params = useParams();

    const [validated, setValidated] = useState(false);

    const [userId, setUserId] = useState();

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [phonenumber, setPhonenumber] = useState("");


    const [prefix, setPrefix] = useState([]);
    const [getPrefix, setGetPrefix] = useState(0);

    const [academicRank, setAcademicRank] = useState([]);
    const [getAct, setGetAct] = useState(0);

    const [role, setRole] = useState([]);
    const [getRole, setGetRole] = useState(0);

    const [userStatus, setUserStatus] = useState([]);
    const [getUserStatus, setGetUserStatus] = useState(0);


    const handleSubmit = (event) => {

        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            doUpdate();
        }

        setValidated(true);

    };

    

    useEffect(() => {

        const getData = async() => {

            const response = await fetch(
                "http://localhost:8000/api/userlist/edit/"+ params.id, 
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    }
                }
            );

            const result = await response.json();
            console.log(result);

            if (result.result && result.data.length > 0) {
                const userData = result.data[0]; // Access the first user object in the array
                setUserId(userData.user_id);
                setUsername(userData.username);
                setPassword(userData.password);
                setEmail(userData.email);
                setGetAct(userData.act_id)
                setGetPrefix(userData.prefix_id);
                setFirstname(userData.firstname);
                setLastname(userData.lastname);
                setPhonenumber(userData.phonenumber);
                setGetRole(userData.role_id);
                setGetUserStatus(userData.u_status_id);
            }


            const response_prefix = await fetch(
                "http://localhost:8000/api/userlist/getprefix", 
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    }
                }
            );

            const result_prefix = await response_prefix.json();
            // console.log(result);

            setPrefix(result_prefix.data);

            const response_act = await fetch(
                "http://localhost:8000/api/userlist/getacademict", 
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    }
                }
            );

            const result_act = await response_act.json();
            // console.log(result);

            setAcademicRank(result_act.data);

            const response_role = await fetch(
                "http://localhost:8000/api/userlist/getrole", 
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    }
                }
            );

            const result_role = await response_role.json();
            // console.log(result);

            setRole(result_role.data);

            const response_userstatus = await fetch(
                "http://localhost:8000/api/userlist/getuserstatus", 
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    }
                }
            );

            const result_userstatus = await response_userstatus.json();
            // console.log(result);

            setUserStatus(result_userstatus.data);

        }

        getData();

    }, [params.id]);

    const goBack = () => {
        // window.history.back();
        return_back("../userlist");
    }

    const doUpdate = async() => {

        // const response_acc = await fetch(
        //     "http://localhost:8000/api/userlist/update/u_acc/"+ params.id, 
        //     {
        //         method: "POST",
        //         headers: {
        //             Accept: "application/json",
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify({
        //             user_id: userId,
        //             email: email,
        //             username: username,
        //             password: md5(password)
        //         })
        //     }
        // );

        // const acc_data = await response_acc.json();

        // console.log(acc_data);

        // const response_info = await fetch(
        //     "http://localhost:8000/api/userlist/update/u_info/"+ params.id, 
        //     {
        //         method: "POST",
        //         headers: {
        //             Accept: "application/json",
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify({
        //             user_id: userId,
        //             prefix_id: getPrefix,
        //             firstname: firstname,
        //             lastname: lastname,
        //             phonenumber: phonenumber
        //         })
        //     }
        // );

        // const info_data = await response_info.json();

        // console.log(info_data);

        const response_user = await fetch(
            "http://localhost:8000/api/userlist/update/"+ params.id, 
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: userId,
                    prefix_id: getPrefix,
                    firstname: firstname,
                    lastname: lastname,
                    phonenumber: phonenumber,
                    email: email,
                    role: getRole,
                    acaRank: getAct,
                    user_status: getUserStatus
                })
            }
        );

        const user_data = await response_user.json();

        console.log(user_data);

        if(user_data.result) {
            window.location.href = ('../../userlist');
        }

    }

    return (
        
        <div style={{color: "black"}}>

            <div className='row'>

                <div className='col-sm-6 offset-3'>

                    <div className='centerd'>
                        <img src='https://www.sci.psu.ac.th/wp-content/uploads/2020/06/Logo_Subbrand_Faculty-of-Science-Full_TH_Artboard-b.svg' 
                            alt='...' 
                        />
                    </div>

                    <div className='card pt-5 centered' style={ { padding: "30px", borderRadius: "40px" } }>

                        <h2 id='center'>Edit Form</h2>

                        <div className='card-body'>

                            <Form noValidate validated={validated} onSubmit={handleSubmit}>

                                <div className='row'>

                                    <div className='col'>

                                        <FormGroup className='mb-3' controlId='email'>
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" value={ email } onChange={(e) => setEmail (e.target.value)} placeholder="Enter email" required/>
                                            <Form.Control.Feedback type="invalid">
                                                Please enter email.
                                            </Form.Control.Feedback>
                                        </FormGroup>
 
                                    </div>
                                
                                </div>

                                <div className='row'>

                                    <div className='col'>

                                        <FormGroup className='mb-3' controlId='username'>
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control type="text" value={ username } onChange={(e) => setUsername (e.target.value)} placeholder="Enter username" required/>
                                            <Form.Control.Feedback type="invalid">
                                                Please enter username.
                                            </Form.Control.Feedback>
                                        </FormGroup>
                                    </div>
                                    <div className='col'>
                                        <FormGroup className='mb-3' controlId='password'>
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" value={ password } onChange={(e) => setPassword (e.target.value)} placeholder="Enter password" required/>
                                            <Form.Control.Feedback type="invalid">
                                                Please enter password.
                                            </Form.Control.Feedback>
                                        </FormGroup>

                                    </div>

                                </div>

                                <div className='row'>
                                       
                                    <div className='col col-2 col-md-2'>

                                        <FormGroup className='mb-3' controlId='prefix'>
                                            <Form.Label>Prefix</Form.Label>
                                            <Form.Select aria-label="Default select example" onChange={(e) => setGetPrefix(e.target.value)} value={getPrefix}>
                                                {prefix.map((item) => (
                                                    <option key={item.prefix_id} value={item.prefix_id} selected={getPrefix}>{item.prefix_name}</option> 
                                                ))}
                                            </Form.Select>
                                        </FormGroup>

                                    </div>

                                    <div className='col'>
                                    
                                        <FormGroup className='mb-3' controlId='firstname'>
                                            <Form.Label>Firstname</Form.Label>
                                            <Form.Control type="text" value={ firstname } onChange={(e) => setFirstname(e.target.value)} placeholder="Enter firstname" required/>
                                            <Form.Control.Feedback type="invalid">
                                                Please enter firstname.
                                            </Form.Control.Feedback>
                                        </FormGroup>

                                    </div>

                                    <div className='col'>
                                    
                                        <FormGroup className='mb-3' controlId='lastname'>
                                            <Form.Label>Lastname</Form.Label>
                                            <Form.Control type="text" value={ lastname } onChange={(e) => setLastname(e.target.value)} placeholder="Enter lastname" required/>
                                            <Form.Control.Feedback type="invalid">
                                                Please enter lastname.
                                            </Form.Control.Feedback>
                                        </FormGroup>

                                    </div>

                                    <div className='col'>

                                        <FormGroup className='mb-3' controlId='p_num'>
                                            <Form.Label>Phone Number</Form.Label>
                                            <Form.Control type="text" value={ phonenumber } onChange={(e) => setPhonenumber(e.target.value)} placeholder="Enter phone number" required/>
                                            <Form.Control.Feedback type="invalid">
                                                Please enter phone number.
                                            </Form.Control.Feedback>
                                        </FormGroup>

                                    </div>

                                </div>

                                <div className='row'>

                                    <div className='col col-3 col-lg-4'>

                                        <FormGroup className='mb-3' controlId='act_rank'>
                                            <Form.Label>Academic Rank</Form.Label>
                                            <Form.Select aria-label="Default select example" onChange={(e) => setGetAct(e.target.value)} value={getAct}>
                                                {academicRank.map((item) => (
                                                    
                                                    <option key={item.act_id}  value={item.act_id} selected={getAct} >{item.act_name}</option> 
                                                ))}
                                            </Form.Select>
                                        </FormGroup>

                                    </div>

                                    <div className='col col-3 col-lg-4'>
                                    
                                        <FormGroup className='mb-3' controlId='role'>
                                            <Form.Label>Role</Form.Label>
                                            <Form.Select aria-label="Default select example" onChange={(e) => setGetRole(e.target.value)} value={getRole}>
                                                {role.map((item) => (
                                                    <option key={item.role_id} value={item.role_id} >{item.role_name}</option> 
                                                ))}
                                            </Form.Select>
                                        </FormGroup>

                                    </div>

                                    <div className='col col-3 col-lg-4'>
                                    
                                        <FormGroup className='mb-3' controlId='user_status'>
                                            <Form.Label>User Status</Form.Label>
                                            <Form.Select aria-label="Default select example" onChange={(e) => setGetUserStatus(e.target.value)} value={getUserStatus}>
                                                {userStatus.map((item) => (
                                                    <option key={item.u_status_id} value={item.u_status_id} >{item.u_status_name}</option> 
                                                ))}
                                            </Form.Select>
                                        </FormGroup>

                                    </div>

                                </div>

                                <div>
                                    <Button type='submit' defaultValue="add" className="under-line">
                                        Update
                                    </Button>
                                    <Button type='submit' onClick={goBack} defaultValue="back" className="register under-line float-end">
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

export default EditUser;