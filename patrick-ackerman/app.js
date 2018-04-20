function main() {
  var model = new Model();
  var controller = new Controller(model);
  var view = new View(controller);
}

function View(controller) {
  this.controller = controller; 
  this.heading = document.getElementById('heading');
  this.heading.addEventListener('click', controller);
  this.update = function(data) {
    this.heading.innerText = data.heading;
  }
  this.controller.model.registerObserver(this);
}

function Model(){
  var self = this;
  var state = new HeadingState();
  var heading = state.getValue();
  this.observers = [];
  this.registerObserver = function(observer){
    self.observers.push(observer);
  }
  this.notifyAll = function(){
    self.observers.forEach(function(observer){
      observer.update(self);
    })
  }
  //add changeHeading method to toggle state;
  this.changeHeading = function(){
    console.log('change heading');
    state.changeState();
    self.heading = state.getValue();
  }
  Object.defineProperty(this,"heading",{
    get: function() { return heading; },
    set: function(value) { 
      heading = value;  
      this.notifyAll();
    }
  });
}

function Controller(model) {
  var self = this;
  this.model = model;
  //EVENTLISTENER INTERFACE
  this.handleEvent = function(e) {
    e.stopPropagation();
    switch(e.type) {
      case "click":
        self.clickHandler(e.target);
        break;
      default:
        console.log(e.target);
    }
  }
  //GET MODEL HEADING
  this.getModelHeading = function() {
    return self.model.heading;
  }
  //CHANGE THE MODEL
  this.clickHandler = function(target) {
    self.model.heading = 'World';
    //now we just notify our observers
    self.model.notifyAll();
  }
}

function HeadingState(){
  var self = this;
  this.state = new HelloState(self);
  this.changeState = function(){
    self.state.next();
  }
  this.getValue = function(){
    return self.state.value
  }
}

function HelloState(container){
  var self = this;
  this.container = container;
  this.value = 'Hello';
  container.state = this;
  this.next = function(){
    return new WorldState(self.container);
  }
}

function WorldState(container){
  var self = this;
  this.container = container;
  this.value = 'World';
  container.state = this;
  this.next = function(){
    return new HelloState(self.container);
  }
}
