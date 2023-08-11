import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, FormSelect } from 'react-bootstrap';

function AddSubject() {

    const [validated, setValidated] = useState(false);

    const [sjcode, setSJcode] = useState("");
    const [sjname_th, setSJname_th] = useState("");
    const [sjname_en, setSJname_en] = useState("");

    const [credit, setCredit] = useState(0);
    const [describe, setDescripe] = useState(0);
    const [practice, setPractice] = useState(0);
    const [actlearn, setActlearn] = useState(0);

    const [program, setProgram] = useState([]);
    const [getProgram, setGetProgram] = useState('');

    
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

        const get_Program = async() => {

            const response = await fetch(
                "http://localhost:8000/api/subjectlist/getprogram", 
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

            setProgram(result.data);

        }

        get_Program();

    }, []);


    const doAdd = async() => {

        // console.log(sjcode);
        // console.log(sjname_th);
        // console.log(sjname_en);
        // console.log(credit);
        // console.log(describe);
        // console.log(practice);
        // console.log(actlearn);
        // console.log(getProgram);


        const add_subject = await fetch(
            "http://localhost:8000/api/subjectlist/add_subject", 
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    
                    subject_code: sjcode,
                    subject_name_th: sjname_th,
                    subject_name_en: sjname_en,
                    credit: credit,
                    describe: describe,
                    practice: practice,
                    active_learning: actlearn,
                    program_id: getProgram

                })
            }
        );

        const subject_data = await add_subject.json();

        console.log(subject_data);


        if(subject_data.result) {
            window.location.href = ('../subjectlist');
        }



    }

    return (

        <div className='row px-5'>

            <h2>Add Subject Form</h2>

            <hr />

            <br /><br />

            <div className='card-body m-5 p-5 rounded' style={{ backgroundColor: "whitesmoke" }}>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>

                    <div className='mb-4'>
                        <h5>&nbsp;&nbsp;&nbsp;Please input your form correctly.</h5>
                    </div>

                    <hr />

                    <FormGroup className='mb-3' controlId='sjcode'>
                        <Form.Label>Subject Code</Form.Label>
                        <Form.Control type="text" value={ sjcode } onChange={(e) => setSJcode (e.target.value)} placeholder="Enter subject code" required/>
                        <Form.Control.Feedback type="invalid">
                            Please enter subject code.
                        </Form.Control.Feedback>
                    </FormGroup>

                    <FormGroup className='mb-3' controlId='jsnameth'>
                        <Form.Label>Subject name TH</Form.Label>
                        <Form.Control type="text" value={ sjname_th } onChange={(e) => setSJname_th (e.target.value)} placeholder="Enter subject name TH" required/>
                        <Form.Control.Feedback type="invalid">
                            Please enter subject name TH.
                        </Form.Control.Feedback>
                    </FormGroup>

                    <FormGroup className='mb-3' controlId='jsnameen'>
                        <Form.Label>Subject name EN</Form.Label>
                        <Form.Control type="text" value={ sjname_en } onChange={(e) => setSJname_en (e.target.value)} placeholder="Enter subject name EN" required/>
                        <Form.Control.Feedback type="invalid">
                            Please enter subject name EN.
                        </Form.Control.Feedback>
                    </FormGroup>

                    <FormGroup className='mb-3' controlId='ptogram'>
                        <Form.Label>Program</Form.Label>
                        <Form.Select aria-label="Default select example" onChange={(e) => setGetProgram(e.target.value)} value={getProgram}>
                            <option key={0} value={0}>Select Program</option>
                            
                            {program.map((item) => (
                                <option key={item.program_id} value={item.program_id} selected>{item.program_name_th}</option> 
                            ))}
                        </Form.Select>
                    </FormGroup>

                    <div className='row'>

                        <div className='col'>
                            <FormGroup className='mb-3' controlId='credit'>
                                <Form.Label>Credit</Form.Label>
                                <FormSelect aria-label="Default select example" onChange={(e) => setCredit(e.target.value)} value={credit}>
                                    <option key={1} value={1}>1</option>
                                    <option key={2} value={2}>2</option>
                                    <option key={3} value={3}>3</option>
                                </FormSelect>
                            </FormGroup>
                        </div>

                        <div className='col'>
                            <FormGroup className='mb-3' controlId='desc'>
                                <Form.Label>Describe</Form.Label>
                                <FormSelect aria-label="Default select example" onChange={(e) => setDescripe(e.target.value)} value={describe}>
                                    <option key={0} value={0}>0</option>
                                    <option key={1} value={1}>1</option>
                                    <option key={2} value={2}>2</option>
                                    <option key={3} value={3}>3</option>
                                    <option key={4} value={4}>4</option>
                                    <option key={5} value={5}>5</option>
                                    <option key={6} value={6}>6</option>
                                    <option key={7} value={7}>7</option>
                                    <option key={8} value={8}>8</option>
                                    <option key={9} value={9}>9</option>
                                </FormSelect>
                            </FormGroup>
                        </div>

                        <div className='col'>
                            <FormGroup className='mb-3' controlId='prac'>
                                <Form.Label>Practice</Form.Label>
                                <FormSelect aria-label="Default select example" onChange={(e) => setPractice(e.target.value)} value={practice}>
                                    <option key={0} value={0}>0</option>
                                    <option key={1} value={1}>1</option>
                                    <option key={2} value={2}>2</option>
                                    <option key={3} value={3}>3</option>
                                    <option key={4} value={4}>4</option>
                                    <option key={5} value={5}>5</option>
                                    <option key={6} value={6}>6</option>
                                    <option key={7} value={7}>7</option>
                                    <option key={8} value={8}>8</option>
                                    <option key={9} value={9}>9</option>
                                </FormSelect>
                            </FormGroup>
                        </div>

                        <div className='col'>
                            <FormGroup className='mb-3' controlId='act_learn'>
                                <Form.Label>Active learning</Form.Label>
                                <FormSelect aria-label="Default select example" onChange={(e) => setActlearn(e.target.value)} value={actlearn}>
                                    <option key={0} value={0}>0</option>
                                    <option key={1} value={1}>1</option>
                                    <option key={2} value={2}>2</option>
                                    <option key={3} value={3}>3</option>
                                    <option key={4} value={4}>4</option>
                                    <option key={5} value={5}>5</option>
                                    <option key={6} value={6}>6</option>
                                    <option key={7} value={7}>7</option>
                                    <option key={8} value={8}>8</option>
                                    <option key={9} value={9}>9</option>
                                </FormSelect>
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
        
    );

};

export default AddSubject;