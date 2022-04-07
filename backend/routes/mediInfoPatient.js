const express = require('express');
const MediInfoPatient = require('../models/mediInfoPatient');

const router = express.Router();

//save info
router.post('/mediInfoPatient/save', (req, res) => {
    let newInfo = new MediInfoPatient(req.body);
    newInfo.save((err) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json({
            success: "Information saved successfully"
        });
    });
});

//get info
router.get('/mediInfoPatients', (req, res) => {
    MediInfoPatient.find().exec((err, info) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }

        return res.status(200).json({
            success: true,
            existingInfo: info
        });
    });
});

//update info
// router.put('/mediInfoPatient/update/:id', (req, res) => {
//     MediInfoPatient.findByIdAndUpdate(
//         req.params.id,
//         {
//             $set: req.body
//         },
//         (err, info) => {
//             if (err) {
//                 return res.status(400).json({
//                     error: err
//                 });
//             }

//             return res.status(200).json({
//                 success: "Information updated successfully",info
//             })
//         }
//     );
// });

//delete info
router.delete('/mediInfoPatient/delete/:id',(req,res)=>{
    MediInfoPatient.findByIdAndRemove(req.params.id).exec((err,deleteInfo)=>{
        if(err){
            return res.status(400).json({
                message:"Delete Unsuccessful",err
            });
        }

        return res.status(200).json({
            message:"Information deleted successfully",deleteInfo
        });
    });
});

//get specific information
router.get('/mediInfoPatient/:id',(req,res)=>{
    let infoId = req.params.id;
    MediInfoPatient.findById(infoId).exec((err,info)=>{
        if(err){
            return res.status(400).json({
                success:false, err
            });
        }

        return res.status(200).json({
            success:true,info
        })
    })
})

module.exports = router;