var penguinModel = new PenguinModel(XMLHttpRequest);

var targetElement = document.getElementById('listOfPenguins');
var penguinView = new PenguinView(targetElement);

var controller = new PenguinController(penguinView, penguinModel);

controller.initialize();

controller.onClickGetPenguin({ currentTarget: { dataset: { penguinIndex: 0 } } });
