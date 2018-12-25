function createLinkedList() {
  return {
    head: null,
    tail: null,
    length: 0,
    push(value) {
      let newNode = createNode(value);
      this.length++;

      if (!this.head) {
        this.head = newNode;
        this.tail = newNode;
      } else if (this.tail) {
        this.tail.next = newNode;
        this.tail = newNode;
      }
    },

    pop() {
      let currentNode = this.head;
      if (!currentNode) {
        return null;
      }

      this.length--;
      let lastNode = this.tail;
      if (lastNode === currentNode) {
        this.tail = null;
        this.head = null;
      } else {
        while (currentNode.next && (currentNode.next !== this.tail)) {
          currentNode = currentNode.next;
        }
        currentNode.next = null;
        this.tail = currentNode;
      }

      return lastNode.value;
    },

    get(index) {
      if ((index < 0) || (index > this.length)) {
        return null;
      }
      let node = this.head;
      let counter = 1;
      while (index <= this.length) {
        if (counter === index) {
          break;
        }
        node = node.next;
        counter++;
      }

      return node;
    },

    delete(index) {
      let node = this.get(index);
      if (node) {
        if (this.length > 1) {
          this.get(index - 1).next = node.next;
          this.length--;
        } else {
          this.pop();
        }
      }
    },

    isEmpty() {
      return !this.length;
    },

    print() {
      let index = 1;
      let node = this.get(index);
      while (node) {
        node = this.get(index);
        console.log(node.value);
        index++;
      }
    }
  };
}

function createNode(value) {
  return {
    value,
    next: null,
  }
}

let linkedList = createLinkedList();
console.log(linkedList.isEmpty());
linkedList.push('underpants');
linkedList.push('term-wear');
linkedList.push('socks');
linkedList.push('green-pants');
linkedList.push('belt');
linkedList.push('boots');
console.log(linkedList.isEmpty());

console.log(linkedList.pop());
console.log(linkedList.pop());
console.log(linkedList.get(3).value);
linkedList.delete(2);
console.log(linkedList.get(2).value);
console.log(linkedList.length);
