require('dotenv').load();
const db = require('../models');
const twilio = require('twilio');
const client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const service = client.notify.services(process.env.TWILIO_NOTIFY_SERVICE_SID);

exports.sendSMS = async function(message) {
  const { text, user, createdAt } = message;
  const smsBody = `
    ${user.username} posted at ${createdAt.toLocaleString()}: ${text}
  `;

  const users = await db.User.find({}, { phoneNumber: 1, _id: 0 });
  const bindings = users
    .filter(user => (user.phoneNumber ? true : false))
    .map(user =>
      JSON.stringify({
        binding_type: 'sms',
        address: `+1${user.phoneNumber}`
      })
    );
  console.log(`SMS numbers: ${bindings}`);

  service.notifications
    .create({
      toBinding: bindings,
      body: smsBody
    })
    .then(notification => {
      let { dateCreated, sid } = notification;
      console.log(`SMS created at ${dateCreated.toLocaleString()}: ${sid}`);
    })
    .catch(err => console.log(`SMS error: ${err}`))
    .done();
};
