// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
require("dotenv").config()
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
console.log(accountSid,authToken)



client.messages
      .create({body: 'Hi there', from: '+18634459953', to: '+966502699023'})
      .then(message => console.log(message.sid));
 