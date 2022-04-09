const express = require('express');
const jwt = require('jsonwebtoken')
const {
    createJWT,
} = require("./../utils/auth");

const Patients = require('../models/patient');

const router = express.Router();

//save patient
router.post('/patients/save', (req, res) => {
    let newPatient = new Patients(req.body);
    newPatient.password = newPatient.generateHash(newPatient.password);
    newPatient.save((err) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json({
            success: "Receiver saved successfully"
        });
    });
});

//get patients
router.get('/patients', (req, res) => {
    Patients.find().exec((err, patients) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }

        return res.status(200).json({
            success: true,
            existingPatients: patients
        });
    });
});

//update patient
router.put('/patients/update/:id', (req, res) => {
    Patients.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        (err, patient) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }

            return res.status(200).json({
                success: "Receiver updated successfully",patient
            })
        }
    );
});

//update password
router.put('/patient/password/update/:id', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null);
    Patients.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        (err, patient) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            return res.status(200).json({
                success: "Password updated successfully",
            });
        }
    );
});

//delete patient
router.delete('/patients/delete/:id',(req,res)=>{
    Patients.findByIdAndRemove(req.params.id).exec((err,deletePatient)=>{
        if(err){
            return res.status(400).json({
                message:"Delete Unsuccessful",err
            });
        }

        return res.status(200).json({
            message:"Patient deleted successfully",deletePatient
        });
    });
});

//get specific patient
router.get('/patient/:id',(req,res)=>{
    let patientId = req.params.id;
    Patients.findById(patientId).exec((err,patient)=>{
        if(err){
            return res.status(400).json({
                success:false, err
            });
        }

        return res.status(200).json({
            success:true,patient
        })
    })
})

//login
router.post('/patient/login', (req, res) => {
    Patients.findOne({ name: req.body.userName }).then(user => {
        if (!user) {
            return res.status(200).json({
                messageUser: "Entered user credentials are incorrect!"
            });
        }
        if (!user.validPassword(req.body.password)) {
            return res.status(200).json({
                messagePassword: "Entered user credentials are incorrect!"
            });
        }
        else {
            let accessToken = createJWT(
                user.email,
                user._id,
                3600
            )
            jwt.verify(accessToken, process.env.TOKEN_SECRET, (err,
                decoded) => {
                if (err) {
                    res.status(500).json({ erros: err });
                }
                if (decoded) {
                    return res.status(200).json({
                        success: true,
                        token: accessToken,
                        message: user
                    });
                }
            });
        }
    })
});

module.exports = router;