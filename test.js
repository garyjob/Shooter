var gpio = require("pi-gpio");

gpio.open(1, "output", function(err) {     // Open pin 16 for output
    gpio.write(1, 1, function() {          // Set pin 16 high (1)
        gpio.close(1);                     // Close pin 16
    });
});