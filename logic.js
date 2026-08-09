const taxBrackets = [
  { max: 180000, rate: 4, label: "Até R$ 180.000,00" },
  { max: 360000, rate: 7.3, label: "De R$ 180.000,01 a R$ 360.000,00" },
  { max: 720000, rate: 9.5, label: "De R$ 360.000,01 a R$ 720.000,00" },
  { max: 1800000, rate: 10.7, label: "De R$ 720.000,01 a R$ 1.800.000,00" },
  { max: 3600000, rate: 14.3, label: "De R$ 1.800.000,01 a R$ 3.600.000,00" },
  { max: 4800000, rate: 19, label: "De R$ 3.600.000,01 a R$ 4.800.000,00" },
];

function parseNumber(value) {
  if (typeof value !== "string") return Number(value) || 0;
  const clean = value.replace(/[^0-9,.-]/g, "");
  if (clean.includes(",")) return Number(clean.replace(/\./g, "").replace(",", ".")) || 0;
  return Number(clean) || 0;
}

function getBracket(revenue) {
  return taxBrackets.find((bracket) => revenue <= bracket.max) || taxBrackets.at(-1);
}

function calculate(values) {
  const totalCosts = Math.max(0, values.cost) + Math.max(0, values.freight) + Math.max(0, values.otherCosts);
  const profitAmount = totalCosts * Math.max(0, values.profitRate) / 100;
  const subtotal = totalCosts + profitAmount;
  const taxAmount = subtotal * Math.max(0, values.taxRate) / 100;
  const salePrice = subtotal + taxAmount;
  const effectiveRate = salePrice ? profitAmount / salePrice * 100 : 0;
  return { totalCosts, profitAmount, taxAmount, salePrice, effectiveRate };
}

const Calculator = { taxBrackets, parseNumber, getBracket, calculate };
if (typeof window !== "undefined") window.Calculator = Calculator;
if (typeof module !== "undefined") module.exports = Calculator;
