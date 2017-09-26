var Alert = Bem.Block.create('alert', {
  modifiers: {
    kind: { type: 'string' },
    closed: { type: 'boolean' }
  },

  elements: {
    content: {},
    close: {
      init: function() {
        this.on('click', function() {
          this.parent.closed = true;
        });
      }
    }
  }
});
