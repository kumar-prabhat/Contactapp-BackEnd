const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');

const {sendSms} = require('../../service/messageService')

router.post(
  '/',
  [
    check('message', 'Please enter a valid message').not().isEmpty(),
    check('mobile', 'Please enter valid mobile number').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success:false, errors: errors.array() });
    }

    const { message, mobile } = req.body;

    try {
        await sendSms(message,mobile)
        return res.status(200).json({success:true, message:'Message sent successfully!'})
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ success:false, errors:['Server error']});
    }
  }
);

module.exports = router;
