createQueue = require('./queue');

function createNode(key) {
  let children = [];

  return {
    key,
    children,
    addChild(childKey) {
      let childNode = createNode(childKey);
      children.push(childNode);

      return childNode;
    }
  }
}

function createTree(rootKey) {
  let root = createNode(rootKey);

  return {
    root,
    printTriangle() {
      let result = [];
      let traverse = (node, depth) => {
        if (!result[depth]) {
          result[depth] = [];
        }
        if (result[depth].indexOf(node.key) === -1) {
          result[depth].push(node.key);
        }
        if (node.children.length) {
          node.children.forEach(child => {
            traverse(child, depth + 1)
          })
        }
      };
      traverse(root, 1);

      let textResult = '';
      result.forEach((depthLayer) => {
        textResult += depthLayer.join(' ') + "\n";
      });

      return textResult;
    },

    printStructure() {
      let result = '';

      function addKeyToResult(node, depth) {
        result += `${' '.repeat(depth * 2)} ${node.key}\n`;
      }

      function traverse(node, depth) {
        addKeyToResult(node, depth);

        if (node.children.length) {
          node.children.forEach(child => {
            traverse(child, depth + 1);
          });
        }
      }

      traverse(root, 0);

      return result;
    }
  }
}

let tree = createTree('Me');
let booze = tree.root.addChild('Alcohol');
booze.addChild('Beer');
let wine = booze.addChild('Wine');
let wiskey = booze.addChild('Whisky');
wine.addChild('Red');
wiskey.addChild('Bourbon');
wiskey.addChild('Scotch');
wiskey.addChild('Rye');

let food = tree.root.addChild('Food');
food.addChild('Chillie Con Carne');
food.addChild('Beef tartar');

console.log(tree.printStructure());
