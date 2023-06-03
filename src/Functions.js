import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Navigate } from 'react-router-dom';
import React from 'react';
import { useNavigate } from 'react-router-dom';

//FORM BILGILERI KAYDET

// export const formInfo = () => {

//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [idNo, setIdNo] = useState('');
//     const [date, setDate] = useState('');
//     const [nationality, setNationality] = useState('');
//     const [nationality2, setNationality2] = useState('');
//     const [gender, setGender] = useState('');
//     const [disability, setDisability] = useState('');
//     const [disabilityText, setDisabilityText] = useState('');


//     const [emailContact, setEmailContact] = useState('');
//     const [phone, setPhone] = useState('');
//     const [address, setAddress] = useState('');
//     const [country, setCountry] = useState('');
//     const [state, setState] = useState('');
//     const [district, setDistrict] = useState('');
//     const [zip, setZip] = useState('');


//     const [university, setUniversity] = useState('');
//     const [department, setDepartment] = useState('');
//     const [degree, setDegree] = useState('');
//     const [gpa, setGpa] = useState('');
//     const [statusOfGrad, setStatusOfGrad] = useState('');
//     const [gradDate, setGradDate] = useState('');


//     const [docCv, setDocCv] = useState('');
//     const [docLetterOfIntent, setDocLetterOfIntent] = useState('');
//     const [docPassport, setDocPassport] = useState('');
//     const [docResidenceDocument, setDocResidenceDocument] = useState('');
//     const [docDiploma, setDocDiploma] = useState('');
//     const [docCertificateEnglish, setDocCertificateEnglish] = useState('');


//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if (password != passRepeat) {
//             setError("Sifreler eslesmiyor!");
//             return;
//         }

//         sessionStorage.setItem('email', email);
//         sessionStorage.setItem('password', password);

//         setEmail('');
//         setPassword('');
//         setPassRepeat('');
//         setSuccess('Kayit oluşturuldu. Giris yapabilirsiniz.');
//         setError('');

//     }
// }

// export const gonder = () => {

//     var name = document.getElementById("inputName").value;
//     var mail = document.getElementById("inputMail").value;
//     var egitim = document.getElementById("egitim").value;
//     var dogum = document.getElementById("dogum").value;

//     var user_info = [name, mail, egitim, dogum];

//     sessionStorage.setItem("user_info", user_info);

//     alert("Bilgileriniz gönderilmiştir.");
// }




