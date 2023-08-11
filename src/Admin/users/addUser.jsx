import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function AddUser() {

    const return_back = useNavigate();

    const [validated, setValidated] = useState(false);

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
            doAdd();
        }

        setValidated(true);

    };

    const goBack = () => {
        // window.history.back();
        return_back("../userlist");
    }


    useEffect(() => {

        const getPrefix = async() => {

            const response = await fetch(
                "http://localhost:8000/api/userlist/getprefix", 
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

            setPrefix(result.data);

        }

        const getAcademicRank = async() => {

            const response = await fetch(
                "http://localhost:8000/api/userlist/getacademict", 
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

            setAcademicRank(result.data);

        }

        const getRole = async() => {

            const response = await fetch(
                "http://localhost:8000/api/userlist/getrole", 
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

            setRole(result.data);

        }

        const getUserStatus = async() => {

            const response = await fetch(
                "http://localhost:8000/api/userlist/getuserstatus", 
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

            setUserStatus(result.data);

        } 


        getPrefix();
        getAcademicRank();
        getRole();
        getUserStatus();

    }, []);


    const doAdd = async() => {

        // console.log(getAct);
        // console.log(getRole);

        // const add_user_acc = await fetch(
        //     "http://localhost:8000/api/userlist/add_useraccount", 
        //     {
        //         method: "POST",
        //         headers: {
        //             Accept: "application/json",
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify({
        //             email: email,
        //             username: username,
        //             password: md5(password)
        //         })
        //     }
        // );

        // const user_acc_data = await add_user_acc.json();

        // console.log(user_acc_data);


        // const add_user_info = await fetch(
        //     "http://localhost:8000/api/userlist/add_userinfo", 
        //     {
        //         method: "POST",
        //         headers: {
        //             Accept: "application/json",
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify({
                    
        //             prefix_id: getPrefix,
        //             firstname: firstname,
        //             lastname: lastname,
        //             phonenumber: phonenumber

        //         })
        //     }
        // );

        // const add_user_info_data = await add_user_info.json();

        // console.log(add_user_info_data);

        // const get_acc_id = await fetch(
        //     "http://localhost:8000/api/userlist/getIdAccuser", 
        //     {
        //         method: "GET",
        //         headers: {
        //             Accept: "application/json",
        //             "Content-Type": "application/json"
        //         }
        //     }
        // );

        // const acc_id = await get_acc_id.json();
        // console.log(acc_id);

        // setAccountId(acc_id.data[0].account_id);

        // const get_u_info_id = await fetch(
        //     "http://localhost:8000/api/userlist/getIdUserinfo", 
        //     {
        //         method: "GET",
        //         headers: {
        //             Accept: "application/json",
        //             "Content-Type": "application/json"
        //         }
        //     }
        // );

        // const u_info_id = await get_u_info_id.json();
        // console.log(u_info_id);

        // setUserInfoId(u_info_id.data[0].u_info_id);



        const add_user = await fetch(
            "http://localhost:8000/api/userlist/add_user", 
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    
                    prefix_id: getPrefix,
                    firstname: firstname,
                    lastname: lastname,
                    phonenumber: phonenumber,
                    email: email,
                    username: username,
                    password: password,
                    role: getRole,
                    acaRank: getAct,
                    user_status: getUserStatus

                })
            }
        );

        const user_data = await add_user.json();

        console.log(user_data);


        if(user_data.result) {
            window.location.href = ('../userlist');
        }



    }

    return (


        <div className='row px-5'>

            <h2>Add User Form</h2>
            
            <hr />

            <br /><br />



            <div className='card-body m-5 p-5 rounded' style={{ backgroundColor: "whitesmoke" }}>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>

                    <div className='mb-4'>
                        <h5>&nbsp;&nbsp;&nbsp;Please input your form correctly.</h5>
                    </div>

                    <hr />

                    <div className='row'>

                        <div className='col-md'>

                            <div className='col-md'>

                                <FormGroup className='mb-3' controlId='email'>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" value={ email } onChange={(e) => setEmail (e.target.value)} placeholder="Enter email" required/>
                                    <Form.Control.Feedback type="invalid">
                                        Please enter email.
                                    </Form.Control.Feedback>
                                </FormGroup>

                                <FormGroup className='mb-3' controlId='username'>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" value={ username } onChange={(e) => setUsername (e.target.value)} placeholder="Enter username" required/>
                                    <Form.Control.Feedback type="invalid">
                                        Please enter username.
                                    </Form.Control.Feedback>
                                </FormGroup>

                                <FormGroup className='mb-3' controlId='password'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" value={ password } onChange={(e) => setPassword (e.target.value)} placeholder="Enter password" required/>
                                    <Form.Control.Feedback type="invalid">
                                        Please enter password.
                                    </Form.Control.Feedback>
                                </FormGroup>

                            </div>

                        </div>

                        <div className='col-md'>

                            <div className='col-md'>

                                <FormGroup className='mb-3' controlId='prefix'>

                                <Form.Label className='mb-3'>Prefix</Form.Label>

                                    <FormControl fullWidth size='small'>

                                        <InputLabel>Select Prefix</InputLabel>
                                        
                                        <Select
                                            labelId='demo-simple-select-label'
                                            id='demo-simple-select'
                                            label="Select Prefix"
                                            value={getPrefix}
                                            onChange={(e) => setGetPrefix(e.target.value)}
                                            style={{ color: "black" }}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>

                                            {prefix.map((item) => (
                                                <MenuItem key={item.prefix_id} value={item.prefix_id} required>{item.prefix_name}</MenuItem> 
                                            ))}
                                        </Select>

                                    </FormControl>

                                </FormGroup>

                            </div>

                            <div className='col-md'>

                                <FormGroup className='mb-3' controlId='firstname'>
                                    <Form.Label className='mb-3'>Firstname</Form.Label>
                                    <Form.Control type="text" value={ firstname } onChange={(e) => setFirstname(e.target.value)} placeholder="Enter firstname" required/>
                                    <Form.Control.Feedback type="invalid">
                                        Please enter firstname.
                                    </Form.Control.Feedback>
                                </FormGroup>

                            </div>

                            <div className='col-md'>

                                <FormGroup className='mb-3' controlId='lastname'>
                                    <Form.Label className='mb-3'>Lastname</Form.Label>
                                    <Form.Control type="text" value={ lastname } onChange={(e) => setLastname(e.target.value)} placeholder="Enter lastname" required/>
                                    <Form.Control.Feedback type="invalid">
                                        Please enter lastname.
                                    </Form.Control.Feedback>
                                </FormGroup>

                            </div>

                            <div className='col-md'>

                                <FormGroup className='mb-3' controlId='p_num'>
                                    <Form.Label className='mb-3'>Phone Number</Form.Label>
                                    <Form.Control type="text" value={ phonenumber } onChange={(e) => setPhonenumber(e.target.value)} placeholder="Enter phone number" required/>
                                    <Form.Control.Feedback type="invalid">
                                        Please enter phone number.
                                    </Form.Control.Feedback>
                                </FormGroup>

                            </div>

                        </div>

                        <div className='col-md'>

                            <div className='col-md'>

                                <FormGroup className='mb-3' controlId='act_rank'>

                                    <Form.Label className='mb-3'>Academic Rank</Form.Label>

                                    <FormControl fullWidth size='small'>

                                        <InputLabel>Select Academic Rank</InputLabel>

                                        <Select
                                            labelId='demo-simple-select-label'
                                            id='demo-simple-select'
                                            label="Select Academic Rank"
                                            value={getAct}
                                            onChange={(e) => setGetAct(e.target.value)}
                                            style={{ color: "black" }}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>

                                            {academicRank.map((item) => (
                                                <MenuItem key={item.act_id} value={item.act_id} required>{item.act_name}</MenuItem> 
                                            ))}
                                        </Select>

                                        <Form.Control.Feedback type="invalid">
                                            Please enter password.
                                        </Form.Control.Feedback>
                                    </FormControl>

                                </FormGroup>

                            </div>

                            <div className='col-md'>

                                <FormGroup className='mb-3' controlId='role'>

                                    <Form.Label className='mb-3'>Role</Form.Label>

                                    <FormControl fullWidth size='small'>

                                        <InputLabel>Select Role</InputLabel>
                                        <Select
                                            labelId='demo-simple-select-label'
                                            id='demo-simple-select'
                                            label="Select Role"
                                            value={getRole}
                                            onChange={(e) => setGetRole(e.target.value)}
                                            style={{ color: "black" }}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>

                                            {role.map((item) => (
                                                <MenuItem key={item.role_id} value={item.role_id} required>{item.role_name}</MenuItem> 
                                            ))}
                                        </Select>

                                    </FormControl>

                                </FormGroup>

                            </div>

                            <div className='col-md'>

                                <FormGroup className='mb-3' controlId='user_status'>

                                    <Form.Label className='mb-3'>User Status</Form.Label>

                                    <FormControl fullWidth size='small'>

                                        <InputLabel>Select Status</InputLabel>
                                        <Select
                                            labelId='demo-simple-select-label'
                                            id='demo-simple-select'
                                            label="Select Status"
                                            value={getUserStatus}
                                            onChange={(e) => setGetUserStatus(e.target.value)}
                                            style={{ color: "black" }}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>

                                            {userStatus.map((item) => (
                                                <MenuItem key={item.u_status_id} value={item.u_status_id} required>{item.u_status_name}</MenuItem> 
                                            ))}
                                        </Select>

                                    </FormControl>

                                </FormGroup>

                            </div>

                        </div>
                        
                    </div>

                    <br />

                    <div className='row'>
                        <div className='col-6'>
                            <Button type='submit' defaultValue="add" className="under-line float-end">
                                Add
                            </Button>
                        </div>
                        <div className='col-6'>
                            <Button type='submit' onClick={goBack} defaultValue="back" className="register under-line ">
                                Back
                            </Button>
                        </div>
                    </div>


                </Form>

            </div>


           {/* <div className='col-md-5'>

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

                                <FormGroup className='mb-3' controlId='username'>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" value={ username } onChange={(e) => setUsername (e.target.value)} placeholder="Enter username" required/>
                                    <Form.Control.Feedback type="invalid">
                                        Please enter username.
                                    </Form.Control.Feedback>
                                </FormGroup>

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

                                <Form.Label className='mb-3'>Prefix</Form.Label>

                                    <FormControl fullWidth size='small'>

                                        <InputLabel>Select Prefix</InputLabel>
                                        
                                        <Select
                                            labelId='demo-simple-select-label'
                                            id='demo-simple-select'
                                            label="Select Prefix"
                                            value={getPrefix}
                                            onChange={(e) => setGetPrefix(e.target.value)}
                                            style={{ color: "black" }}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>

                                            {prefix.map((item) => (
                                                <MenuItem key={item.prefix_id} value={item.prefix_id} required>{item.prefix_name}</MenuItem> 
                                            ))}
                                        </Select>

                                    </FormControl>

                                </FormGroup>

                            </div>

                            <div className='col'>

                                <FormGroup className='mb-3' controlId='firstname'>
                                    <Form.Label className='mb-3'>Firstname</Form.Label>
                                    <Form.Control type="text" value={ firstname } onChange={(e) => setFirstname(e.target.value)} placeholder="Enter firstname" required/>
                                    <Form.Control.Feedback type="invalid">
                                        Please enter firstname.
                                    </Form.Control.Feedback>
                                </FormGroup>

                            </div>

                            <div className='col'>

                                <FormGroup className='mb-3' controlId='lastname'>
                                    <Form.Label className='mb-3'>Lastname</Form.Label>
                                    <Form.Control type="text" value={ lastname } onChange={(e) => setLastname(e.target.value)} placeholder="Enter lastname" required/>
                                    <Form.Control.Feedback type="invalid">
                                        Please enter lastname.
                                    </Form.Control.Feedback>
                                </FormGroup>

                            </div>

                            <div className='col'>
                        
                                <FormGroup className='mb-3' controlId='p_num'>
                                    <Form.Label className='mb-3'>Phone Number</Form.Label>
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

                                        <Form.Label className='mb-3'>Academic Rank</Form.Label>

                                        <FormControl fullWidth size='small'>

                                            <InputLabel>Select Academic Rank</InputLabel>

                                            <Select
                                                labelId='demo-simple-select-label'
                                                id='demo-simple-select'
                                                label="Select Academic Rank"
                                                value={getAct}
                                                onChange={(e) => setGetAct(e.target.value)}
                                                style={{ color: "black" }}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>

                                                {academicRank.map((item) => (
                                                    <MenuItem key={item.act_id} value={item.act_id} required>{item.act_name}</MenuItem> 
                                                ))}
                                            </Select>

                                            <Form.Control.Feedback type="invalid">
                                                Please enter password.
                                            </Form.Control.Feedback>
                                        </FormControl>

                                    </FormGroup>

                                </div>

                                <div className='col col-3 col-lg-4'>

                                    <FormGroup className='mb-3' controlId='role'>

                                        <Form.Label className='mb-3'>Role</Form.Label>

                                        <FormControl fullWidth size='small'>

                                            <InputLabel>Select Role</InputLabel>
                                            <Select
                                                labelId='demo-simple-select-label'
                                                id='demo-simple-select'
                                                label="Select Role"
                                                value={getRole}
                                                onChange={(e) => setGetRole(e.target.value)}
                                                style={{ color: "black" }}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>

                                                {role.map((item) => (
                                                    <MenuItem key={item.role_id} value={item.role_id} required>{item.role_name}</MenuItem> 
                                                ))}
                                            </Select>

                                        </FormControl>

                                    </FormGroup>

                                </div>

                                <div className='col col-3 col-lg-4'>

                                    <FormGroup className='mb-3' controlId='user_status'>

                                        <Form.Label className='mb-3'>User Status</Form.Label>

                                        <FormControl fullWidth size='small'>

                                            <InputLabel>Select Status</InputLabel>
                                            <Select
                                                labelId='demo-simple-select-label'
                                                id='demo-simple-select'
                                                label="Select Status"
                                                value={getUserStatus}
                                                onChange={(e) => setGetUserStatus(e.target.value)}
                                                style={{ color: "black" }}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>

                                                {userStatus.map((item) => (
                                                    <MenuItem key={item.u_status_id} value={item.u_status_id} required>{item.u_status_name}</MenuItem> 
                                                ))}
                                            </Select>

                                        </FormControl>

                                    </FormGroup>

                                </div>

                            </div>

                            <br />

                            <div>
                                <Button type='submit' defaultValue="add" className="under-line">
                                    Add
                                </Button>
                                <Button type='submit' onClick={goBack} defaultValue="back" className="register under-line float-end">
                                    Back
                                </Button>
                            </div>



                    </Form>

                </div> 

            </div> */}

        </div>

        
    );

};

export default AddUser;