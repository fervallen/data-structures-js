createQueue = require('./queue');

function createNode(key) {
  let neighbours = [];

  return {
    key,
    neighbours,
    addNeighbour(node) {
      neighbours.push(node)
    }
  }
}

function createGraph(directed = false) {
  let nodes = [];
  let edges = [];

  return {
    directed,
    nodes,
    edges,

    addNode(key) {
      nodes.push(createNode(key))
    },

    getNode(key) {
      return nodes.find(node => node.key === key)
    },

    addEdge(fromKey, toKey) {
      let nodeFrom = this.getNode(fromKey);
      let nodeTo = this.getNode(toKey);

      nodeFrom.addNeighbour(nodeTo);
      edges.push(`${fromKey}-${toKey}`);
      if (!directed) {
        nodeTo.addNeighbour(nodeFrom);
      }
    },

    print() {
      return nodes.map(({key, neighbours}) => {
        let result = key;
        if (neighbours.length) {
          result += ` => ${neighbours.map(neighbour => neighbour.key).join(' ')}`;
        }

        return result;
      }).join("\n");
    },

    breadthFirstSearch(staringKey, visit) {
      const startingNode = this.getNode(staringKey);
      let visited = nodes.reduce((map, node) => {
        map[node.key] = false;

        return map;
      }, {});

      let queue = createQueue();
      queue.enqueue(startingNode);
      while (!queue.isEmpty()) {
        let currentNode = queue.dequeue();
        if (!visited[currentNode.key]) {
          visit(currentNode);
          visited[currentNode.key] = true;
        }

        currentNode.neighbours.forEach(node => {
          if (!visited[node.key]) {
            queue.enqueue(node);
          }
        });
      }
    },

    depthFirstSearch(staringKey, visit) {
      let visited = nodes.reduce((map, node) => {
        map[node.key] = false;

        return map;
      }, {});

      function explore(node) {
        if (!visited[node.key]) {
          visit(node);
          visited[node.key] = true;
          node.neighbours.forEach(neighbourNode => {
            explore(neighbourNode);
          });
        }
      }
      explore(this.getNode(staringKey));
    }
  }
}

let graph = createGraph(true);
graph.addNode('Me');
graph.addNode('Alcohol');
graph.addNode('Beer');
graph.addNode('Wine');
graph.addNode('Red');
graph.addNode('Whisky');
graph.addNode('Bourbon');
graph.addNode('Scotch');
graph.addEdge('Me', 'Alcohol');
graph.addEdge('Me', 'Beer');
graph.addEdge('Me', 'Bourbon');
graph.addEdge('Alcohol', 'Beer');
graph.addEdge('Alcohol', 'Wine');
graph.addEdge('Alcohol', 'Whisky');
graph.addEdge('Wine', 'Red');
graph.addEdge('Whisky', 'Bourbon');
graph.addEdge('Whisky', 'Scotch');

graph.depthFirstSearch('Me', node => {
  console.log(node.key)
});
