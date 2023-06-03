const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodeprojectdb"
});

connection.connect((err) => {
    if (err) {
        console.error('Veritabanina baglanirken hata olustu: ', err);
        return;
    }
    console.log('Veritabanina baglanildi.');
});

app.post('/', (req, res) => {

    const { email, password } = req.body;

    const query = "SELECT * FROM user WHERE username=? AND password=?";

    connection.query(query, [email, password], (err, result) => {
        if (err) {
            console.error("Bilgilerin kontrolunde hata olustu. ", err);
            res.status(500).send({ error: 'Bilgilerin kontrolunde hata olustu.' });
            return;
        }
        if (result.length > 0) {
            const user_id = result[0].id_num;

            const isLoginQuery = "UPDATE user SET isLogin = 1 WHERE id_num=?";

            connection.query(isLoginQuery, user_id, (err, result) => {
                if (err) {
                    console.error("Login bilgisi guncellenirken hata olustu. ", err);
                    res.status(500).send({ error: 'Login guncellenemedi.' });
                }
            });

            res.status(200).send({ message: '1', id: user_id });
        } else {
            res.status(200).send({ message: '0' });
        }


    })

});


app.post('/Signup', (req, res) => {

    const { email, password } = req.body;

    const query = "INSERT INTO user (username,password) VALUE (?,?)";

    connection.query(query, [email, password], (err, result) => {

        if (err) {
            console.error("Veritabanina bilgi girereken hata: ", err);
            res.status(500).send({ error: "Kayit olusturulurken bir hata olustu." });
            return;
        }
        res.status(200).send({ message: "Kayit basarili!" });

    })

});


app.post('/Signout', (req, res) => {

    const { id } = req.body;

    const query = "UPDATE user SET isLogin = 0 WHERE id_num=?";

    connection.query(query, [id], (err, result) => {
        if (err) {
            console.error("isLogin guncellemesinde hata olustu. ", err);
            res.status(500).send({ error: 'isLogin guncellemesinde hata olustu.' });
            return;
        }

        res.status(200).send({ message: 'Kullanici cikisi guncellendi.' });
    });

});


app.post('/formGonder', async (req, res) => {

    const { id_num, firstName, lastName, idNo, date, nationality, nationality2, gender, disability, disabilityText,
        emailContact, phone, address, country, state, district, zip,
        university, department, degree, gpa, statusOfGrad, gradDate,
        docCv, docLetterOfIntent, docPassport, docResidenceDocument, docDiploma, docCertificateEnglish } = req.body;

    const kontrolQuery01 = "SELECT * FROM personalInfo WHERE id_num = ?";

    try {
        const result = await connection.query(kontrolQuery01, [id_num]);

        if (result.length > 0) {

            res.status(201).send({ error: "Aynı hesaptan yalnızca bir başvuru yapılabilir." });
            return;
            // const query01 = "UPDATE personalInfo SET (id_num, firstName, lastName, idNo, birthday, nationality, nationality2, gender, disability, disabilityText) WHERE (?,?,?,?,?,?,?,?,?,?)";

            // await connection.query(query01, [id_num, firstName, lastName, idNo, date, nationality, nationality2, gender, disability, disabilityText]);

            // const query02 = "UPDATE contact (id_num, emailContact, phone, address, country, state, district, zip) VALUES (?,?,?,?,?,?,?,?)";

            // await connection.query(query02, [id_num, emailContact, phone, address, country, state, district, zip]);

            // const query03 = "UPDATE academic (id_num, university, department, degree, gpa, statusOfGrad, gradDate) VALUES (?,?,?,?,?,?,?)";

            // await connection.query(query03, [id_num, university, department, degree, gpa, statusOfGrad, gradDate]);

            // const query04 = "UPDATE docs (id_num, docCv, docLetterOfIntent, docPassport, docResidenceDocument, docDiploma, docCertificateEnglish) VALUES (?,?,?,?,?,?,?)";

            // await connection.query(query04, [id_num, docCv, docLetterOfIntent, docPassport, docResidenceDocument, docDiploma, docCertificateEnglish]);

            // res.status(200).send({ message: "Başvuru başarıyla güncellendi." });


        } else {
            const query01 = "INSERT INTO personalInfo (id_num, firstName, lastName, idNo, birthday, nationality, nationality2, gender, disability, disabilityText) VALUES (?,?,?,?,?,?,?,?,?,?)";

            await connection.query(query01, [id_num, firstName, lastName, idNo, date, nationality, nationality2, gender, disability, disabilityText]);

            const query02 = "INSERT INTO contact (id_num, emailContact, phone, address, country, state, district, zip) VALUES (?,?,?,?,?,?,?,?)";

            await connection.query(query02, [id_num, emailContact, phone, address, country, state, district, zip]);

            const query03 = "INSERT INTO academic (id_num, university, department, degree, gpa, statusOfGrad, gradDate) VALUES (?,?,?,?,?,?,?)";

            await connection.query(query03, [id_num, university, department, degree, gpa, statusOfGrad, gradDate]);

            const query04 = "INSERT INTO docs (id_num, docCv, docLetterOfIntent, docPassport, docResidenceDocument, docDiploma, docCertificateEnglish) VALUES (?,?,?,?,?,?,?)";

            await connection.query(query04, [id_num, docCv, docLetterOfIntent, docPassport, docResidenceDocument, docDiploma, docCertificateEnglish]);

            res.status(200).send({ message: "Başvuru başarıyla kaydedildi." });
        }
    } catch (error) {
        console.error("Veritabanına ekleme yapılırken hata oluştu: ", error);
    }
});


