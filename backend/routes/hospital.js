const express = require('express');
const jwt = require('jsonwebtoken')
const {
    createJWT,
} = require("./../utils/auth");

const Hospital = require('../models/hospital');

const router = express.Router();

//save hospital
router.post('/hospitals/save', (req, res) => {
    let newHospital = new Hospital(req.body);
    newHospital.password = newHospital.generateHash(newHospital.password);
    newHospital.save((err) => {
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

//get hospitals
router.get('/hospitals', (req, res) => {
    Hospital.find().exec((err, hospitals) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }

        return res.status(200).json({
            success: true,
            existingHospitals: hospitals
        });
    });
});

//update hospital
router.put('/hospitals/update/:id', (req, res) => {
    Hospital.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        (err, hospital) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }

            return res.status(200).json({
                success: "Receiver updated successfully",hospital
            })
        }
    );
});

//update password
router.put('/hospital/password/update/:id', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null);
    Hospital.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        (err, hospital) => {
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

//delete hospital
router.delete('/hospitals/delete/:id',(req,res)=>{
    Hospital.findByIdAndRemove(req.params.id).exec((err,deleteHospital)=>{
        if(err){
            return res.status(400).json({
                message:"Delete Unsuccessful",err
            });
        }

        return res.status(200).json({
            message:"Hospital deleted successfully",deleteHospital
        });
    });
});

//get specific hospital
router.get('/hospital/:id',(req,res)=>{
    let hospitalId = req.params.id;
    Hospital.findById(hospitalId).exec((err,hospital)=>{
        if(err){
            return res.status(400).json({
                success:false, err
            });
        }

        return res.status(200).json({
            success:true,hospital
        })
    })
})

//login
router.post('/donor/login', (req, res) => {
    Hospital.findOne({ name: req.body.hospitalName }).then(user => {
        if (!user) {
            return res.status(200).json({
                messageUser: "Username not found"
            });
        }
        if (!user.validPassword(req.body.password)) {
            return res.status(200).json({
                messagePassword: "Password entered was incorrect"
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