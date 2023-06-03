import Sidebar from "../../scenes/global/sidebar/Sidebar";
import Topbar from "../../scenes/global/topbar/Topbar";
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Forminfo = (props) => {

    const navigate = useNavigate();
    var isLogin = sessionStorage.getItem("isLogin");
    useEffect(() => {

        if (isLogin == "false") {
            navigate("/");

        }
    }, []);

    //SAYFA GEÇİŞİ
    const [display, setDisplay] = useState(1);

    function Ileri() {
        setDisplay(display + 1);

    }
    function Geri() {
        setDisplay(display - 1);
    }

    function DisplayKontrol(bulunanSayfa) {
        if (bulunanSayfa === display) {
            return "block";
        }
        else {
            return "none";

        }


    }


    //ENGEL DURUMUNA GÖRE AÇIKLAMA YAZISI AÇILSIN YA DA AÇILMASIN
    function isExistDisability() {

        var radio_yes = document.getElementById("disab_yes");
        var radio_no = document.getElementById("disab_no");


        if (radio_yes.checked) {
            document.getElementById("describeDisability").style.display = "block";
        }

        else if (radio_no.checked) {
            document.getElementById("describeDisability").style.display = "none";

        }
    }

    const [disability, setDisability] = useState('');
    const [disabilityText, setDisabilityText] = useState('');
    const [gender, setGender] = useState('');
    const [bilgi, setBilgi] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {

        const bilgiGetir = async () => {
            const id = sessionStorage.getItem("id_num");

            console.log(id);

            try {

                const response = await axios.post("http://localhost:3003/formGoster",
                    { id }
                );

                if (response.status === 200) {
                    setBilgi(response.data);
                }

            } catch (err) {
                setError("Kullanici bilgileri gosterilemedi.");
            }
        }


        bilgiGetir();

    }, []);




    return (
        <>


            <div className="Portal">
                <div className="PortalGlass">
                    <div className='row'>

                        <div className='col-2 '>
                            <Sidebar gor_active="active" gor_disabled="disabled" form_to="/Portal/form" hesap_to="/Portal/hesap" gor_to="/Portal/forminfo" update_to="/Portal/formupdate" />
                        </div>

                        <div className='col-10 '>
                            <main className='content'>
                                <Topbar />
                                <div className="row mt-3">

                                    <div className="col-3">

                                    </div>

                                    <div className="col-6 pd-10px">


                                        <h3>Application Information</h3>
                                        {error && <p style={{ color: 'red' }}> {error} </p>}
                                        <form>
                                            <div style={{ display: DisplayKontrol(1) }}>
                                                <h4 className="mb-3">Personal Details</h4>
                                                <div className="row g-3" style={{ backgroundColor: "rgb(105, 138, 163)" }}>
                                                    <div className="col-sm-6">
                                                        <label for="firstName" className="form-label">First name*</label>
                                                        <input type="text" className="form-control" id="firstName" value={bilgi.firstName} required />
                                                    </div>

                                                    <div className="col-sm-6">
                                                        <label for="lastName" className="form-label">Last name*</label>
                                                        <input type="text" className="form-control" id="lastName" value={bilgi.lastName} />
                                                    </div>

                                                    <div className="col-12">
                                                        <label for="idNo" className="form-label">ID No*</label>
                                                        <input type="number" className="form-control personalValid" id="idNo" value={bilgi.idNo} />
                                                    </div>

                                                    <div className="col-12">
                                                        <label for="birthday" className="form-label">Birthday*</label>

                                                        <div className="input-group">
                                                            <input className="form-control" id="text" name="date" type="text" value={bilgi.date} />
                                                            <span className="input-group-append"></span>
                                                        </div>

                                                    </div>

                                                    <div className="col-sm-6">
                                                        <label for="firstName" className="form-label">Nationality*</label>
                                                        <input type="text" className="form-control" id="nationality" value={bilgi.nationality} />
                                                    </div>

                                                    <div className="col-sm-6">
                                                        <label for="lastName" className="form-label">Nationality 2</label>
                                                        <input type="text" className="form-control" id="nationality2" value={bilgi.nationality2} />
                                                    </div>


                                                    <div className="col-sm-6">

                                                        <div className="row">
                                                            <label for="gender" className="form-label gender">Gender in Identity</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="genderMale"
                                                                value="Male" checked={bilgi.gender === "Male"} onChange={(e) => setGender(e.target.value)} />
                                                            <label className="form-check-label" for="genderMale">Male</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="genderFemale"
                                                                value="Female" checked={bilgi.gender === "Female"} onChange={(e) => setGender(e.target.value)} />
                                                            <label className="form-check-label" for="genderFemale">Female</label>
                                                        </div>


                                                    </div>

                                                    <div className="col-sm-6">
                                                        <div className="row">
                                                            <label htmlFor="disability" className="disability"> Do you have any disability ?*</label>
                                                        </div>
                                                        <div className="form-check-inline">
                                                            <input className="form-check-input" type="radio" name="disab" id="disab_yes"
                                                                value="Yes"
                                                                checked={bilgi.disability === "Yes"}
                                                                onChange={(e) => setDisability(e.target.value)}
                                                                onClick={() => isExistDisability()} />
                                                            <label className="form-check-label" htmlFor="disab_yes">Yes</label>
                                                        </div>
                                                        <div className="form-check-inline">
                                                            <input className="form-check-input" type="radio" name="disab" id="disab_no"
                                                                value="No"
                                                                checked={bilgi.disability === "No"}
                                                                onChange={(e) => setDisability(e.target.value)}
                                                                onClick={() => isExistDisability()} />
                                                            <label className="form-check-label" htmlFor="disab_no">No</label>
                                                        </div>

                                                    </div>
                                                    <div className="form-group" id="describeDisability">
                                                        <label for="exampleFormControlTextarea1">Description of disability</label>
                                                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={bilgi.disabilityText}  ></textarea>
                                                        <br />

                                                    </div>
                                                </div>


                                                <button onClick={Ileri} class="btn btn-outline-primary" type="button"
                                                >Next</button>
                                            </div>

                                            <div style={{ display: DisplayKontrol(2) }}>
                                                <h4 className="mb-3">Contact</h4>
                                                <div className="row g-3" style={{ backgroundColor: "rgb(214, 88, 65)" }}>
                                                    <div className="col-12">
                                                        <label for="emailContact" className="form-label">Email*</label>
                                                        <input type="text" className="form-control" id="emailContact" value={bilgi.emailContact} />
                                                    </div>

                                                    <div className="col-12">
                                                        <label for="phone" className="form-label">Phone Number*</label>
                                                        <input type="number" className="form-control" id="phone" value={bilgi.phone} />
                                                    </div>

                                                    <div className="col-12">
                                                        <label for="address" className="form-label">Address</label>
                                                        <input type="text" className="form-control" id="address" value={bilgi.address} />
                                                    </div>

                                                    <div className="col-md-6">
                                                        <label for="country" className="form-label">Country*</label>
                                                        <select className="form-select" id="country" aria-label="Default select example"
                                                            value={bilgi.country}  >
                                                            <option value="">Choose...</option>
                                                            <option value="Turkey">Turkey</option>
                                                            <option value="Germany" >Germany</option>
                                                            <option value="Italy" >Italy</option>
                                                            <option value="CzechRepublic" >Czech Republic</option>
                                                            <option value="France" >France</option>
                                                            <option value="Spain" >Spain</option>
                                                            <option value="Greece" >Greece</option>
                                                            <option value="Lithuania" >Lithuania</option>
                                                            <option value="Poland" >Poland</option>
                                                            <option value="Croatia" >Croatia</option>
                                                        </select>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <label for="state" className="form-label">City*</label>
                                                        <select className="form-select" id="state"
                                                            value={bilgi.state}  >
                                                            <option value="">Choose...</option>
                                                            <option value="Istanbul">Istanbul</option>
                                                            <option value="Ankara">Ankara</option>
                                                            <option value="Izmir">Izmir</option>
                                                            <option value="Antalya">Antalya</option>
                                                            <option value="Munich">Munich</option>
                                                            <option value="Berlin">Berlin</option>
                                                            <option value="Hamburg">Hamburg</option>
                                                            <option value="Dresden">Dresden</option>
                                                            <option value="Frankfurt">Frankfurt</option>
                                                            <option value="Aachen">Aachen</option>
                                                            <option value="Rome">Rome</option>
                                                            <option value="Milan">Milan</option>
                                                            <option value="Florance">Florance</option>
                                                            <option value="Prague">Prague</option>
                                                            <option value="Paris">Paris</option>
                                                            <option value="Barcelona">Barcelona</option>
                                                            <option value="Athens">Athens</option>
                                                            <option value="Vilnius">Vilnius</option>
                                                            <option value="Warsaw">Warsaw</option>
                                                            <option value="Zagreb">Zagreb</option>
                                                        </select>
                                                        <div className="invalid-feedback">
                                                            Please provide a valid city.
                                                        </div>
                                                    </div>

                                                    <div className="col-md-8">
                                                        <label for="district" className="form-label">District</label>
                                                        <input type="text" className="form-control" id="district" value={bilgi.district} />
                                                    </div>

                                                    <div className="col-md-4">
                                                        <label for="zip" className="form-label">Zip*</label>
                                                        <input type="text" className="form-control" id="zip" value={bilgi.zip} />
                                                        <div className="invalid-feedback">
                                                            Zip code required.
                                                        </div>
                                                        <br />
                                                    </div>

                                                </div>

                                                <button onClick={Geri} class="btn btn-outline-primary" type="button"
                                                >Previous</button>
                                                <button onClick={Ileri} class="btn btn-outline-primary" type="button"
                                                >Next</button>
                                            </div>


                                            <div style={{ display: DisplayKontrol(3) }}>
                                                <h4 className="mb-3">Academic Information</h4>
                                                <div className="row g-3" style={{ backgroundColor: "rgb(224, 159, 60)" }}>

                                                    <div className="row gy-3" id="newEdu">

                                                        <div className="col-md-12">
                                                            <label for="university" className="form-label">University</label>
                                                            <select className="form-select" id="university" value={bilgi.university} >
                                                                <option>Choose...</option>
                                                                <option value="1">Istanbul Technical University</option>
                                                                <option value="2">Bogazici University</option>
                                                                <option value="3">Middle East Technical University</option>
                                                                <option value="4">Yıldız Technical University</option>
                                                                <option value="5">Koc University</option>
                                                                <option value="6">Sabancı University</option>
                                                                <option value="7">Ege University</option>
                                                                <option value="8">Akdeniz University</option>
                                                                <option value="9">Technical University of Munich</option>
                                                                <option value="10">Technical University of Berlin</option>
                                                                <option value="11">Hamburg University</option>
                                                                <option value="12">Dresden University of Technology</option>
                                                                <option value="13">Frankfurt University of Applied Sciences</option>
                                                                <option value="14">Aachen University of Applied Sciences</option>
                                                                <option value="15">Roma tre University</option>
                                                                <option value="16">Politecnico di Milano</option>
                                                                <option value="17">Florence University of the Arts</option>
                                                                <option value="18">National & Kapodistrian University of Athens</option>
                                                                <option value="19">Charles University</option>
                                                                <option value="20">University of Paris</option>
                                                                <option value="21">University of Barcelona</option>
                                                                <option value="22">Vilnius Gediminas Technical University</option>
                                                                <option value="23">Warsaw University of Technology</option>
                                                                <option value="24">Zagreb School of Economics and Management</option>

                                                            </select>

                                                            <div className="invalid-feedback">
                                                                Please select a valid university.
                                                            </div>
                                                        </div>

                                                        <div className="col-md-12">
                                                            <label for="department" className="form-label">Department</label>
                                                            <select className="form-select" id="department" value={bilgi.department}  >
                                                                <option>Choose...</option>
                                                                <option value="1">Architecture</option>
                                                                <option value="2">Chemical Engineering</option>
                                                                <option value="3">Civil Engineering</option>
                                                                <option value="4">Computer Engineering</option>
                                                                <option value="5">Economics</option>
                                                                <option value="6">Electrical Engineering</option>
                                                                <option value="7">Management Engineering</option>
                                                                <option value="8">Management Information System</option>
                                                                <option value="9">Mathematical Engineering</option>
                                                                <option value="10">Industrial Design</option>
                                                                <option value="11">Urban and Regional Planning</option>

                                                            </select>

                                                            <div className="invalid-feedback">
                                                                Please select a valid department.
                                                            </div>
                                                        </div>


                                                        <div className="col-md-6">
                                                            <label for="degree" className="form-label degree">Academic Degree </label>
                                                            <br />
                                                            <div className="form-check form-check-inline">
                                                                <input className="form-check-input" type="radio" name="degree" id="underGraduate"
                                                                    value="underGraduate" checked={bilgi.degree === "underGraduate"} />
                                                                <label className="form-check-label" for="stu">Bachelor </label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input className="form-check-input" type="radio" name="degree" id="master"
                                                                    value="master" checked={bilgi.degree === "master"} />
                                                                <label className="form-check-label" for="grad">Master</label>
                                                            </div>

                                                        </div>

                                                        <div className="col-md-6">
                                                            <label for="zip" className="form-label">GPA*</label>
                                                            <input type="float" className="form-control" id="gpa" value={bilgi.gpa} />
                                                        </div>

                                                        <div className="col-md-6">
                                                            <label for="gender" className="form-label statusOfGrad">Graduation Status</label>
                                                            <br />
                                                            <div className="form-check form-check-inline">
                                                                <input className="form-check-input" type="radio" name="statusOfGrad" id="stu"
                                                                    value="student" checked={bilgi.statusOfGrad === "student"} />
                                                                <label className="form-check-label" for="stu">Studying</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input className="form-check-input" type="radio" name="statusOfGrad" id="grad"
                                                                    value="graduated" checked={bilgi.statusOfGrad === "graduated"} />
                                                                <label className="form-check-label" for="grad">Graduate</label>
                                                            </div>

                                                        </div>

                                                        <div className="col-md-6">
                                                            <label for="gradDate" className="form-label">Graduation Date<span className="text-muted">(/
                                                                estimated)</span></label>

                                                            <div className="input-group">
                                                                <input className="form-control" id="gradDate" name="gradDate" type="text" value={bilgi.gradDate} />
                                                                <span className="input-group-append"></span>
                                                            </div>
                                                            <br />

                                                        </div>

                                                    </div>
                                                </div>


                                                <button onClick={Geri} class="btn btn-outline-primary" type="button"
                                                >Previous</button>
                                                <button onClick={Ileri} class="btn btn-outline-primary" type="button"
                                                >Next</button>
                                            </div>


                                            <div style={{ display: DisplayKontrol(4) }}>
                                                <h4 className="mb-3">Documents</h4>
                                                <div className="row g-3" >
                                                    <div className="col-6" >
                                                        <div className="mb-3" >
                                                            <label for="docCv" className="form-label">CV</label>
                                                            <p style={{ color: "#6079B8" }}>{bilgi.docDiploma}</p>
                                                        </div>
                                                        <div className="mb-3">
                                                            <label for="docLetterOfIntent" className="form-label">Letter of Intent</label>
                                                            <p style={{ color: "#6079B8" }}>{bilgi.docDiploma}</p>
                                                        </div>
                                                        <div className="mb-3">
                                                            <label for="docPassport" className="form-label">Passport</label>
                                                            <p style={{ color: "#6079B8" }}>{bilgi.docPassport}</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-6" >
                                                        <div className="mb-3">
                                                            <label for="docResidenceDocument" className="form-label">Residence Document</label>
                                                            <p style={{ color: "#6079B8" }}>{bilgi.docResidenceDocument}</p>
                                                        </div>
                                                        <div className="mb-3">
                                                            <label for="docDiploma" className="form-label">Diploma</label>
                                                            <p style={{ color: "#6079B8" }}>{bilgi.docDiploma}</p>
                                                        </div>
                                                        <div className="mb-3">
                                                            <label for="docCertificateEnglish" className="form-label">Certificate in English Proficiency</label>
                                                            <p style={{ color: "#6079B8" }}>{bilgi.docCertificateEnglish}</p>
                                                        </div>
                                                    </div>

                                                    <button onClick={Geri} class="btn btn-outline-primary" type="button"
                                                    >Previous</button>



                                                </div>

                                            </div>

                                        </form>


                                    </div>

                                </div>
                            </main>
                        </div>
                    </div>



                </div>

            </div>




        </>
    );
}




export default Forminfo;



