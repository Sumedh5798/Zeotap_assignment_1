const mongoose = require('mongoose');

const NodeSchema = new mongoose.Schema({
    type: { type: String, required: true }, // 'operator' or 'operand'
    left: { type: mongoose.Schema.Types.Mixed }, // Could be another Node
    right: { type: mongoose.Schema.Types.Mixed }, // Could be another Node
    value: { type: mongoose.Schema.Types.Mixed } // Optional value for operands
});

const RuleSchema = new mongoose.Schema({
    ruleString: { type: String, required: true },
    ast: { type: NodeSchema, required: true }
});

module.exports = mongoose.model('Rule', RuleSchema);
