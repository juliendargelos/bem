var Button = Bem.Block.create('button', {
  modifiers: {
    active: { type: 'boolean' }
  },
  elements: {
    content: {
      modifiers: {
        reverse: { type: 'boolean' }
      }
    }
  }
});
