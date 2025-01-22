const QRCode = require('qrcode');
const models = require('../models')

exports.goWebsite = function(req, res, next) {
    console.log(req.args, req.params)
    return models.Urls.findOne({
        where: {
            shortened: req.params.shortened
        }
    }).then(result => {
        res.status(302).redirect(result.original)
    })
}

exports.createNew = function(req, res, next) {
    const baseUrl = req.protocol + '://' + req.get('host');

    let qrUrl = baseUrl + "/qr/"

    models.Urls.findOne({
        where: {
            original: req.body.url
        }
    }).then(result => {
        if(result){
            let url = `${baseUrl}/${result.shortened}`
            res.json({
                success: true,
                message: 'URL shortened successfully',
                data: {
                    original: req.body.url,
                    shortened: url,
                    qrCode: qrUrl + result.shortened,
                }
            });
        } else {
            const randomString = getRandom(5);
            return models.Urls.create({
                original: req.body.url,
                shortened: randomString
            }).then(result => {
                let url = `${baseUrl}/${result.shortened}`
                // Returning the response as a JSON object
                return res.status(201).json({
                    success: true,
                    message: 'URL shortened successfully',
                    data: {
                        original: req.body.url,
                        shortened: url,
                        qrCode: qrUrl + result.shortened,
                    }
                });
            })
        }
    })
}

exports.getUrls = function(req, res, next) {
    return models.Urls.findAll().then(result => {
        return res.status(200).json({
            success: true,
            size: result.length,
            data: result.map(item => {
                const baseUrl = req.protocol + '://' + req.get('host')
                return {
                    originalUrl: item.original,
                    shortenedUrl: `${baseUrl}/${item.shortened}`,
                    createdAt: item.createdAt,
                    qrCode: `${baseUrl}/qr/${item.shortened}`
                }
            })
        });
    })
}

exports.getQrCode = function(req, res, next) {
    // Construct the full URL
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

    // Find the corresponding shortened URL from the database
    models.Urls.findOne({
        where: {
            shortened: req.params.shortened
        }
    }).then(result => {
        if (!result) {
            // If no result is found, return 404
            return res.status(404).json({ success: false, message: 'Shortened URL not found' });
        }

        // Generate QR code buffer from the full URL
        QRCode.toBuffer(fullUrl, { type: 'jpg' }, (err, buffer) => {
            if (err) {
                // If there is an error generating the QR code, return 500
                return res.status(500).json({ success: false, message: 'Error generating QR code', error: err.message });
            }

            // Set the appropriate header for the image
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });

            // Send the QR code image buffer as the response
            res.end(buffer);
        });
    }).catch(error => {
        // Handle any database errors
        console.error('Error finding shortened URL:', error);
        return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    });
}

function getRandom(length) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        result += charset[randomIndex];
    }
    console.log('t', result)
    return result;
}
