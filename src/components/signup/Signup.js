import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

function Signup() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passRepeat, setPassRepeat] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password != passRepeat) {
            setError("Passwords do not match!");
            return;
        }


        try {

            const response = await axios.post('http://localhost:3003/Signup', {
                email,
                password
            });

            if (response.status === 200) {
                setSuccess('Account created. You can login.');
                setEmail('');
                setPassword('');
                setPassRepeat('');
                setError('');
            } else {
                setError('An error occurred while creating the account.');
            }


        } catch (err) {
            setError('An error occurred while creating the account.');
        }


    }

    return (
        <>
            <div className="row justify-content-center mt-5">
                <div className="col-4 mx-auto" >
                    <form onSubmit={handleSubmit}>
                        <i className="fa-solid fa-pen-nib fa-4x"></i>
                        <h1 className="h3 mb-3 fw-normal text-center">Sign Up</h1>

                        <div className="form-floating py-2">
                            <input type="email" className="form-control" id="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <label htmlFor="floatingInput">Email</label>
                        </div>
                        <div className="form-floating py-2">
                            <input type="password" className="form-control" id="sifre" placeholder="Şifrenizi Giriniz" value={password} onChange={(e) => setPassword(e.target.value)} minLength="6" required />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <div className="form-floating py-2">
                            <input type="password" className="form-control" id="reSifre" placeholder="Confirm password"
                                value={passRepeat} onChange={(e) => setPassRepeat(e.target.value)} minLength="6" required />
                            <label htmlFor="floatingPassword">Confirm Password</label>
                        </div>

                        <div className="row justify-content-center">
                            <div className="col-3">
                                <input style={{ backgroundColor: "rgb(214, 88, 65)" }} value="Register" className="w-100 btn btn-primary btn-lg text-center"
                                    type="submit" />
                            </div>
                        </div>
                    </form>

                    <div className="row justify-content-center">

                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {success && <p style={{ color: 'green' }}>{success}</p>}
                        <p className="text-center">Do you have an account? <Link to="/">Sign In!</Link></p>
                    </div>

                </div>
            </div>
        </>

    );
}
export default Signup;