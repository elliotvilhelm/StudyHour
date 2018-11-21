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

module.exports = upload;

