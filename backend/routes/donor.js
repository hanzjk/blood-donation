const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken')
const {
    createJWT,
} = require("./../utils/auth");

const multer = require('multer');
const Donor = require('../models/donor');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './client/public/uploads/donor');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

//save donor
router.post('/donors/save', upload.single('img'), (req, res) => {
    let newDonor = new Donor(req.body);
    newDonor.img = req.file.originalname;
    newDonor.password = newDonor.generateHash(newDonor.password);
    newDonor.save((err) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json({
            success: "Donor saved successfully"
        });
    });
});

//get donors
router.get('/donors', (req, res) => {
    Donor.find().exec((err, donors) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }

        return res.status(200).json({
            success: true,
            existingDonors: donors
        });
    });
});

//update donor
router.put('/donors/update/:id', (req, res) => {
    Donor.findByIdAndUpdate(
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
                success: "Donor Updated Successfully", donor
            });
        }
    );

});

//update password
router.put('/donor/password/update/:id', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null);
    Donor.findByIdAndUpdate(
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
router.put('/donor/photo/update/:id', upload.single('img'), (req, res) => {
    req.body.img = req.file.originalname;
    Donor.findByIdAndUpdate(
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
                success: "Profile photo updated successfully", donor
            });
        }
    );

});

//delete donor
router.delete('/donors/delete/:id', (req, res) => {
    Donor.findByIdAndRemove(req.params.id).exec((err, deleteDonor) => {
        if (err) {
            return res.status(400).json({
                message: "Delete Unsuccessful", err
            });
        }

        return res.status(200).json({
            message: "Donor Deleted Successfully", deleteDonor
        });
    });
});

//get specific donor
router.get('/donor/:id', (req, res) => {
    let donorId = req.params.id;
    Donor.findById(donorId).exec((err, donor) => {
        if (err) {
            return res.status(400).json({
                success: false, err
            });
        }

        return res.status(200).json({
            success: true, donor
        })
    })
})

//login
router.post('/donor/login', (req, res) => {
    Donor.findOne({ email: req.body.userName }).then(user => {
        if (!user) {
            return res.status(200).json({
                message: "Entered user credentials are incorrect!"
            });
        }
        if (!user.validPassword(req.body.password)) {
            return res.status(200).json({
                message: "Entered user credentials are incorrect!"
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