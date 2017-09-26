Bem.Modifier = function(component, name, options) {
  if(typeof options !== 'object' || options === null) options = {};

  this.component = component;
  this.name = name;
  this.type = options.type;
  this.value = options.value;

  this.defer();
};

Bem.Modifier.prototype = {
  constructor: Bem.Modifier,

  escape: function(string) {
    return string.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  },

  get boolean() {
    return this.type === 'boolean';
  },

  get string() {
    return this.type === 'string';
  },

  get pattern() {
    var pattern = this.component.fullName+'--'+this.escape(this.name);
    if(this.string) pattern += '--([^\\s]+)';

    return new RegExp('\\b'+pattern+'\\b', 'g');
  },

  get value() {
    var match = this.component.className.match(this.pattern);

    if(this.boolean) return match !== null;
    else return match === null ? null : match[1];
  },

  set value(v) {
    if(this.boolean) v = !!v;

    if(v !== this.value) {
      if(!v || this.string) this.component.className = this.component.className.replace(this.pattern, '').trim();
      if(v) this.component.className += ' '+this.component.fullName+'--'+this.name+(this.string ? '--'+v : '');
    }
  },

  defer: function() {
    var self = this;

    Object.defineProperty(this.component, this.name, {
      get: function() {
        return self.value;
      },

      set: function(v) {
        self.value = v;
      }
    });
  }
};
