import './Sidebar.css';
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from '../../../img/logo.png';
import { SidebarData } from "../../../data/Data";


const Sidebar = (props) => {

    const [selected, setSelected] = useState(0);

    return (
        <div className="Sidebar">

            <div className="logo">
                <img src={Logo} style={{ height: "5rem" }} alt=""/>
            </div>

            <div className="menu">              

                <ul className="nav nav-pills flex-column mb-auto">
                <li className="menuItem">
                        <Link className={`nav-link ${props.hesap_active} ${props.hesap_disabled}`} to={`${props.hesap_to}`}>Account Settings</Link>
                    </li>
                    <li className="menuItem">
                        <Link className={`nav-link ${props.form_active} ${props.form_disabled}`} aria-current="page" to={`${props.form_to}`}>Application Form</Link>
                    </li>
                    <li className="menuItem">
                        <Link className={`nav-link ${props.gor_active} ${props.gor_disabled}`} to={`${props.gor_to}`}>View Application Info</Link>
                    </li>
                    <li className="menuItem">
                        <Link className={`nav-link ${props.update_active} ${props.update_disabled}`} to={`${props.update_to}`}>Update Application Info</Link>
                    </li>
                </ul>

               

            </div>

        </div>
    )
}

export default Sidebar;

