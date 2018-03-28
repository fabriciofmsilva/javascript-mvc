var PenguinViewMock = function PenguinViewMock() {
  this.calledRenderWith = null;
};

PenguinViewMock.prototype.render = function render(penguinViewModel) {
  this.calledRenderWith = penguinViewModel;
};

// Arrange
var penguinViewMock = new PenguinViewMock();

var controller = new PenguinController(penguinViewMock, null);

var penguinModelData = {
  name: 'Chinstrap',
  imageUrl: 'http://chinstrapl.jpg',
  size: '5.0kg (m), 4.8kg (f)',
  favoriteFood: 'krill',
  index: 2,
  count: 5
};

// Act
controller.showPenguin(penguinModelData);

// Assert
assert.strictEqual(penguinViewMock.calledRenderWith.name, 'Chinstrap');
assert.strictEqual(penguinViewMock.calledRenderWith.imageUrl, 'http://chinstrapl.jpg');
assert.strictEqual(penguinViewMock.calledRenderWith.size, '5.0kg (m), 4.8kg (f)');
assert.strictEqual(penguinViewMock.calledRenderWith.favoriteFood, 'krill');
assert.strictEqual(penguinViewMock.calledRenderWith.previousIndex, 1);
assert.strictEqual(penguinViewMock.calledRenderWith.nextIndex, 3);
