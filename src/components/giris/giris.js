import { Link } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';
import Signin from "../signin/Signin";
import Signup from "../signup/Signup";


function Giris() {

    return (
        <>
            <div class="row justify-content-center">
                <div class="col-4">
                </div>
                <div class="col-4 align-item-center">

                    <button type="button" class="btn btn-outline-light me-2" style={{ backgroundColor: "rgb(230, 85, 55)" }}><Link to="/Signin" style={{ textDecoration: "none", color: "antiquewhite" }}>Sign in</Link></button>
                    <button type="button" class="btn btn-warning"><Link to="/Signup" style={{ textDecoration: "none", color: "black" }}>Sign up</Link></button>

                    <div class="row justify-content-center">
                        <Routes>
                            <Route path='/Signin' element={<Signin />} />
                            <Route path='/Signup' element={<Signup />} />
                        </Routes>
                    </div>
                    
                </div>

                <div class="col-4">
                </div>
            </div>

        </>
    );
}
export default Giris;