const models = require('../models')

exports.go_website = function(req, res, next) {
    console.log(req.args, req.params)
    return models.Urls.findOne({
        where: {
            shortened: req.params.shortened
        }
    }).then(result => {
        res.redirect(result.original)
    })

}

exports.create_new = function(req, res, next) {
    const baseUrl = req.protocol + '://' + req.get('host');

    models.Urls.findOne({
        where: {
            original: req.body.url
        }
    }).then(result => {
        if(result){
            res.json({
                success: true,
                message: 'URL shortened successfully',
                data: {
                    original: req.body.url,
                    shortened: `${baseUrl}/${result.shortened}`
                }
            });
        } else {
            const randomString = getRandom(5);
            return models.Urls.create({
                original: req.body.url,
                shortened: randomString
            }).then(shortened => {
                // Returning the response as a JSON object
                return res.json({
                    success: true,
                    message: 'URL shortened successfully',
                    data: {
                        original: req.body.url,
                        shortened: `${baseUrl}/${randomString}`
                    }
                });
            })
        }
    })


    // }).catch(error => {
    //     // Handling errors and returning a JSON response in case of failure
    //     return res.status(500).json({
    //         success: false,
    //         message: 'Error shortening the URL',
    //         error: error.message
    //     });
    // });
}

exports.get_urls = function(req, res, next) {
    return models.Urls.findAll().then(result => {
        return res.json({
            success: true,
            data: result.map(item => {
                return {
                    'originalUrl': item.original,
                    'shortenedUrl': `${req.protocol + '://' + req.get('host')}/${item.shortened}`,
                    'createdAt': item.createdAt
                }
            })
        });
    })
}

// Function to generate a random string with letters, numbers, and symbols
// async function generateRandomString(length) {
//     const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//     // Infinite loop to keep trying until a unique shortened string is generated
//     while (true) {
//         let result = '';
//         for (let i = 0; i < length; i++) {
//             const randomIndex = Math.floor(Math.random() * charset.length);
//             result += charset[randomIndex];
//         }

//         // Check if the generated shortened URL already exists in the database
//         const existingRecord = await models.Urls.findOne({
//             where: { shortened: result }
//         })

//         // If not found, return the result as it's unique
//         if (!existingRecord) {
//             return result;
//         }
//     }
// }

// // Example usage
// async function getRandomString() {
//     try {
//         const shortened = await generateRandomString(5); // Get the unique shortened URL
//         console.log('Generated unique shortened URL:', shortened);
//         return shortened;
//     } catch (error) {
//         console.error('Error generating shortened URL:', error);
//     }
// }


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