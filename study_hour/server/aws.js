const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const { accessKey, secretAccessKey } = require('../secrets/aws_s3');

aws.config.update({
    secretAccessKey: secretAccessKey,
    accessKeyId: accessKey,
    region: 'us-west-1' // region of your bucket
});

const s3 = new aws.S3();
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'studyhour',
        // acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
});

const getImage = function(params, res) {
    // s3.getObject(params, function (err, data) {
    //     if (err) {
    //         return res.send({"error": err});
    //     }
    //     // res.send(data);
    //     res.writeHead(200, {'Content-Type': 'image/jpeg'});
    //     res.write(data.Body, 'binary');
    //     res.end(null, 'binary');
    // });
    s3.getSignedUrl('getObject', params, function (err, url) {
        console.log('Your generated pre-signed URL is', url);
        res.send({url: url})
    });
};

module.exports =  {
    upload,
    getImage
};

