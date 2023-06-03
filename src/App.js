import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter as Router, Route, Routes, Link, Outlet, Navigate } from 'react-router-dom';
import Signin from './components/signin/Signin';
import Signup from "./components/signup/Signup";
import Portal from "./scenes/global/portal/Portal";
import Form from "./components/form/form";
import Forminfo from "./components/forminfo/forminfo";
import Formupdate from "./components/formupdate/formupdate";
import Hesap from "./components/hesap/hesap";


function App() {
    
    return (

        <Router>
            <Routes>
                <Route path="/" element={<Signin />} />
                <Route path="/Signup" element={<Signup />} />
                <Route path="/Portal/" element={<Portal />} />
                <Route path="/Portal/form" element={<Form />} />
                <Route path="/Portal/forminfo" element={<Forminfo />} />
                <Route path="/Portal/formupdate" element={<Formupdate />} />
                <Route path="/Portal/hesap" element={<Hesap />} />


            </Routes>
        </Router>

    );
}
export default App;