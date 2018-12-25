function createQueue() {
  const items = [];

  return {
    enqueue(item) {
      items.unshift(item);
    },

    dequeue() {
      return items.pop();
    },

    peek() {
      return items[items.length - 1];
    },

    get length() {
      return items.length;
    },

    isEmpty() {
      return !items.length;
    }
  };
}

module.exports = createQueue;
