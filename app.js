var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const port = 3000;
app.set('view engine', 'ejs')


const crypto = require('crypto')



app.use(bodyParser.json({limit: '5mb'}))


app.use(express.static(__dirname + "/public/"));



app.get('/', function(req,res){
  res.render('index', {})
})

app.post('/submit_response',  function(req,res){

  let hash = crypto.createHash('md5').update(req.body.img).digest("hex")

   console.log(hash)
   console.log(req.body.name)

 require('fs').writeFileSync(hash+".png.base64",req.body.img);
  res.sendStatus(200)
})



app.listen(port,()=>{
  console.log(`http:localhost:${port}`)
})
