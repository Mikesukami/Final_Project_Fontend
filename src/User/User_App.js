import './UserStyle.css';
import { useState } from 'react';
import {
    FaTh,
    FaUserAlt,
    FaThList,
    FaDoorOpen,
    FaBars
} from "react-icons/fa";
import { NavLink, Navigate, Outlet } from 'react-router-dom';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const UserApp = () => {

    const MySwal = withReactContent(Swal);


    const logout = () => {
        localStorage.removeItem("access_token");

        MySwal.fire({
            title: <strong>Success!</strong>,
            html: <i>Logged out successfully!</i>,
            icon: 'success',
            timer: 1000
        }).then(() => {
            window.location.href = '/';
        })
    }

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const menuItem = [
        {
            path: "./dashboard",
            name: "Dashboard",
            icon: <FaTh />
        },
        {
            path: "./workload",
            name: "Course",
            icon: <FaThList />
        }
    ]

    if (localStorage.getItem("access_token")) {
        // console.log(localStorage.getItem("access_token"));
        // console.log(localStorage.getItem("role_id"));

        if (localStorage.getItem("role_id") === '3' || localStorage.getItem("role_id") === '4')  {


            return (

                <div>

                    <div style={{ width: isOpen ? "240px" : "80px" }} className="sidebar">

                        <div className="top_section" >
                            <img
                                src={'https://www.sci.psu.ac.th/wp-content/uploads//2020/06/Logo_Subbrand_Faculty-of-Science_Short-V_TH_Artboard-b.svg'}
                                alt=""
                                style={{ width: '60px', marginRight: isOpen ? "4px" : "none" }}
                                // onClick={toggle}
                            />

                            <h1 style={{ display: isOpen ? "block" : "none", marginLeft: isOpen ? "15px" : "none" }} className="logo">EBR System</h1>
                            <div style={{ marginLeft: isOpen ? "60px" : "12px" }} className="bars">
                                {/* <FaBars onClick={toggle}/> */}
                            </div>
                        </div>

                        {menuItem.map((item, index) => (
                            <NavLink to={item.path} key={index} className="link" activeclassName="active" style={{ marginTop: "10px" }}>
                            <div className="icon" style={{ marginLeft: isOpen ? "10px" : "13px" }}>{item.icon}</div>
                            <div style={{ display: isOpen ? "block" : "none", marginLeft: isOpen ? "10px" : "none" }} className="link_text">{item.name}</div>
                            </NavLink>
                        ))}

                    </div>

                    <main>

                        <nav className='navbar'>
                            <ul className='nav'>
                                <li class="nav-item" onClick={toggle}>
                                    <p class="nav-link mx-2 text-white"><FaBars /></p>
                                </li>
                            </ul>
                            <div className='justify-content-end nav-underline'>
                                <ul class="nav">
                                    {/* <li class="nav-item">
                                        <a class="nav-link" aria-current="page" href="#">Active</a>
                                    </li> */}
                                    {/* <li class="nav-item">
                                        <a class="nav-link" href="#">Link</a>
                                    </li> */}
                                    <li class="nav-item">
                                        <p class="nav-link mx-2 text-white"><FaUserAlt /> Profile</p>
                                    </li>
                                    <li class="nav-item" onClick={logout}>
                                        <p class="nav-link mx-3 text-white"><FaDoorOpen /> Logout</p>
                                    </li>
                                </ul>
                            </div>
                        </nav>

                        <div className='main-content'>
                            <Outlet />
                        </div>

                    </main>

                </div>

            );

        } else {
            return (
                <Navigate to="/" replace />
            );
        }


    } else {
        return (
            <Navigate to="/" replace />
        );
    }
}

export default UserApp;
