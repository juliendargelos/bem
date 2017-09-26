Bem.Component = function(node) {
  this.node = node;
  this.load();
  this.init();
};

Bem.Component.prototype = {
  constructor: Bem.Component,
  name: 'component',

  get fullName() {
    return this.name;
  },

  get className() {
    return this.node.className;
  },

  set className(v) {
    this.node.className = v;
  },

  get text() {
    return this.node.textContent;
  },

  set text(v) {
    this.node.textContent = v;
  },

  load: function() {
    var modifier;

    for(var name in this.constructor.modifiers) {
      modifier = new Bem.Modifier(this, name, this.constructor.modifiers[name]);
    }
  },

  on: function(events, callback) {
    var self = this;
    events = events.trim().replace(/\s+/, ' ').split(' ');

    for(var i = 0; i < events.length; i++) {
      callback.handler = function(event) { callback.call(self, event); };
      this.node.addEventListener(events[i], callback.handler);
    }
  },

  off: function(events, callback) {
    events = events.trim().replace(/\s+/, ' ').split(' ');

    for(var i = 0; i < events.length; i++) {
      this.node.removeEventListener(events[i], callback.handler);
    }
  },

  once: function(events, callback) {
    var self = this;
    events = events.trim().replace(/\s+/, ' ').split(' ');

    for(var i = 0; i < events.length; i++) {
      callback.handler = function(event) {
        callback.call(self, event);
        self.node.removeEventListener(events[i], callback.handler);
      };

      this.node.addEventListener(events[i], callback.handler);
    }
  },

  init: function() {

  }
};

Bem.Component.create = function(name, options) {
  if(typeof options !== 'object' || options === null) options = {};

  var self = this;

  var component = function() {
    self.apply(this, Array.prototype.slice.call(arguments));
  };

  component.modifiers = options.modifiers || {};
  delete options.modifiers;
  component.prototype = Object.create(self.prototype, Object.getOwnPropertyDescriptors(options));
  component.prototype.constructor = component;
  component.prototype.name = name;

  component.create = function() {
    return self.create.apply(this, Array.prototype.slice.call(arguments));
  };

  component.in = function() {
    return self.in.apply(this, Array.prototype.slice.call(arguments));
  };

  component.allIn = function() {
    return self.allIn.apply(this, Array.prototype.slice.call(arguments));
  };

  return component;
};

Bem.Component.in = function(node) {
  return new this(node.querySelector('.'+this.prototype.fullName));
};

Bem.Component.allIn = function(node) {
  var self = this;

  return Array.prototype.map.call(node.querySelectorAll('.'+this.prototype.fullName), function(n) {
    new self(n);
  });
};
