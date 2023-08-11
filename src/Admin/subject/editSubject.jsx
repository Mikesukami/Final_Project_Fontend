import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, FormSelect } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';


function EditSubject() {

    const params = useParams();

    const return_back = useNavigate();

    const [validated, setValidated] = useState(false);

    const [subjectId, setSubjectId] = useState("");
    const [sjcode, setSJcode] = useState("");
    const [sjname_th, setSJname_th] = useState("");
    const [sjname_en, setSJname_en] = useState("");

    const [credit, setCredit] = useState(0);
    const [describe, setDescripe] = useState(0);
    const [practice, setPractice] = useState(0);
    const [actlearn, setActlearn] = useState(0);

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
                "http://localhost:8000/api/subjectlist/edit/"+ params.id, 
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
                const subjectData = result.data[0]; // Access the first user object in the array
                setSubjectId(subjectData.subject_id);
                setSJcode(subjectData.subject_code);
                setSJname_th(subjectData.subject_name_th);
                setSJname_en(subjectData.subject_name_en);
                setCredit(subjectData.credit);
                setDescripe(subjectData.describe);
                setPractice(subjectData.practices);
                setActlearn(subjectData.act_learning);
            }

        }

        getData();

    }, [params.id]);

    const goBack = () => {
        // window.history.back();
        return_back("../subjectlist");
    }

    const doUpdate = async() => {

        const response = await fetch(
            "http://localhost:8000/api/subjectlist/update/"+ params.id, 
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
                })
            }
        );

        const data = await response.json();

        console.log(data);

        if(data.result) {
            window.location.href = ('../../subjectlist');
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

                        <h2 id='center'>Add Subject Form</h2>

                        <div className='card-body'>

                            <Form noValidate validated={validated} onSubmit={handleSubmit}>

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

                </div>

            </div>

        </div>

    );

};

export default EditSubject;