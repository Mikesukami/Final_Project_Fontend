import './login.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from 'react';
import { Button, Form, FormGroup } from 'react-bootstrap';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import img_login from './assets/rectangle-1.png';

var md5 = require('md5');

export default function Login() {

    const MySwal = withReactContent(Swal);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const [validated, setValidated] = useState(false);
    const [showWrongCredentials, setShowWrongCredentials] = useState(false);

    // function decorate() {
    //     return <img className="rectangle-1" src='rectangle-1.png' alt='Rectangle-1' />
    // }

    // export default decorate;


    window.onload = () => {
        setShowWrongCredentials(false);
        // setAdminRole(false);
        // setUserRole(false);
    };

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            doLogin();
            setShowWrongCredentials(false);
        }
        setValidated(true);
    };

    const getLogin = async() => {

        const response = await fetch(
            "http://localhost:8000/api/login",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            }
            
        );

        const data = await response.json();
        
        console.log(data);

        if(data.result) {

            localStorage.setItem("access_token", data.data.access_token);
            localStorage.setItem("user_id", data.data.account_info.user_id);
            localStorage.setItem("username", data.data.account_info.username);
            localStorage.setItem("firstname", data.data.account_info.firstname);
            localStorage.setItem("lastname", data.data.account_info.lastname);
            localStorage.setItem("email", data.data.account_info.email);
            localStorage.setItem("role_id", data.data.account_info.role_id);
            localStorage.setItem("role_name", data.data.account_info.role_name);

            const role_id = data.data.account_info.role_id;

            
            // console.log(role_id);

            if(role_id === 1) {
                // console.log(data.data.account_info.role_id);
                
                setShowWrongCredentials(false);

                MySwal.fire({
                    title: <strong>Success!</strong>,
                    html: <i>Logged in successfully!</i>,
                    icon: 'success',
                    timer: 1000
                }).then(() => {
                    // dispatch(redirect('/'));
                    window.location.href = ('/admin');
                })


            } else if(role_id === 2) {

                setShowWrongCredentials(false);

                MySwal.fire({
                    title: <strong>Success!</strong>,
                    html: <i>Logged in successfully!</i>,
                    icon: 'success',
                    timer: 1000
                }).then(() => {
                    // dispatch(redirect('/'));
                    window.location.href = ('/staff');
                })

                // console.log(data.data.account_info.role_id);
            } else {

                setShowWrongCredentials(false);

                MySwal.fire({
                    title: <strong>Success!</strong>,
                    html: <i>Logged in successfully!</i>,
                    icon: 'success',
                    timer: 1000
                }).then(() => {
                    // dispatch(redirect('/'));
                    window.location.href = ('/user');
                })

                // console.log(data.data.account_info.role_id);
            }

            setShowWrongCredentials(false);

        } else {

            // alert('Username or Password incorrect!')

            MySwal.fire({
                title: <strong>Oh no!</strong>,
                html: <i>Username or password incorrect!</i>,
                icon: 'error'
            })

            setShowWrongCredentials(true);
        }

        // return data;

    };


    const getAuthenToken = async() => {

        const response = await fetch(
            "http://localhost:8000/api/authen_request", 
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: md5(username)
                })
            }
        );

        const data = await response.json();
        // console.log(data);
        return data;
        

    };

    const getAccessToken = async(authToken) => {

        var baseString = username + password;
        var authenSignature = md5(baseString);

        const response = await fetch(
            "http://localhost:8000/api/access_request", 
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    auth_signature: authenSignature,
                    auth_token: authToken
                })
            }
        );

        const data = await response.json();
        // console.log(data);
        return data;

    };

    const doLogin = async() => {

        try {

            const data1 = await getAuthenToken();
            // console.log(data1);
            

            if (data1 && data1.data && data1.data.auth_token) {

                const authToken = data1.data.auth_token;
                
                const data2 = await getAccessToken(authToken);
                
                // console.log(data2.result);

                if (data2.result) {

                    localStorage.setItem("access_token", data2.data.access_token);
                    localStorage.setItem("user_id", data2.data.account_info.user_id);
                    localStorage.setItem("username", data2.data.account_info.username);
                    localStorage.setItem("firstname", data2.data.account_info.firstname);
                    localStorage.setItem("lastname", data2.data.account_info.lastname);
                    localStorage.setItem("email", data2.data.account_info.email);
                    localStorage.setItem("role_id", data2.data.account_info.role_id);
                    localStorage.setItem("role_name", data2.data.account_info.role_name);
                    
                    var roleid = data2.data.account_info.role_id;
                    // var rolename = data2.data.account_info.role_name;
                    // console.log(roleid);

                    if(roleid === 1) {
                        console.log(data2.data.account_info.role_id);
                        window.location.href = ('/admin');
                    } else if(roleid === 2) {
                        window.location.href = ('/staff');
                        console.log(data2.data.account_info.role_id);
                    } else {
                        // window.location.href = ('/user');
                        console.log(data2.data.account_info.role_id);
                    }

                } else {
                    // setShowWrongCredentials(true);
                }

            } else {
                // setShowWrongCredentials(true);
                console.error("Invalid response from getAuthenToken()");
            }

        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    return (

        <div className='login-form'>

            <div className='row'>

                <div className='col-sm-4 offset-4 mt-4'>

                    <div className='centerd'>
                        <img src='https://www.sci.psu.ac.th/wp-content/uploads/2020/06/Logo_Subbrand_Faculty-of-Science-Full_TH_Artboard-b.svg' alt='...' />
                    </div>

                    <div className='card pt-5 centered' style={ { padding: "30px", borderRadius: "40px", top: "10%" } }>

                        <h2 id='center'>Login Form</h2>

                        <div className='card-body'>

                            <Form noValidate validated={validated} onSubmit={handleSubmit}>

                            {showWrongCredentials && (
                                <Form.Label className="text-danger float-end">Username or password incorrect!</Form.Label>
                            )}

                                <FormGroup className='mb-2' controlId='username'>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" value={ username } onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" required/>
                                    <Form.Control.Feedback type="invalid">
                                        Please enter username.
                                    </Form.Control.Feedback>
                                </FormGroup>

                                <FormGroup className='mb-3' controlId='password'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" value={ password } onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required/>
                                    <Form.Control.Feedback type="invalid">
                                        Please enter password.
                                    </Form.Control.Feedback>
                                </FormGroup>

                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Remember me" />
                                </Form.Group>

                                <div style={{alignItems: "center"}}>
                                    {/* <input type="submit" defaultValue="login" className="btn btn-primary" /> */}
                                    <Button type='submit' variant='primary' onClick={getLogin}>
                                        Login
                                    </Button>
                                    {/* <a href="register" className="register under-line float-end">
                                        Register
                                    </a> */}
                                </div>

                            </Form>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}