const request = require('request')
const cheerio = require('cheerio')
const axios = require('axios')

// 彰南
function getZhangNan () {
  return new Promise((resolve, reject) => {
    const url = 'http://www.sccsc.com.tw/'
    request(url, (err, res, body) => {
      if (err) reject(err)
      const $ = cheerio.load(body)
      // const row = []
      const data = $('#swim-pool p .now-count').html()
      resolve(data)
    })
  })
}

// 彰北
function getZhangBei () {
  return new Promise((resolve, reject) => {
    const url = "https://www.chnsports.com.tw/load_num_visitors.php?action=z1"
    axios.get(url).then(res => {
      resolve(res.data[0])
    }).catch(err => {
      reject(err)
    })
  })
}

function sum(a, b) {
  return new Promise((resolve, reject) => {
    resolve(a + b);
  });
}

async function main () {
  const zhangbei = await getZhangBei()
  const zhangnan = await getZhangNan()
  // console.log(zhangbei, zhangnan)
  const messageJSON = [{
    type: "flex",
    altText: "目前泳池人數",
    contents: {
      "type": "bubble",
      "size": "mega",
      "header": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": "目前泳池人數",
            "color": "#ffffff"
          }
        ],
        "paddingAll": "20px",
        "backgroundColor": "#0367D3",
        "spacing": "sm",
        "paddingTop": "22px"
      },
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "text": "彰北運動中心",
                    "color": "#0367D3",
                    "size": "sm"
                  },
                  {
                    "type": "text",
                    "color": "#0367D3",
                    "size": "xl",
                    "flex": 4,
                    "weight": "bold",
                    "contents": [
                      {
                        "type": "span",
                        "text": `${zhangbei ? zhangbei : 0}`
                      },
                      {
                        "type": "span",
                        "text": "/200人",
                        "size": "sm"
                      }
                    ]
                  }
                ]
              },
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "text": "地圖",
                    "action": {
                      "type": "uri",
                      "label": "action",
                      "uri": "https://goo.gl/maps/2WQbU1JJsAj9ciN18"
                    },
                    "color": "#0367D3"
                  }
                ],
                "alignItems": "flex-end",
                "justifyContent": "center"
              }
            ]
          },
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "text": "彰南運動中心",
                    "color": "#0367D3",
                    "size": "sm"
                  },
                  {
                    "type": "text",
                    "color": "#0367D3",
                    "size": "xl",
                    "flex": 4,
                    "weight": "bold",
                    "contents": [
                      {
                        "type": "span",
                        "text": `${zhangnan ? zhangnan : 0}`
                      },
                      {
                        "type": "span",
                        "text": "/200人",
                        "size": "sm"
                      }
                    ]
                  }
                ]
              },
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "text": "地圖",
                    "action": {
                      "type": "uri",
                      "label": "action",
                      "uri": "https://goo.gl/maps/EuUNov592gGXAgi48"
                    },
                    "color": "#0367D3"
                  }
                ],
                "alignItems": "flex-end",
                "justifyContent": "center"
              }
            ],
            "margin": "md"
          }
        ]
      },
      "footer": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "button",
            "action": {
              "type": "message",
              "label": "點我查詢",
              "text": "查詢"
            },
            "color": "#0367D3"
          }
        ]
      },
      "styles": {
        "header": {
          "separator": false
        }
      }
    }
  }]
  return messageJSON
}

// main()

module.exports = {
  getMessage: main
}
