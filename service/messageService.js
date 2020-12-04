const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

exports.sendSms = async (message, mobile) => {
    try {
      console.log("Data from api",message,mobile)
        return client.messages
          .create({
             body: message,
             from: '+12513254457',
             to: mobile
           })
          .then(message => console.log(message.sid));
    } catch (err) {
      logger.error(err);
    }
  };
  
