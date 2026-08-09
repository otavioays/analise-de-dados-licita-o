const assert = require("node:assert/strict");
const { parseNumber, getBracket, calculate } = require("./logic.js");

assert.equal(parseNumber("1.500,25"), 1500.25);
assert.equal(getBracket(180000).rate, 4);
assert.equal(getBracket(180000.01).rate, 7.3);

const first = calculate({ cost: 500, freight: 50, otherCosts: 0, profitRate: 25, taxRate: 4.2 });
assert.equal(first.totalCosts, 550);
assert.equal(first.profitAmount, 137.5);
assert.equal(Number(first.taxAmount.toFixed(3)), 28.875);
assert.equal(Number(first.salePrice.toFixed(3)), 716.375);

const second = calculate({ cost: 480, freight: 48, otherCosts: 0, profitRate: 23, taxRate: 4.2 });
assert.equal(second.profitAmount, 121.44);
assert.equal(Number(second.taxAmount.toFixed(3)), 27.276);
assert.equal(Number(second.salePrice.toFixed(3)), 676.716);

console.log("Todos os testes passaram.");
