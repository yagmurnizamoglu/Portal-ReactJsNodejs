import Sidebar from "../../scenes/global/sidebar/Sidebar";
import Topbar from "../../scenes/global/topbar/Topbar";
import { useState } from 'react';
import axios from 'axios';

function Hesap() {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordNew, setPasswordNew] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const id_num = sessionStorage.getItem('id_num');

    const handleSubmit = async (e) => {
        e.preventDefault();


        try {

            const response = await axios.post('http://localhost:3003/sifreKontrol',
                {
                    email,
                    password
                }
            );

            if (response.status === 200) {
                if (response.data.message === "1") {
                    document.getElementById("form").style.display = "none";
                    document.getElementById("newForm").style.display = "block";
                    setError('');
                } else {
                    setError('Incorrect email adress or password.');
                }
            }
        } catch (err) {
            setError('An error occurred in the username and password check.');
        }


    }

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (passwordNew != passwordConfirm) {
            setError("Passwords do not match, please retype");
            return;

        } else {


            try {

                const response = await axios.post('http://localhost:3003/sifreGuncelle', {
                    id_num,
                    passwordNew
                });


                if (response.status === 200) {
                    setSuccess('Your password has been successfully updated.');
                    setEmail('');
                    setPasswordNew('');
                    setPasswordConfirm('');
                    setError('');
                } else {
                    setError('An error occurred while updating the password.');
                }


            } catch (err) {
                setError('An error occurred while updating the password.');
            }

        }

    }



    return (
        <>
            <div className="Portal">
                <div className="PortalGlass">
                    <div className='row'>

                        <div className='col-2 '>
                            <Sidebar hesap_active="active" hesap_disabled="disabled" gor_to="/Portal/forminfo" form_to="/Portal/form" update_to="/Portal/formupdate" />
                        </div>

                        <div className='col-10 '>
                            <main className='content'>
                                <Topbar />
                            </main>

                            <div className="row justify-content-center mt-5">
                                <div className="col-md-4">
                                    <h2 className="text-center mb-4">Change Password</h2>
                                    <form id="form" onSubmit={handleSubmit} className="mb-4">
                                        <div className="form-group">
                                            <label htmlFor="current-password">Current Email:</label>
                                            <input type="email" id="current-password" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" required />
                                        </div>
                                        <div className="form-group mt-2">
                                            <label htmlFor="new-password">Current Password:</label>
                                            <input type="password" id="new-password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" required />
                                        </div>
                                        <div className="text-center mt-3">
                                            <button type="submit" className="btn btn-primary">Verify</button>
                                        </div>
                                        <div className="text-center mt-3">
                                            <span className="text-center text-danger">{error}</span>
                                        </div>
                                    </form>

                                    <form id="newForm" style={{ display: "none" }} onSubmit={handleUpdate} className="mb-4">

                                        <div className="form-group">
                                            <label htmlFor="new-password">New Password:</label>
                                            <input type="password" id="new-password" value={passwordNew} onChange={(e) => setPasswordNew(e.target.value)} className="form-control" required />
                                        </div>
                                        <div className="form-group mt-2">
                                            <label htmlFor="confirm-new-password">Confirm New Password:</label>
                                            <input type="password" id="confirm-new-password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} className="form-control" required />
                                        </div>
                                        <div className="text-center mt-3">
                                            <button type="submit" className="btn btn-primary">Update</button>
                                        </div>
                                        <div className="text-center mt-3">
                                            <span className="text-danger">{error}</span>
                                            <span className="text-success">{success}</span>
                                        </div>


                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>


                </div>

            </div>

        </>
    );


}

export default Hesap;