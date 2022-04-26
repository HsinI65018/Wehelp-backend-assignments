const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

aws.config.update({
    secretAccessKey: process.env.SECREAT_ACCESS_KEY,
    accessKeyId: process.env.ACCESS_KEY_ID,
    region: process.env.REGION
});

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
		acl: 'public-read',
        bucket: 'dashboardbuckte2',
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname);
        }
    })
});

module.exports = upload;