function createPriorityQueue() {
  const queues = [];

  return {
    enqueue(item, priority = 0) {
      if (!queues[priority]) {
        queues[priority] = [];
      }
      queues[priority].unshift(item);
    },

    dequeue() {
      for (let priority in queues) {
        if (queues.hasOwnProperty(priority) && queues[priority] && queues[priority].length){
          return queues[priority].pop();
        }
      }
    },

    peek() {
      for (let priority in queues.reverse()) {
        if (queues.hasOwnProperty(priority) && queues[priority] && queues[priority].length){
          return queues[priority][queues[priority].length - 1];
        }
      }
    },

    get length() {
      let lengthSum = 0;
      for (let priority in queues) {
        if (queues.hasOwnProperty(priority) && queues[priority] && queues[priority].length){
          lengthSum += queues[priority].length;
        }
      }

      return lengthSum;
    },

    isEmpty() {
      return !this.length;
    }
  };
}

let queue = createPriorityQueue();
console.log(queue.isEmpty());
queue.enqueue('Pull your dong', 5);
queue.enqueue('Make ice cream');
queue.enqueue('Be nasty', 8);
queue.enqueue('Gonzo!', 5);

console.log(queue.length);
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.isEmpty());
console.log(queue.length);
