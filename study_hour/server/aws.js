const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const { access_key_id, secret_access_key_id } = require('../secrets/aws_s3');

aws.config.update({
        secretAccessKey: secret_access_key_id,
        accessKeyId: access_key_id,
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
    s3.getSignedUrl('getObject', params, function (err, url) {
        console.log('Your generated pre-signed URL is', url);
        console.log("err: ", err);
        console.log("params.key", params.Key, typeof params.Key);
        res.send({url: url})
    });
};

module.exports =  {
    upload,
    getImage
};