app.post("/formGoster", async (req, res) => {

    const user_id = req.body.id;
    const query = "SELECT * FROM personalInfo INNER JOIN contact ON personalInfo.id_num = contact.id_num INNER JOIN academic ON personalInfo.id_num = academic.id_num INNER JOIN docs ON personalInfo.id_num = docs.id_num WHERE personalInfo.id_num = ?;"
    connection.query(query, [user_id], (err, result) => {
        if (err) {
            console.error("Veritabanindan bilgi alinirken hata olustu.", err);
            res.status(500).send({ error: "Veritabanindan bilgi alinirken hata olustu." });
            return;
        }
        if (result.length === 0) {
            res.status(404).send({ message: "Basvuru Bulunamadi." });
        } else {
            res.status(200).send({
                firstName: result[0].firstName,
                lastName: result[0].lastName,
                idNo: result[0].idNo,
                date: result[0].birthday,
                nationality: result[0].nationality,
                nationality2: result[0].nationality2,
                gender: result[0].gender,
                disability: result[0].disability,
                disabilityText: result[0].disabilityText,
                emailContact: result[0].emailContact,
                phone: result[0].phone,
                address: result[0].address,
                country: result[0].country,
                state: result[0].state,
                district: result[0].district,
                zip: result[0].zip,
                university: result[0].university,
                department: result[0].department,
                degree: result[0].degree,
                gpa: result[0].gpa,
                statusOfGrad: result[0].statusOfGrad,
                gradDate: result[0].gradDate,
                docCv: result[0].docCv,
                docLetterOfIntent: result[0].docLetterOfIntent,
                docPassport: result[0].docPassport,
                docResidenceDocument: result[0].docResidenceDocument,
                docDiploma: result[0].docDiploma,
                docCertificateEnglish: result[0].docCertificateEnglish
            });

        }
    });
});


app.post('/formGuncelle', async (req, res) => {

    const { id_num,
        firstName_u,
        lastName_u,
        idNo_u,
        date_u,
        nationality_u,
        nationality2_u,
        gender_u,
        disability_u,
        disabilityText_u,
        emailContact_u,
        phone_u,
        address_u,
        country_u,
        state_u,
        district_u,
        zip_u,
        university_u,
        department_u,
        degree_u,
        gpa_u,
        statusOfGrad_u,
        gradDate_u,
        docCv_u,
        docLetterOfIntent_u,
        docPassport_u,
        docResidenceDocument_u,
        docDiploma_u,
        docCertificateEnglish_u } = req.body;

    const kontrolQuery01 = "SELECT * FROM personalInfo WHERE id_num = ?";
    const result = await connection.query(kontrolQuery01, [id_num]);
    console.log("result " + result.length);
    //const result = await connection.query(kontrolQuery01, [id_num], (err, result) => {


    const query01 = "UPDATE personalInfo SET firstName=?, lastName=?, idNo=?, birthday=?, nationality=?, nationality2=?, gender=?, disability=?, disabilityText=? WHERE id_num=?";

    await connection.query(query01, [firstName_u, lastName_u, idNo_u, date_u, nationality_u, nationality2_u, gender_u, disability_u, disabilityText_u, id_num]);

    const query02 = "UPDATE contact SET emailContact=?, phone=?, address=?, country=?, state=?, district=?, zip=? WHERE id_num=?";

    await connection.query(query02, [emailContact_u, phone_u, address_u, country_u, state_u, district_u, zip_u, id_num]);

    const query03 = "UPDATE academic SET university=?, department=?, degree=?, gpa=?, statusOfGrad=?, gradDate=? WHERE id_num=?";

    await connection.query(query03, [university_u, department_u, degree_u, gpa_u, statusOfGrad_u, gradDate_u, id_num]);

    const query04 = "UPDATE docs SET docCv=?, docLetterOfIntent=?, docPassport=?, docResidenceDocument=?, docDiploma=?, docCertificateEnglish=? WHERE id_num=?";

    await connection.query(query04, [docCv_u, docLetterOfIntent_u, docPassport_u, docResidenceDocument_u, docDiploma_u, docCertificateEnglish_u, id_num]);

    res.status(200).send({ message: "Başvuru başarıyla güncellendi." });
    return;


});


app.post("/sifreKontrol", async (req, res) => {

    const { email, password } = req.body;

    const query = "SELECT * FROM user WHERE username=? AND password=?";

    connection.query(query, [email, password], (err, result) => {
        if (err) {
            console.error("Bilgilerin kontrolunde hata olustu. ", err);
            res.status(500).send({ error: 'Bilgilerin kontrolunde hata olustu.' });
            return;
        }
        if (result.length > 0) {
            res.status(200).send({ message: '1' });
        } else {
            res.status(200).send({ message: '0' });
        }


    })

});


app.post("/sifreGuncelle", async (req, res) => {

    const { id_num, passwordNew } = req.body;

    const query = "UPDATE user SET password=? WHERE id_num=?";

    await connection.query(query, [passwordNew, id_num]);


    res.status(200).send({ message: "Sifre güncellendi." });
    return;


});



const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});











