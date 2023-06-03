import Logout from '../../../img/logout.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Topbar = () => {
    const navigate = useNavigate();

    async function SignOut(navigate){

        const id = sessionStorage.getItem("id_num");
        try{

            const response = await axios.post('http://localhost:3003/Signout',
                {id}
            );
    
            if(response.status === 200){
              navigate('/');
            }else{
                alert("Şu an cikisinizi yapamiyoruz.");
            }
    
    
        }catch(err){
            console.error(err);
        }
    
    }

    return (
        <>

            <div className="p-3 bg-dark text-white" >
                <div className="container bg-dark text-white d-flex justify-content-end">

                    <div className="btn_div d-flex" id="header_sag">
                        <img src={Logout} style={{ height: "2rem" }} alt="" onClick={() => SignOut(navigate)} />

                    </div>

                </div>
            </div>

        </>
    );

}


export default Topbar;