import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function UserList() {

    const [userList, setUserList] = useState([]);

    useEffect(() => {

        const getUserData = async() => {

            const response = await fetch(
                "http://localhost:8000/api/userlist", 
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

            setUserList(result.data);

        }

        getUserData();

    }, []);


    const onDelete = async (user_id) => {

        if((localStorage.getItem("user_id")) === (user_id)) {
            alert('Cannot delete logged in account');
        } else {

            const response = await fetch(
                "http://localhost:8000/api/userlist/delete/",
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        userId: user_id
                    })
                }
                
            );
    
            const result = await response.json();
            
                // console.log(result)
            
            const getUserData = async() => {
    
                const response = await fetch(
                    "http://localhost:8000/api/userlist", 
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
    
                setUserList(result.data);
    
            }
    
            getUserData();
    
            alert("Deleted Successfully.");
    
        }
       
    }

    return (
      
        <div className='row px-5'>

            <h2 className='mt-2'>User List</h2>

            <hr />

            <div className='my-4'>
                <Link to={'add'} className='btn btn-warning boarder-dark float-end'>
                    Add
                </Link>
            </div>

            <br />

            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="main-box clearfix">

                            <div className="table-responsive">

                            {userList && userList.length > 0 ? (

                                <table className="table user-list">
                                    <thead>
                                        <tr>
                                            <th><span>User</span></th>
                                            <th><span>Academic Title</span></th>
                                            <th className="text-center"><span>Status</span></th>
                                            <th><span>Email</span></th>
                                            <th><span>Options</span></th>
                                            {/* <th>&nbsp;</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>

                                    {userList.map((item) => (

                                        <tr key={item.user_id}>
                                            <td>
                                                <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
                                                <h5>{item.firstname} {item.lastname}</h5>
                                                <span className="user-subhead">{item.role_name}</span>
                                            </td>
                                            <td>
                                                {item.act_name}
                                            </td>
                                            <td className="text-center">
                                                <span className="label label-default">{item.u_status_name}</span>
                                            </td>
                                            <td>
                                                <a href="#">{item.email}</a>
                                            </td>
                                            <td>
                                                {/* <a href="#" className="table-link"> */}
                                                    <span className="fa-stack">
                                                        <Link to={'edit/' + item.user_id} className='btn btn-info border-dark'>
                                                        Edit
                                                        </Link>
                                                        <Button
                                                        variant='danger'
                                                        size='md'
                                                        style={{ marginLeft: "20px" }}
                                                        onClick={() => onDelete(item.user_id)}
                                                        >
                                                        Delete
                                                        </Button>
                                                    </span>
                                                {/* </a> */}
                                            </td>
                                        </tr>

                                    ))}

                                    </tbody>
            
                                </table>
                            ) : (
                                <p>No users found.</p>
                            )}
                            
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );

}

export default UserList;