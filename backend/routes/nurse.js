const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken')
const {
    createJWT,
} = require("./../utils/auth");

const Nurse = require('../models/nurse');

const router = express.Router();

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './client/public/uploads/nurse/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

//save nurse
router.post('/nurses/save', upload.single('img'), (req, res) => {
    let newNurse = new Nurse(req.body);
    newNurse.img = req.file.originalname;
    newNurse.password = newNurse.generateHash(newNurse.password);
    newNurse.save((err) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json({
            success: "Nurse saved successfully"
        });
    });
});

//get nurses
router.get('/nurses', (req, res) => {
    Nurse.find().exec((err, nurses) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }

        return res.status(200).json({
            success: true,
            existingNurses: nurses
        });
    });
});

//update nurse
router.put('/nurses/update/:id', (req, res) => {
    Nurse.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        (err, nurse) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }

            return res.status(200).json({
                success: "Nurse Updated Successfully", nurse
            });
        }
    );

});

//update password
router.put('/nurse/password/update/:id', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null);
    Nurse.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        (err, donor) => {
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

//update profile photo
router.put('/nurses/update/:id', upload.single('img'), (req, res) => {
    req.body.img = req.file.originalname;
    Nurse.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        (err, nurse) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }

            return res.status(200).json({
                success: "Profile photo updated successfully", nurse
            });
        }
    );

});

//delete nurse
router.delete('/nurses/delete/:id', (req, res) => {
    Nurse.findByIdAndRemove(req.params.id).exec((err, deleteNurse) => {
        if (err) {
            return res.status(400).json({
                message: "Delete Unsuccessful", err
            });
        }

        return res.status(200).json({
            message: "Donor Deleted Successfully", deleteNurse
        });
    });
});

//get specific nurse
router.get('/nurse/:id', (req, res) => {
    let nurseId = req.params.id;
    Nurse.findById(nurseId).exec((err, nurse) => {
        if (err) {
            return res.status(400).json({
                success: false, err
            });
        }

        return res.status(200).json({
            success: true, nurse
        })
    })
})

//login
router.post('/nurse/login', (req, res) => {
    Nurse.findOne({ email: req.body.userName }).then(user => {
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
                        isLogged: true,
                        message: user
                    });
                }
            });
        }
    })
});


module.exports = router;