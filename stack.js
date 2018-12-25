function createStack() {
  const items = [];

  return {
    push(item) {
      items.push(item);
    },

    pop() {
      return items.pop();
    },

    peek() {
      return items[items.length - 1];
    },

    get length() {
      return items.length;
    },

    isEmpty() {
      return !this.length;
    }
  };
}

let stack = createStack();
console.log(stack.isEmpty());
stack.push('underpants');
stack.push('term-wear');
stack.push('socks');
stack.push('green-pants');
stack.push('belt');
stack.push('boots');

console.log(stack.pop());
console.log(stack.pop());
console.log(stack.pop());
stack.push('red-pants');
console.log(stack.peek());
console.log(stack.isEmpty());
console.log(stack.length);
