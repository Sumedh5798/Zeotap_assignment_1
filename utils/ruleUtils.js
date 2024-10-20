const operators = ['AND', 'OR', '>', '<', '>=', '<=', '=', '!='];

function createAST(ruleString) {
    // Tokenize the ruleString
    const tokens = tokenize(ruleString);

    // Recursive function to parse tokens into AST
    return parseTokens(tokens);
}

// Helper function to split the rule string into tokens
function tokenize(ruleString) {
    return ruleString
        .replace(/\(/g, ' ( ')
        .replace(/\)/g, ' ) ')
        .split(/\s+/)
        .filter(Boolean);
}

// Recursive function to parse the tokens into an AST
function parseTokens(tokens) {
    if (!tokens.length) return null;

    const token = tokens.shift();

    if (token === '(') {
        const node = { type: 'operator', value: null, left: null, right: null };
        node.left = parseTokens(tokens);  // Parse left child
        node.value = tokens.shift();      // Get the operator (AND, OR, etc.)
        node.right = parseTokens(tokens); // Parse right child
        tokens.shift();                   // Consume closing ')'
        return node;
    } else if (operators.includes(token)) {
        return { type: 'operator', value: token };
    } else {
        return { type: 'operand', value: token };
    }
}

function evaluateNode(node, data) {
    if (!node) return true;

    if (node.type === 'operand') {
        // Operand case: compare data based on the operand
        const [field, operator, value] = node.value.split(' ');
        const userValue = data[field];
        switch (operator) {
            case '>':
                return userValue > Number(value);
            case '<':
                return userValue < Number(value);
            case '>=':
                return userValue >= Number(value);
            case '<=':
                return userValue <= Number(value);
            case '=':
                return userValue == value;
            case '!=':
                return userValue != value;
            default:
                return false;
        }
    } else if (node.type === 'operator') {
        // Operator case: evaluate left and right sides recursively
        const leftEval = evaluateNode(node.left, data);
        const rightEval = evaluateNode(node.right, data);

        if (node.value === 'AND') {
            return leftEval && rightEval;
        } else if (node.value === 'OR') {
            return leftEval || rightEval;
        }
    }
    return false;
}


module.exports={createAST,evaluateNode}