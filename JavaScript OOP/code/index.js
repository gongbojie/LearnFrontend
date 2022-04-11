
function Stopwatch() {
  let startTime, endTime, running, duration = 0;

  this.start = function() {
    if (running)
      throw new Error('Stopwatch has already started.');

    running = true;

    startTime = new Date();
  };

  this.stop = function() {
    if (!running)
      throw new Error('Stopwatch is not started.');

    running = false;

    endTime = new Date();

    const seconds = (endTime.getTime() - startTime.getTime()) / 1000;
    duration += seconds;
  };

  this.reset = function() {
    startTime = null;
    endTime = null;
    running = false;
    duration = 0;
  };

  Object.defineProperty(this, 'duration', {
    get: function() { return duration; }
  });
}

const _items = new WeakMap();

class Stack {
  constructor() {
    _items.set(this, []);
  }

  push(obj) {
    _items.get(this).push(obj);
  }

  pop() {

    const items = _items.get(this);

    if (items.length === 0)
      throw new Error('Stack is empty.');

    return items.pop();
  }

  peek() {
    const items = _items.get(this);

    if (items.length === 0)
      throw new Error('Stack is empty.');
    
    return items[items.length - 1];
  }

  get count() {
    return _items.get(this).length;
  }
}

