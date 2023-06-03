import './Portal.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Router, Routes, Route } from 'react-router-dom';
import Topbar from '../topbar/Topbar'
import Sidebar from '../sidebar/Sidebar'
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';


function Portal() {
    var navigate = useNavigate();
    var isLogin = sessionStorage.getItem("isLogin");

    useEffect(() => {

        if (isLogin == "false") {
            navigate("/");
        }
    }, []);

    return (

        <div className="Portal">
            <div className="PortalGlass">
                <div className='row'>

                    <div className='col-2 '>
                        <Sidebar form_to="/Portal/form" gor_to="/Portal/forminfo" hesap_to="/Portal/hesap" update_to="/Portal/formupdate" />
                    </div>

                    <div className='col-10 '>
                        <main className='content'>
                            <Topbar />
                        </main>

                        <div className="container">
                            <div className="row justify-content-center mt-5">
                                <div className="col-md-6">
                                    <h1>Welcome to our international project application portal</h1>
                                    <p>Our project operates in multiple countries and aims to create positive impact globally. Our team is composed of diverse individuals who share the common goal of making a difference.</p>
                                    <p>Our application process is designed to gather information about your skills, experiences and motivations. We value transparency, equality and respect for all applicants regardless of their background.</p>
                                    <p>Thank you for your interest in joining our mission!</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


            </div>

        </div>
    );
}
export default Portal;