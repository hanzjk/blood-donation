const express = require('express');
const MediInfoDonor = require('../models/mediInfoDonor');

const router = express.Router();

//save info
router.post('/mediInfoDonor/save', (req, res) => {
    let newInfo = new MediInfoDonor(req.body);
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
router.get('/mediInfoDonors', (req, res) => {
    MediInfoDonor.find().exec((err, info) => {
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
// router.put('/mediInfoDonor/update/:id', (req, res) => {
//     MediInfoDonor.findByIdAndUpdate(
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
router.delete('/mediInfoDonor/delete/:id',(req,res)=>{
    MediInfoDonor.findByIdAndRemove(req.params.id).exec((err,deleteInfo)=>{
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
router.get('/mediInfoDonor/:id',(req,res)=>{
    let infoId = req.params.id;
    MediInfoDonor.findById(infoId).exec((err,info)=>{
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