Bem.Block = Bem.Component.create('block', {
  load: function() {
    Bem.Component.prototype.load.call(this);
    this.createElements();
    this.node.block = this;
  },

  get pattern() {
    return new RegExp('\\b'+this.name+'\\b', 'g');
  },

  createElements: function() {
    for(var i = 0; i < this.constructor.elements.length; i++) this.createElement(this.constructor.elements[i]);
  },

  createElement: function(element) {
    list = false
    if(Array.isArray(element)) {
      element = element[0];
      list = true;
    }

    if(list) this[element.prototype.name] = element.allIn(this);
    else this[element.prototype.name] = element.in(this);
  }
});

Bem.Block.all = [];

Bem.Block.each = function(callback) {
  for(var i = 0; i < this.all.length; i++) {
    if(callback(this.all[i], i) === false) break;
  }
};

Bem.Block.load = function(node) {
  var block = this.all.find(function(b) {
    return node.className.match(b.prototype.pattern);
  });

  return b ? new b(node) : null;
};

Bem.Block.create = function(name, options) {
  var elements = options.elements;
  delete options.elements;

  var block = Bem.Component.create.call(this, name, options);
  block.elements = [];

  if(elements) {
    for(var name in elements) this.createElement(block, name, elements[name]);
  }

  this.all.push(block);

  return block;
};

Bem.Block.createElement = function(block, name, options) {
  list = false
  if(Array.isArray(options)) {
    options = options[0];
    list = true;
  }

  options.block = block;

  var element = Bem.Element.create(name, options);
  block.elements.push(list ? [element] : element);
};
