const Rule = require('../models/Rule');
// const { createAST, evaluateNode } = require('../utils/ruleUtils');

const operators = ['AND', 'OR', '>', '<', '>=', '<=', '=', '!='];


// Recursive function to parse the tokens into an AST
// function parseTokens(tokens) {
//     if (!tokens.length) return null;

//     const token = tokens.shift();

//     if (token === '(') {
//         const node = { type: 'operator', value: null, left: null, right: null };
//         node.left = parseTokens(tokens);  // Parse left child
//         node.value = tokens.shift();      // Get the operator (AND, OR, etc.)
//         node.right = parseTokens(tokens); // Parse right child
//         tokens.shift();                   // Consume closing ')'
//         return node;
//     } else if (operators.includes(token)) {
//         return { type: 'operator', value: token };
//     } else {
//         return { type: 'operand', value: token };
//     }
// }

function parseTokens(tokens) {
    let index = 0;

    function parseExpression() {
        let leftNode = parseTerm();

        while (tokens[index] === 'AND' || tokens[index] === 'OR') {
            const operator = tokens[index++];
            const rightNode = parseTerm();
            leftNode = {
                type: 'operator',
                value: operator,
                left: leftNode,
                right: rightNode
            };
        }

        return leftNode;
    }

    function parseTerm() {
        if (tokens[index] === '(') {
            index++;
            const expression = parseExpression();
            index++; // Skip the closing ')'
            return expression;
        }

        const field = tokens[index++];
        const operator = tokens[index++];
        const value = tokens[index++];
        return {
            type: 'operand',
            value: `${field} ${operator} ${value}`
        };
    }

    return parseExpression();
}


// Helper function to split the rule string into tokens
// function tokenize(ruleString) {
//     return ruleString
//         .replace(/\(/g, ' ( ')
//         .replace(/\)/g, ' ) ')
//         .split(/\s+/)
//         .filter(Boolean);
// }

function tokenize(ruleString) {
    return ruleString.match(/([a-zA-Z]+|\d+|[><=!]+|AND|OR|\(|\))/g);
}


// function createAST(ruleString) {
//     // Tokenize the ruleString
//     const tokens = tokenize(ruleString);

//     // Recursive function to parse tokens into AST
//     return parseTokens(tokens);
// }

function createAST(ruleString) {
    const tokens = tokenize(ruleString);
    const ast = parseTokens(tokens);
    
    console.log("AST:", JSON.stringify(ast, null, 2)); // Debugging AST
    return ast;
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



// Create a new rule and save to the database
exports.createRule = async (req, res) => {
    try {
        const ruleString = req.body.ruleString;
        const ast = createAST(ruleString); // Dynamically convert rule string to AST

        const newRule = new Rule({
            ruleString,
            ast
        });

        await newRule.save();  // Save the rule to MongoDB
        res.redirect('/');
    } catch (error) {
        res.status(500).json({ error: 'Error creating the rule' });
    }
};

// Evaluate a rule by its ID against the provided user data
// exports.evaluateRule = async (req, res) => {
//     try {
//         const userData = req.body;  
//         console.log(req.body);
//         const ruleId = req.body.ruleId;
      
//         const rule = await Rule.findById(ruleId);
//         if (!rule) {
//             return res.status(404).json({ error: 'Rule not found' });
//         }

        
//         const isEligible = evaluateNode(rule.ast, userData);

        
//         res.json({ result: isEligible });
//     } catch (error) {
//         res.status(500).json({ error: 'Error evaluating the rule' });
//     }
// };

exports.evaluateRule = async (req, res) => {
    try {
        const userData = req.body;  // Contains user attributes like age, department, etc.
        const ruleId = req.body.ruleId;  // ruleId is passed from the form

        // Fetch the rule from the database by ID
        const rule = await Rule.findById(ruleId);
        if (!rule) {
            return res.status(404).json({ error: 'Rule not found' });
        }

        // Evaluate the AST against the user-provided data
        console.log(rule.ast);
        const isEligible = evaluateNode(rule.ast, userData);

        // Return the result (true/false) based on the evaluation
        // res.json({ result: isEligible });
        if(isEligible===true){
            const name='Candidate is eligible';
            res.render('evaluate',{name});
        }
        else{
            const name='Candidate is not eligible';
            res.render('evaluate',{name});
        }
        
    } catch (error) {
        res.status(500).json({ error: 'Error evaluating the rule' });
    }
};


