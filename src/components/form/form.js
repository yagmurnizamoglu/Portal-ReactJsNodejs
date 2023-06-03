import React from 'react'
import { useState } from 'react';
import Sidebar from "../../scenes/global/sidebar/Sidebar";
import Topbar from "../../scenes/global/topbar/Topbar";
import { formInfo } from '../../Functions';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import axios from 'axios';

function Form(props) {


    //GİRİŞ YAPMADAN SAYFA YOLU DEĞİŞTİREREK SAYFAYA GİRİŞ YAPILAMASIN
    var navigate = useNavigate();
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

    //BAŞVURU YAPILDI MI YAPILMADI MI SESSIONDA TUT    
    var isApplicationCompleted = false; // Başlangıçta false olarak ayarlanmış
    <form btn_deger="Gönder" />

    // Başvuru formu işlendiğinde isApplicationCompleted değerini true olarak güncelle
    const handleForm = () => {

        if (isApplicationCompleted == "true") {
            <form btn_deger="Guncelle" />
        }
        else if (isApplicationCompleted == "false") {
            <form btn_deger="Gönder" />
        }
    }

    //FORM BILGILERI KAYDET
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [idNo, setIdNo] = useState('');
    const [date, setDate] = useState('');
    const [nationality, setNationality] = useState('');
    const [nationality2, setNationality2] = useState('');
    const [gender, setGender] = useState('');
    const [disability, setDisability] = useState('');
    const [disabilityText, setDisabilityText] = useState('');

    const [emailContact, setEmailContact] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [district, setDistrict] = useState('');
    const [zip, setZip] = useState('');


    const [university, setUniversity] = useState('');
    const [department, setDepartment] = useState('');
    const [degree, setDegree] = useState('');
    const [gpa, setGpa] = useState('');
    const [statusOfGrad, setStatusOfGrad] = useState('');
    const [gradDate, setGradDate] = useState('');


    const [docCv, setDocCv] = useState('');
    const [docLetterOfIntent, setDocLetterOfIntent] = useState('');
    const [docPassport, setDocPassport] = useState('');
    const [docResidenceDocument, setDocResidenceDocument] = useState('');
    const [docDiploma, setDocDiploma] = useState('');
    const [docCertificateEnglish, setDocCertificateEnglish] = useState('');


    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const id_num = sessionStorage.getItem('id_num');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post("http://localhost:3003/formGonder", {
                id_num,
                firstName,
                lastName,
                idNo,
                date,
                nationality,
                nationality2,
                gender,
                disability,
                disabilityText,
                emailContact,
                phone,
                address,
                country,
                state,
                district,
                zip,
                university,
                department,
                degree,
                gpa,
                statusOfGrad,
                gradDate,
                docCv,
                docLetterOfIntent,
                docPassport,
                docResidenceDocument,
                docDiploma,
                docCertificateEnglish
            }
            );
            console.log(response);
            if (response.status === 200) {
                setSuccess("Basvuru basarili sekilde alindi.");
                setFirstName('');
                setLastName('');
                setIdNo('');
                setDate('');
                setNationality('');
                setNationality2('');
                setGender('');
                setDisability('');
                setDisabilityText('');
                setEmailContact('');
                setPhone('');
                setAddress('');
                setCountry('');
                setState('');
                setDistrict('');
                setZip('');
                setUniversity('');
                setDepartment('');
                setDegree('');
                setGpa('');
                setStatusOfGrad('');
                setGradDate('');
                setDocCv('');
                setDocLetterOfIntent('');
                setDocPassport('');
                setDocResidenceDocument('');
                setDocDiploma('');
                setDocCertificateEnglish('');
                isApplicationCompleted = true
                sessionStorage.setItem('isApplicationCompleted', isApplicationCompleted);
            } else {
                setError(response.data.error);
            }


        } catch (err) {
            console.log(err);
            setError("Veritabani baglantisinda hata olustu. ", err);
        }

    }



    return (
        <>

            <div className="Portal">
                <div className="PortalGlass">
                    <div className='row'>

                        <div className='col-2 '>
                            <Sidebar form_active="active" form_disabled="disabled" gor_to="/Portal/forminfo" hesap_to="/Portal/hesap" update_to="/Portal/formupdate" />
                        </div>

                        <div className='col-10 '>
                            <main className='content'>
                                <Topbar />
                                <div className="row mt-5">

                                    <div className="col-3">

                                    </div>

                                    <div className="col-6 pd-10px">



                                        <form className="needs-validation" onSubmit={handleSubmit}>
                                            <div style={{ display: DisplayKontrol(1) }}>
                                                <h4 className="mb-3">Personal Details</h4>
                                                <div className="row g-3" style={{ backgroundColor: "rgb(105, 138, 163)" }}>
                                                    <div className="col-sm-6">
                                                        <label for="firstName" className="form-label">First name*</label>
                                                        <input type="text" className="form-control personalValid" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                                                        <div className="invalid-feedback" style={{ display: "none" }} id="firstNameError">
                                                            Valid first name is required.
                                                        </div>

                                                    </div>

                                                    <div className="col-sm-6">
                                                        <label for="lastName" className="form-label">Last name*</label>
                                                        <input type="text" className="form-control personalValid" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                                                        <div className="invalid-feedback" style={{ display: "none" }} id="lastNameError">
                                                            Valid last name is required.
                                                        </div>

                                                    </div>

                                                    <div className="col-12">
                                                        <label for="idNo" className="form-label">ID No*</label>

                                                        <input type="number" className="form-control personalValid" id="idNo" value={idNo} onChange={(e) => setIdNo(e.target.value)} required />
                                                        <div className="invalid-feedback" style={{ display: "none" }} id="idError">
                                                            Valid ID No is required.
                                                        </div>


                                                    </div>

                                                    <div className="col-12">
                                                        <label for="birthday" className="form-label">Birthday*</label>

                                                        <div className="input-group">
                                                            <input className="form-control" id="date" name="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                                                            <span className="input-group-append"></span>
                                                        </div>

                                                    </div>

                                                    <div className="col-sm-6">
                                                        <label for="firstName" className="form-label">Nationality*</label>
                                                        <input type="text" className="form-control" id="nationality" value={nationality} onChange={(e) => setNationality(e.target.value)} required />
                                                        <div className="invalid-feedback">
                                                            Nationality is required.
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-6">
                                                        <label for="lastName" className="form-label">Nationality 2 <span
                                                            className="text-muted">(Optional)</span></label>
                                                        <input type="text" className="form-control" id="nationality2" value={nationality2} onChange={(e) => setNationality2(e.target.value)} />
                                                    </div>


                                                    <div className="col-sm-6">
                                                        <label for="gender" className="form-label gender">Gender in Identity</label>
                                                        <div>
                                                            <div className="form-check form-check-inline">
                                                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="genderMale"
                                                                    value="Male" checked={gender === "Male"} onChange={(e) => setGender(e.target.value)} />
                                                                <label className="form-check-label" for="genderMale">Male</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="genderFemale"
                                                                    value="Female" checked={gender === "Female"} onChange={(e) => setGender(e.target.value)} />
                                                                <label className="form-check-label" for="genderFemale">Female</label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-6">
                                                        <div className='row'>
                                                            <label for="disability" className="form-label disability">Do you have any disability?</label>
                                                        </div>

                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input disab" type="radio" name="disab" id="disab_yes"
                                                                value="Yes"
                                                                checked={disability === "Yes"}
                                                                onChange={(e) => setDisability(e.target.value)}
                                                                onClick={() => isExistDisability()} />
                                                            <label className="form-check-label" for="disab_yes">Yes</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input disab" type="radio" name="disab" id="disab_no"
                                                                value="No"
                                                                checked={disability === "No"}
                                                                onChange={(e) => setDisability(e.target.value)}
                                                                onClick={() => isExistDisability()} />
                                                            <label className="form-check-label" for="disab_no">No</label>
                                                        </div>

                                                    </div>
                                                    <div className="form-group" id="describeDisability" style={{ display: "none" }}>
                                                        <label for="exampleFormControlTextarea1">Describe your disability</label>
                                                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={disabilityText} onChange={(e) => setDisabilityText(e.target.value)}></textarea>
                                                        <br />

                                                    </div>
                                                </div>


                                                <button onClick={Ileri} class="btn btn-outline-primary" type="button">Next</button>
                                            </div>

                                            <div style={{ display: DisplayKontrol(2) }}>
                                                <h4 className="mb-3">Contact</h4>
                                                <div className="row g-3" style={{ backgroundColor: "rgb(214, 88, 65)" }}>
                                                    <div className="col-12">
                                                        <label for="emailContact" className="form-label">Email*</label>
                                                        <input type="email" className="form-control" id="emailContact" placeholder="you@example.com" value={emailContact} onChange={(e) => setEmailContact(e.target.value)} required />
                                                        <div className="invalid-feedback">
                                                            Please enter a valid email address for shipping updates.
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <label for="phone" className="form-label">Phone Number*</label>
                                                        <input type="number" className="form-control" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                                                        <div className="invalid-feedback">
                                                            Please enter a valid phone number for shipping updates.
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <label for="address" className="form-label">Address</label>
                                                        <input type="text" className="form-control" id="address" placeholder="1234 Main St" value={address} onChange={(e) => setAddress(e.target.value)} required />
                                                        <div className="invalid-feedback">
                                                            Please enter your shipping address.
                                                        </div>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <label for="country" className="form-label">Country*</label>
                                                        <select className="form-select" id="country" aria-label="Default select example"
                                                            onChange={(e) => setCountry(e.target.value)} required>
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
                                                            onChange={(e) => setState(e.target.value)} required>
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
                                                        <input type="text" className="form-control" id="district" value={district} onChange={(e) => setDistrict(e.target.value)} required />
                                                    </div>

                                                    <div className="col-md-4">
                                                        <label for="zip" className="form-label">Zip*</label>
                                                        <input type="text" className="form-control" id="zip" value={zip} onChange={(e) => setZip(e.target.value)} required />
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
                                                            <select className="form-select" id="university" onChange={(e) => setUniversity(e.target.value)} required>
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
                                                            <select className="form-select" id="department" onChange={(e) => setDepartment(e.target.value)}>
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
                                                                    value="underGraduate" checked={degree === "underGraduate"} onChange={(e) => setDegree(e.target.value)} />
                                                                <label className="form-check-label" for="stu">Bachelor </label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input className="form-check-input" type="radio" name="degree" id="master"
                                                                    value="master" checked={degree === "master"} onChange={(e) => setDegree(e.target.value)} />
                                                                <label className="form-check-label" for="grad">Master</label>
                                                            </div>

                                                        </div>

                                                        <div className="col-md-6">
                                                            <label for="zip" className="form-label">GPA*</label>
                                                            <input type="number" className="form-control" id="gpa" value={gpa} onChange={(e) => setGpa(e.target.value)} required />
                                                            <div className="invalid-feedback">
                                                                GPA required.
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <label for="gender" className="form-label statusOfGrad">Graduation Status</label>
                                                            <br />
                                                            <div className="form-check form-check-inline">
                                                                <input className="form-check-input" type="radio" name="statusOfGrad" id="stu"
                                                                    value="student" checked={statusOfGrad === "student"} onChange={(e) => setStatusOfGrad(e.target.value)} />
                                                                <label className="form-check-label" for="stu">Studying</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input className="form-check-input" type="radio" name="statusOfGrad" id="grad"
                                                                    value="graduated" checked={statusOfGrad === "graduated"} onChange={(e) => setStatusOfGrad(e.target.value)} />
                                                                <label className="form-check-label" for="grad">Graduate</label>
                                                            </div>

                                                        </div>

                                                        <div className="col-md-6">
                                                            <label for="gradDate" className="form-label">Graduation Date<span className="text-muted">(/
                                                                estimated)</span></label>

                                                            <div className="input-group">
                                                                <input className="form-control" id="gradDate" name="gradDate" type="date" value={gradDate} onChange={(e) => setGradDate(e.target.value)} />
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
                                                    <div className='col-6'>
                                                        <div className="mb-3" >
                                                            <label for="docCv" className="form-label">CV</label>
                                                            <input className="form-control" type="file" id="docCv" value={docCv} onChange={(e) => setDocCv(e.target.value)} required />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label for="docLetterOfIntent" className="form-label">Letter of Intent</label>
                                                            <input className="form-control" type="file" id="docLetterOfIntent" value={docLetterOfIntent} onChange={(e) => setDocLetterOfIntent(e.target.value)} required />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label for="docPassport" className="form-label">Passport</label>
                                                            <input className="form-control" type="file" id="docPassport" value={docPassport} onChange={(e) => setDocPassport(e.target.value)} required />
                                                        </div>
                                                    </div>
                                                    <div className='col-6'>
                                                        <div className="mb-3">
                                                            <label for="docResidenceDocument" className="form-label">Residence Document</label>
                                                            <input className="form-control" type="file" id="docResidenceDocument" value={docResidenceDocument} onChange={(e) => setDocResidenceDocument(e.target.value)} required />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label for="docDiploma" className="form-label">Diploma</label>
                                                            <input className="form-control" type="file" id="docDiploma" value={docDiploma} onChange={(e) => setDocDiploma(e.target.value)} required />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label for="docCertificateEnglish" className="form-label">Certificate in English Proficiency</label>
                                                            <input className="form-control" type="file" id="docCertificateEnglish" value={docCertificateEnglish} onChange={(e) => setDocCertificateEnglish(e.target.value)} required />
                                                        </div>
                                                    </div>

                                                </div>


                                                <div className="row g-3">
                                                    <div className="col-6">
                                                        <input className="w-100 btn btn-primary btn-lg" type="submit" value="Send" onClick={handleForm} />
                                                    </div>
                                                    <div className="col-6">
                                                        <input style={{ backgroundColor: "rgb(214, 88, 65)" }} value="Reset" className="w-100 btn btn-primary btn-lg"
                                                            type="reset" />
                                                    </div>

                                                    {error && <p style={{ color: 'red' }}> {error} </p>}
                                                    {success && <p style={{ color: 'green' }}> {success} </p>}


                                                    <button onClick={Geri} class="btn btn-outline-primary" type="button"
                                                    >Previous</button>
                                                    <button onClick={Ileri} class="btn btn-outline-primary" type="button"
                                                    >Next</button>
                                                </div>


                                            </div>




                                        </form>






                                    </div>

                                    <div className="col-4">

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


export default Form;