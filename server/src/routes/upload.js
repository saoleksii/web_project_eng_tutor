const express = require('express')
const router = express.Router()
const upload = require('../middleware/upload')
const verify_token = require('../middleware/verify_token')

router.post('/upload', verify_token, upload.single('photo'), (req, res) => {
    if (!req.file) return res.status(400).send('No file uploaded.')
    const photo_url = `http://localhost:8000/uploads/${req.file.filename}`
    res.json({ photo_url })
});

module.exports = router