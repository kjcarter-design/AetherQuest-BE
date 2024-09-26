const AWS = require('aws-sdk');
const { AWS_CONFIG } = require('../config/awsConfig')

const s3 = new AWS.S3(AWS_CONFIG);

const generateUploadURL = async (fileType) => {
    console.log('S3_BUCKET_NAME:', process.env.S3_BUCKET_NAME);
    const extension = fileType === 'image/png' ? '.png' : '.jpg';
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `${Date.now()}${extension}`,
        Expires: 60,
        ContentType: fileType,
    };

    return new Promise((resolve, reject) => {
        s3.getSignedUrl('putObject', params, (err, url) => {
            if (err) {
                console.error('Error generating signed URL:', err);
                reject(err);
            }
            console.log('Signed URL:', url);

            // Generate the object URL
            const objectURL = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
            console.log('Object URL:', objectURL);

            // Resolve both the signed URL and the object URL
            resolve({ signedUrl: url, objectUrl: objectURL });
        });
    });
};

module.exports = generateUploadURL;
