const express = require('express');
const line = require('@line/bot-sdk');
const api = require('./src/api');
require('dotenv').config();

const config = {
  channelAccessToken: process.env.LINE_ACCESS_TOKEN,
  channelSecret: process.env.LINE_SECRET
};

const app = express();
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

const client = new line.Client(config);
async function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  switch (event.message.text) {
    case '查詢':
      const msg = await api.getMessage()
      client.replyMessage(event.replyToken, msg)
      break;
    default:
      return client.replyMessage(event.replyToken, {
        type: 'text',
        text: '這只是個查詢機器人，無法做出其他回應。\n如需要查詢請輸入「查詢」。'
      });
  }
}

app.listen(3000, () => {
  console.log('server work on port 3000')
});