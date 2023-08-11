import './StaffStyle.css';
import { useState } from 'react';
import {
    FaTh,
    FaUserAlt,
    FaRegChartBar
    // FaCommentAlt,
    // FaShoppingBag,
    // FaThList
} from "react-icons/fa";
import { NavLink, Navigate, Outlet } from 'react-router-dom';

const StaffApp = () => {

    const logout = () => {
        localStorage.removeItem("access_token");

        window.location.href = '/';
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
            path: "./courseschedule",
            name: "Course Schedule",
            icon: <FaRegChartBar />
        }
    ]

    if (localStorage.getItem("access_token")) {
        // console.log(localStorage.getItem("access_token"));
        // console.log(localStorage.getItem("role_id"));

        if (localStorage.getItem("role_id") === '2') {


            return (

                <div>

                    <div style={{ width: isOpen ? "240px" : "80px" }} className="sidebar">

                        <div className="top_section" >
                            <img
                                src={'https://www.sci.psu.ac.th/wp-content/uploads//2020/06/Logo_Subbrand_Faculty-of-Science_Short-V_TH_Artboard-b.svg'}
                                alt=""
                                style={{ width: '60px', marginRight: isOpen ? "4px" : "none" }}
                                onClick={toggle}
                            />

                            <h1 style={{ display: isOpen ? "block" : "none", marginLeft: isOpen ? "15px" : "none" }} className="logo">EBR System</h1>
                            <div style={{ marginLeft: isOpen ? "60px" : "12px" }} className="bars">
                                {/* <FaBars onClick={toggle}/> */}
                            </div>
                        </div>

                        {
                            menuItem.map((item, index) => (
                                <NavLink to={item.path} key={index} className="link" activeclassName="active" style={{ marginTop: "10px" }}>
                                    <div className="icon" style={{ marginLeft: isOpen ? "10px" : "13px" }}>{item.icon}</div>
                                    <div style={{ display: isOpen ? "block" : "none", marginLeft: isOpen ? "10px" : "none" }} className="link_text">{item.name}</div>
                                </NavLink>
                            ))
                        }

                        <div style={{ paddingTop: "640px" }} />

                        <div className='link' onClick={logout}>
                            <div className="icon" style={{ marginLeft: isOpen ? "10px" : "13px" }}><FaUserAlt /></div>
                            <div style={{ display: isOpen ? "block" : "none", marginLeft: isOpen ? "10px" : "none" }} className="link_text">Logout</div>
                        </div>

                    </div>


                    <main>

                        <Outlet />

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

export default StaffApp;
