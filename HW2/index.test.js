require('./index');

const user = {
  name: 'Andrey'
};

function getMessages(time, ...msgs) {
  if (!time) {
    time = 'now';
  }
  return `New msg from ${this.name} at ${time}: ${msgs.join(', ')}`;
}

describe('myCall', () => {
  it('correct context binding', () => {
    expect(getMessages.myCall(user, '15:00', 'msg')).toBe('New msg from Andrey at 15:00: msg');
  });

  it('correct multiple args', () => {
    expect(getMessages.myCall(user, '15:00', 'msg1', 'msg2')).toBe('New msg from Andrey at 15:00: msg1, msg2');
  });

  it('empty args', () => {
    expect(getMessages.myCall(user)).toBe('New msg from Andrey at now: ');
  });

  it('no context', () => {
    function getThis() {
      return this;
    }
    expect(getThis.myCall()).toBe(globalThis);
  });
});

describe('myApply', () => {
  it('correct context binding', () => {
    expect(getMessages.myApply(user)).toBe('New msg from Andrey at now: ');
  });
  it('correct multiple args', () => {
    expect(getMessages.myApply(user, ['15:00', 'msg1', 'msg2'])).toBe('New msg from Andrey at 15:00: msg1, msg2');
  });

  it('empty array', () => {
    expect(getMessages.myApply(user, [])).toBe('New msg from Andrey at now: ');
  });

  it('no context', () => {
    function getThis() {
      return this;
    }
    expect(getThis.myApply()).toBe(globalThis);
  });
});

describe('myBind', () => {
  it('correct context binding', () => {
    const bindedGetMessages = getMessages.myBind(user);
    expect(bindedGetMessages()).toBe('New msg from Andrey at now: ');
  });

  it('correct args handling', () => {
    const bindedGetMessages = getMessages.myBind(user);
    expect(bindedGetMessages('15:00', 'msg1', 'msg2')).toBe('New msg from Andrey at 15:00: msg1, msg2');
  });

  it('partial apply', () => {
    const bindedGetMessagesAt15 = getMessages.myBind(user, '15:00');
    expect(bindedGetMessagesAt15('msg1', 'msg2')).toBe('New msg from Andrey at 15:00: msg1, msg2');
  });

});
