import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import axios from 'axios';

function Signin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();


        try {

            const response = await axios.post('http://localhost:3003/',
                {
                    email,
                    password
                }
            );

            if (response.status === 200) {
                if (response.data.message === "1") {
                    sessionStorage.setItem("id_num", response.data.id);
                    setSuccess('Login successful. You are being redirected...')
                    setTimeout(() => {
                        navigate('/Portal');
                    }, 1000);
                } else {
                    setError('The username or password you entered is incorrect.');
                }
            }
        } catch (err) {
            setError('An error occurred in username and password check.');
        }


    }

    return (
        <>
            <div className="row justify-content-center mt-5">
                <div className="col-4 mx-auto" >
                    <form onSubmit={handleSubmit}>
                        <i className="fa-solid fa-pen-nib fa-4x"></i>
                        <h1 className="h3 mb-3 fw-normal text-center">Sign in</h1>

                        <div className="form-floating py-2">
                            <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="name@example.com" />
                            <label htmlFor="floatingInput">Email</label>
                        </div>
                        <div className="form-floating py-2">
                            <input type="password" className="form-control" id="sifre" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Şifrenizi Giriniz" />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>

                        <div className="row justify-content-center">
                            <div className="col-3">
                                <input style={{ backgroundColor: "rgb(214, 88, 65)" }} value="Login" className="w-100 btn btn-primary btn-lg text-center"
                                    type="submit" />
                            </div>
                        </div>
                    </form>



                    <div className="row justify-content-center">
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {success && <p style={{ color: 'green' }}>{success}</p>}

                        <p className='text-center'>Don't have an account? <Link to="/Signup">Sign Up!</Link></p>
                    </div>
                </div>

            </div>




        </>
    );
}
export default Signin;