var LIST_OF_PENGUINS = '[{"name":"Emperor","imageUrl":"http://imageUrl",' +
  '"size":"36.7kg (m), 28.4kg (f)","favoriteFood":"fish and squid"}]';

var XMLHttpRequestMock = function XMLHttpRequestMock() {
  // The system under test must set this, else the test fails
  this.onload = null;
};

XMLHttpRequestMock.prototype.open = function open(method, url, async) {
  // Internal checks, system under test must have a method and url endpoint
  assert(method);
  assert(url);
  // If Ajax is not async, you’re doing it wrong :-)
  assert.strictEqual(async, true);
};

XMLHttpRequestMock.prototype.send = function send() {
  // Callback on this object simulates an Ajax request
  this.onload({ currentTarget: { responseText: LIST_OF_PENGUINS } });
};

// Arrange
var penguinModel = new PenguinModel(XMLHttpRequestMock);

// Act
penguinModel.getPenguin(0, function onPenguinData(penguinData) {

  // Assert
  assert.strictEqual(penguinData.name, 'Emperor');
  assert(penguinData.imageUrl);
  assert.strictEqual(penguinData.size, '36.7kg (m), 28.4kg (f)');
  assert.strictEqual(penguinData.favoriteFood, 'fish and squid');
  assert.strictEqual(penguinData.index, 0);
  assert.strictEqual(penguinData.count, 1);
});
