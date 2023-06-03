import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/signup/signup";
import Layout from "./Layout";
import Form from "./components/form/Form";
import Signup from "./components/signup/signup";


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<MainDash />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}