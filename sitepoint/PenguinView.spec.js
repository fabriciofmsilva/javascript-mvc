var ElementMock = function ElementMock() {
  this.innerHTML = null;
};

// Stub functions, so we can pass the test
ElementMock.prototype.querySelector = function querySelector() { };
ElementMock.prototype.addEventListener = function addEventListener() { };
ElementMock.prototype.focus = function focus() { };

// Arrange
var elementMock = new ElementMock();

var view = new PenguinView(elementMock);

var viewModel = {
  name: 'Chinstrap',
  imageUrl: 'http://chinstrap1.jpg',
  size: '5.0kg (m), 4.8kg (f)',
  favoriteFood: 'krill',
  previousIndex: 1,
  nextIndex: 2
};

// Act
view.render(viewModel);

// Assert
assert(elementMock.innerHTML.indexOf(viewModel.name) > 0);
assert(elementMock.innerHTML.indexOf(viewModel.imageUrl) > 0);
assert(elementMock.innerHTML.indexOf(viewModel.size) > 0);
assert(elementMock.innerHTML.indexOf(viewModel.favoriteFood) > 0);
assert(elementMock.innerHTML.indexOf(viewModel.previousIndex) > 0);
assert(elementMock.innerHTML.indexOf(viewModel.nextIndex) > 0);
