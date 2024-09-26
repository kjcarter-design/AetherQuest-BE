const express = require('express');
const generateUploadURL = require('../utils/s3Upload');
const router = express.Router();

router.get('/generate-upload-url', async (req, res) => {
    const fileType = req.query.fileType || 'image/jpeg'; 
    console.log(fileType)
    try {
        const url = await generateUploadURL(fileType);
        res.json({ uploadURL: url });
        console.log(res)
    } catch (error) {
        res.status(500).json({ error: 'Error generating signed URL' });
    }
});


module.exports = router;
