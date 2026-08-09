const { taxBrackets, parseNumber, getBracket, calculate } = window.Calculator;

const ids = ["cost", "freight", "otherCosts", "profitRate", "revenue", "manualTax"];
const el = Object.fromEntries(ids.map((id) => [id, document.getElementById(id)]));
let manualTaxMode = false;
const storageKey = "minha-calculadora-licitacoes";

const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const percent = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function update() {
  const bracket = getBracket(Math.max(0, parseNumber(el.revenue.value)));
  const taxRate = manualTaxMode ? parseNumber(el.manualTax.value) : bracket.rate;
  const result = calculate({
    cost: parseNumber(el.cost.value), freight: parseNumber(el.freight.value),
    otherCosts: parseNumber(el.otherCosts.value), profitRate: parseNumber(el.profitRate.value), taxRate,
  });

  document.getElementById("foundRate").textContent = `${percent.format(bracket.rate)}%`;
  document.getElementById("taxRange").textContent = bracket.label;
  document.getElementById("salePrice").textContent = currency.format(result.salePrice);
  document.getElementById("totalCosts").textContent = currency.format(result.totalCosts);
  document.getElementById("profitAmount").textContent = currency.format(result.profitAmount);
  document.getElementById("taxAmount").textContent = currency.format(result.taxAmount);
  document.getElementById("taxRateLabel").textContent = `(${percent.format(taxRate)}%)`;
  document.getElementById("contributionAmount").textContent = currency.format(result.profitAmount);
  document.getElementById("effectiveRate").textContent = `${percent.format(result.effectiveRate)}%`;
  document.getElementById("marginMeter").style.width = `${Math.min(100, result.effectiveRate)}%`;
  localStorage.setItem(storageKey, JSON.stringify({ values: Object.fromEntries(ids.map((id) => [id, el[id].value])), manualTaxMode }));
}

function formatField(input) {
  const number = parseNumber(input.value);
  input.value = percent.format(Math.max(0, number));
}

ids.forEach((id) => {
  el[id].addEventListener("input", update);
  el[id].addEventListener("blur", () => { formatField(el[id]); update(); });
  el[id].addEventListener("focus", () => el[id].select());
});

document.getElementById("taxMode").addEventListener("click", (event) => {
  manualTaxMode = !manualTaxMode;
  document.getElementById("revenueMode").classList.toggle("hidden", manualTaxMode);
  document.getElementById("manualMode").classList.toggle("hidden", !manualTaxMode);
  event.currentTarget.textContent = manualTaxMode ? "Usar tabela automática" : "Usar taxa manual";
  update();
});

document.getElementById("copySummary").addEventListener("click", async (event) => {
  const summary = [
    `Preço sugerido: ${document.getElementById("salePrice").textContent}`,
    `Custos totais: ${document.getElementById("totalCosts").textContent}`,
    `Lucro / margem de contribuição: ${document.getElementById("profitAmount").textContent}`,
    `Impostos: ${document.getElementById("taxAmount").textContent} ${document.getElementById("taxRateLabel").textContent}`,
    `Margem sobre o preço final: ${document.getElementById("effectiveRate").textContent}`,
  ].join("\n");
  try {
    await navigator.clipboard.writeText(summary);
    const original = event.currentTarget.innerHTML;
    event.currentTarget.textContent = "Resumo copiado!";
    setTimeout(() => { event.currentTarget.innerHTML = original; }, 1600);
  } catch { event.currentTarget.textContent = "Não foi possível copiar"; }
});

document.getElementById("resetCalculator").addEventListener("click", () => {
  ids.forEach((id) => { el[id].value = "0,00"; });
  manualTaxMode = false;
  document.getElementById("revenueMode").classList.remove("hidden");
  document.getElementById("manualMode").classList.add("hidden");
  document.getElementById("taxMode").textContent = "Usar taxa manual";
  update();
});

document.getElementById("taxTable").innerHTML = taxBrackets.map((bracket) => `<tr><td>${bracket.label}</td><td>${percent.format(bracket.rate)}%</td></tr>`).join("");
try {
  const saved = JSON.parse(localStorage.getItem(storageKey));
  if (saved?.values) ids.forEach((id) => { if (saved.values[id] != null) el[id].value = saved.values[id]; });
  if (saved?.manualTaxMode) document.getElementById("taxMode").click();
} catch { localStorage.removeItem(storageKey); }
update();
