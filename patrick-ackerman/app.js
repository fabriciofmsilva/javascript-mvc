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
  // heading is no longer a property, but a scoped variable
  var heading = "Hello"
  this.observers = [];
  this.registerObserver = function(observer) {
    self.observers.push(observer);
  }
  this.notifyAll = function() {
    self.observers.forEach(function(observer) {
      observer.update(self);
    })
  }
  //Pass this, as its the object we want to affect. Heading is the   
  //name of the property we want it to be attached to. Than we 
  //define the accessor and assignment functions
  Object.defineProperty(this, "heading", {
    get: function() { return heading; },
    set: function(value) { 
      heading = value; 
      //call notifyAll in the assignment function     
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
