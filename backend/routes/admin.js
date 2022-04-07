const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken')
const {
    createJWT,
} = require("./../utils/auth");
const multer = require('multer');

const Admin = require('../models/admin');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './client/public/uploads/admin/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

//save admin
router.post('/admins/save', upload.single('img'), (req, res) => {
    let newAdmin = new Admin(req.body);
    newAdmin.img = req.file.originalname;
    newAdmin.password = newAdmin.generateHash(newAdmin.password);
    newAdmin.save((err) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json({
            success: "Admin saved successfully"
        });
    });
});

//get admins
router.get('/admins', (req, res) => {
    Admin.find().exec((err, admins) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }

        return res.status(200).json({
            success: true,
            existingAdmins: admins
        });
    });
});

//update admin
router.put('/admins/update/:id', (req, res) => {
    Admin.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        (err, admin) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }

            return res.status(200).json({
                success: "Admin Updated Successfully", admin
            });
        }
    );

});

//update password
router.put('/admin/password/update/:id', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null);
    Admin.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        (err, admin) => {
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
router.put('/admins/update/:id', upload.single('img'), (req, res) => {
    req.body.img = req.file.originalname;
    Admin.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        (err, admin) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }

            return res.status(200).json({
                success: "Profile photo updated successfully", admin
            });
        }
    );

});

//delete admin
router.delete('/admins/delete/:id', (req, res) => {
    Admin.findByIdAndRemove(req.params.id).exec((err, deleteAdmin) => {
        if (err) {
            return res.status(400).json({
                message: "Delete Unsuccessful", err
            });
        }

        return res.status(200).json({
            message: "Admin Deleted Successfully", deleteAdmin
        });
    });
});

//get specific admin
router.get('/admin/:id', (req, res) => {
    let adminId = req.params.id;
    Admin.findById(adminId).exec((err, admin) => {
        if (err) {
            return res.status(400).json({
                success: false, err
            });
        }

        return res.status(200).json({
            success: true, admin
        })
    })
})

//get specific admin dashboard
router.get('/admin/dashboard/:id', (req, res) => {
    let postId = req.params.id;
    Admin.findById(postId).exec((err, admin) => {
        if (err) {
            return res.status(400).json({
                success: false, err
            });
        }

        return res.status(200).json({
            success: true, admin
        })
    })
});

//get specific admin header
router.get('/admin/header/:id', (req, res) => {
    let postId = req.params.id;
    Admin.findById(postId).exec((err, admin) => {
        if (err) {
            return res.status(400).json({
                success: false, err
            });
        }

        return res.status(200).json({
            success: true, admin
        })
    })
});

//login
router.post('/admin/login', (req, res) => {
    Admin.findOne({ name: req.body.userName }).then(user => {
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
                        isLogged: true,
                        message: user
                    });
                }
            });
        }
    })
});


module.exports = router;