const request = require('request-promise-native')

exports.handler = async (event, context) => {

  console.log('#####');
  console.log(event.channel_id);
  console.log(event.text);
  console.log('#####');
  // console.log(JSON.parse(event).body.key1);

  const data = {
    "token": "BTsx8b1gBTLTTwLQ8ouN7Pya",
    "team_id": "T0001",
    "team_domain": "example",
    "channel_id": "C2147483705",
    "channel_name": "test",
    "timestamp": "1355517523.000005",
    "user_id": "U2147483697",
    "user_name": "Steve",
    "text": "googlebot: What is the air-speed velocity of an unladen swallow?",
    "trigger_word": "googlebot:"
  };

  const url = `http://ec2-18-217-222-56.us-east-2.compute.amazonaws.com:9201/monitoring/slack`;
  const options = {
    url: url,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: event,
    json: true
  };
  const res = await request(options);

  const response = {
    statusCode: 200,
    body: event,
    context: context ? context : {},
    res: res
  };
  return response;
};