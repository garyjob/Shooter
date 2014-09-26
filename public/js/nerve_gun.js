var defenceSystem = function(server_url) {
  var self = this;
  self.setControls();
  self.connect(server_url);
}

defenceSystem.prototype.setControls = function() {
  var self            = this;
  self.log_query      = "#log";  
  self.trigger_button = "#da_boomz";  

  $(self.trigger_button).click(function() {
    self.fire();
  });

  self.log({
    status: 'SUCCESS',
    message: 'Controls established'
  });  

}

defenceSystem.prototype.connect = function(server_url) {
  var self = this;
  self.log({
    status: 'PENDING',
    message: 'Establishing uplink to Defence System'
  });

  self.socket = io.connect('http://' + server_url);

  self.socket.on('connected', function (data) {
    self.log(data);
    self.enableTrigger();
  });

  self.socket.on('fired', function (data) {
    self.log(data);
    self.enableTrigger();
  });  
}

defenceSystem.prototype.enableTrigger = function() {
  var self = this;
  $(self.trigger_button).removeAttr('disabled')
}

defenceSystem.prototype.disableTrigger = function() {
  var self = this;
  $(self.trigger_button).addAttr('disabled');
}

defenceSystem.prototype.fire = function() {
  var self = this;

  self.log({
    status: 'PENDING',
    message: 'Missle launch detected'
  });

  self.socket.emit("fire");
}

defenceSystem.prototype.log = function(msg_obj) {
  console.log(msg_obj);
  var self = this;

  $log_entry = $("<div>");
  $log_entry.html( msg_obj.status + " : " + msg_obj.message );

  $log_wrapper = $(self.log_query);
  $log_wrapper.prepend($log_entry);

}