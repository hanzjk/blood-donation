const express = require('express');
const BloodTypes = require('../models/bloodTypes');

const router = express.Router();

//save Stock
router.post('/bloodTypes/save', (req, res) => {
    let newStock = new BloodTypes(req.body);
    newStock.save((err) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json({
            success: "Stock saved successfully"
        });
    });
});

//get stock
router.get('/bloodTypes/:id', (req, res) => {
    let stockId = req.params.id;
    BloodTypes.findById(stockId).exec((err, stock) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }

        return res.status(200).json({
            success: true, stock
        });
    });
});

//update A+
router.put('/bloodTypes/update/:id', (req, res) => {
    BloodTypes.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        (err) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            return res.status(200).json({
                success: "Stock updated successfully",
            });
        }
    );
});

//delete info
router.delete('/bloodTypes/delete/:id',(req,res)=>{
    BloodTypes.findByIdAndRemove(req.params.id).exec((err,deleteInfo)=>{
        if(err){
            return res.status(400).json({
                message:"Delete Unsuccessful",err
            });
        }

        return res.status(200).json({
            message:"Stock cleared successfully",deleteInfo
        });
    });
});

module.exports = router;