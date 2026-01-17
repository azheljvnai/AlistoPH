import AWS from 'aws-sdk'

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'ap-southeast-1' // Singapore region (closest to Philippines)
})

// S3 for file storage (images, documents)
export const s3 = new AWS.S3()

// SNS for push notifications
export const sns = new AWS.SNS()

// SES for email notifications
export const ses = new AWS.SES({ region: process.env.AWS_REGION || 'ap-southeast-1' })

// CloudWatch for logging
export const cloudwatch = new AWS.CloudWatchLogs()

// S3 Bucket configuration
export const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME || 'alistoph-uploads'
export const S3_BUCKET_REGION = process.env.AWS_REGION || 'ap-southeast-1'

// Helper function to upload file to S3
export const uploadToS3 = async (fileBuffer, fileName, contentType) => {
  const params = {
    Bucket: S3_BUCKET_NAME,
    Key: fileName,
    Body: fileBuffer,
    ContentType: contentType,
    ACL: 'public-read' // Make files publicly accessible (adjust based on your needs)
  }

  try {
    const result = await s3.upload(params).promise()
    return result.Location
  } catch (error) {
    console.error('S3 upload error:', error)
    throw error
  }
}

// Helper function to send push notification via SNS
export const sendPushNotification = async (deviceToken, message, title = 'AlistoPH Alert') => {
  const params = {
    PlatformApplicationArn: process.env.SNS_PLATFORM_ARN,
    Token: deviceToken,
    Message: JSON.stringify({
      default: message,
      APNS: JSON.stringify({
        aps: {
          alert: {
            title: title,
            body: message
          },
          sound: 'default'
        }
      }),
      GCM: JSON.stringify({
        notification: {
          title: title,
          body: message
        }
      })
    }),
    MessageStructure: 'json'
  }

  try {
    const result = await sns.publish(params).promise()
    return result
  } catch (error) {
    console.error('SNS push notification error:', error)
    throw error
  }
}

// Helper function to send email via SES
export const sendEmail = async (to, subject, body, isHtml = true) => {
  const params = {
    Source: process.env.SES_FROM_EMAIL || 'noreply@alistoph.com',
    Destination: {
      ToAddresses: Array.isArray(to) ? to : [to]
    },
    Message: {
      Subject: {
        Data: subject,
        Charset: 'UTF-8'
      },
      Body: isHtml ? {
        Html: {
          Data: body,
          Charset: 'UTF-8'
        }
      } : {
        Text: {
          Data: body,
          Charset: 'UTF-8'
        }
      }
    }
  }

  try {
    const result = await ses.sendEmail(params).promise()
    return result
  } catch (error) {
    console.error('SES email error:', error)
    throw error
  }
}
