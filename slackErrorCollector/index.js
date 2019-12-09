const request = require('request-promise-native')

const appVersion = '1.0.33';

exports.handler = async (event, context) => {
  let doc = {};
  try {
    const slackMessage = event.text ? event.text : "";
    const errType = slackMessage.split('(')[0].replace('ERROR - ', '').replace('(', '').trim();

    doc = {
      "token": event.token ? event.token : "",
      "team_id": event.team_id ? event.team_id : "",
      "team_domain": event.team_domain ? event.team_domain : "",
      "channel_id": event.channel_id ? event.channel_id : "",
      "channel_name": event.channel_name ? event.channel_name : "",
      "timestamp": event.timestamp ? event.timestamp : "",
      "date": new Date(),
      "user_id": event.user_id ? event.user_id : "",
      "user_name": event.user_name ? event.user_name : "",
      "errType": errType,
      "text": slackMessage,
      "trigger_word": event.trigger_word ? event.trigger_word : ""
    };
  } catch (err) {
    console.log(err.message);
    return {
      version: appVersion,
      statusCode: 500,
      event : event,
      message: err.message
    };
  }

  const url = `http://ec2-18-217-222-56.us-east-2.compute.amazonaws.com:9201/monitoring/slack`;
  const options = {
    url: url,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: doc,
    json: true
  };
  const res = await request(options);

  const response = {
    version: appVersion,
    statusCode: 200,
    // event : event,
    res: res
  };
  return response;
};