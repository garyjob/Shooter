var gpio = require("pi-gpio");

var nerveGun  = function(pin_num) {
  var self = this;
  self.pin_num = pin_num;
}

nerveGun.prototype.fire = function() {
  var self = this;
  console.log("firing");

  gpio.open(self.pin_num, "output", function(err) {
    gpio.write(self.pin_num, 1, function() {
      self.keep_firing();
    });
  });
}

nerveGun.prototype.keep_firing = function() {
  var self = this;
  console.log("kept firing");

  setTimeout(function() {
    self.seize_fire();
  }, 1000);

}

nerveGun.prototype.seize_fire = function() {
  var self = this;
  console.log("seized firing");

  gpio.write(self.pin_num, 0, function() {
    gpio.close(self.pin_num);
  });

}

module.exports = nerveGun

if(!module.parent) {

  if(!process.argv[2]) {
    console.log(
      "\nWarning: Pin number must be specified. " + 
      "\n=======================================" + 
      "\n  Example usage:\n"+
      "\n    node nerve_gun.js 7\n\n")
    return;
  }

  var ng = new nerveGun(process.argv[2]);
  ng.fire();
}
