const fs = require('fs');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
var bodyParser = require('body-parser')
var dbclient = require('./dbclient')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors())

function readJSONSync(filename) {
    return JSON.parse(fs.readFileSync(filename, 'utf8'));
  }

  function readFilePromise(file) {
    return new Promise(function(resolve, reject) {
      fs.readFile(file, function(err, data) {
          if (err) {
            reject(err)
          } else {
            resolve(JSON.parse(data))
          }
      })
    })
  }

app.get('/getmyjson', (req, res)=>{
    res.json(readJSONSync("myjson.json"))
   /* readFilePromise("myjsosn.json").then((response)=>{
        res.json(response)
    }).catch((error)=>{
        res.json({"error":error.message})
        })
        */
})


// this web service calls the finduser method in dbclient
// Method POST
// http://localhost:3000/finduser
// header set
/* content-type:
application/json,application/json
accept:
application/json
accept-encoding:
gzip, deflate
accept-language:
en-US,en;q=0.8
user-agent:
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.81 Safari/537.36
cookie:
stsservicecookie=ests; x-ms-gateway-slice=014
*/

// Sample Input Json : {"name" : "umashankar"}

app.post('/finduser', (req, res)=>{
    dbclient.finduser(req.body)
    .then((data)=>{
        res.json(data)
    })
    .catch((error)=>{
      res.error(error)
     })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

 