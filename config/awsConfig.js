require('dotenv').config();
const AWS = require('aws-sdk');

const AWS_CONFIG = {
    region: process.env.AWS_REGION,
    credentials: new AWS.Credentials({
       accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY, 
    })
    
};

const S3_BUCKET_NAME = process.env.BUCKET_NAME

module.exports = { AWS_CONFIG, S3_BUCKET_NAME };
