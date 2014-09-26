bodyParser = require('body-parser')
express    = require 'express'
path       = require 'path'
fs         = require 'fs'
nerveGun   = require './nerve_gun'

global.CONFIG = null
CONFIG = JSON.parse(fs.readFileSync(__dirname + '/config/config.js').toString());


# Web Server section of system
app = express()

app.use bodyParser.urlencoded({ extended: false })
app.use bodyParser.json()

app.set 'views', __dirname + '/views'
app.set 'view engine', 'ejs'
app.use express.static(__dirname + '/public')


app.get '/', (req, res)->
  res.render 'index'

app.get '/fire', (req, res)->

  console.log 'Boomz!!! Missiles fired...'
  ng = new nerveGun CONFIG.pin_num
  ng.fire()

  res.send 
    status: "SUCCES"
    message: "Missle was fired"


# Socket IO server
server  = require('http').Server(app)
io      = require('socket.io')(server)

# Start socket server
io.on 'connection', (socket)->

  console.log 'Boomz!!! Captain America came to the rescue...'
  socket.emit 'connected', { 
    status: 'SUCCESS',
    message: 'Defense System Armed'
  }

  socket.on 'fire', (pin_num)=>

    console.log 'Boomz!!! Missiles fired...'
    ng = new nerveGun CONFIG.pin_num
    ng.fire()

    socket.emit 'fired', { 
      status: 'SUCCESS',
      message: 'Boomz!!! Missiles fired...'
    }

  socket.on 'disconnect', ()=>
    console.log "Opps... Captain America has went on holidays"



module.exports = 
  server : server



if !module.parent
  # Start tutorial server
  port = process.argv[2] || CONFIG.port
  server.listen port
  console.log "Attack Server listening at port : %s", port