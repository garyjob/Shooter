gpio = require "pi-gpio"

class nerveGun

  constructor: (@pin_num) ->


  fire: ()->
    console.log "firing"
    gpio.open @pin_num, "output", (err)=>
      gpio.write @pin_num, 1, ()=>
        @keep_firing()


  keep_firing: () ->
    console.log "kept firing"

    setTimeout ()=>
      @seize_fire();
    , 1000


  seize_fire: () ->
    console.log "seized firing"
    gpio.write @pin_num, 0, ()=>
      gpio.close @pin_num


module.exports = nerveGun

if !module.parent

  if !process.argv[2]
    console.log(
      "\nWarning: Pin number must be specified. " + 
      "\n=======================================" + 
      "\n  Example usage:\n"+
      "\n    node nerve_gun.js 7\n\n")
    return

  ng = new nerveGun(process.argv[2])
  ng.fire()
