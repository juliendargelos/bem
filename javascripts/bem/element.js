Bem.Element = Bem.Component.create('element', {
  block: Bem.Block,

  get fullName() {
    return this.block.prototype.name+'__'+this.name;
  },

  init: function() {
    this.parent = null;
  }
});

Bem.Element.in = function(node) {
  if(node instanceof Node) return Bem.Component.in.apply(this, Array.prototype.slice.call(arguments));
  else {
    var element = this.in(node.node);
    if(element) element.parent = node;

    return element;
  }
};

Bem.Element.allIn = function(node) {
  if(node instanceof Node) return Bem.Component.allIn.apply(this, Array.prototype.slice.call(arguments));
  else{
    return this.allIn(node.node).map(function(element) {
      element.parent = node;
      return element;
    });
  }
};
