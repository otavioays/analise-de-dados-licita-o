import fs from "node:fs";

const projectId = "appgprj_6a7904bd39fc8191bc23ee8b4323eeb6";
let html = fs.readFileSync("index.html", "utf8");
const css = fs.readFileSync("styles.css", "utf8");
const logic = fs.readFileSync("logic.js", "utf8");
const app = fs.readFileSync("app.js", "utf8");

html = html
  .replace(/\s*<link rel="preconnect"[^>]*>/g, "")
  .replace(/\s*<link href="https:\/\/fonts\.googleapis\.com[^>]*>/g, "")
  .replace('<link rel="stylesheet" href="styles.css" />', `<style>${css}</style>`)
  .replace('<script src="logic.js"></script>', `<script>${logic}</script>`)
  .replace('<script src="app.js"></script>', `<script>${app}</script>`);

const worker = `const html = ${JSON.stringify(html)};\nexport default { async fetch() { return new Response(html, { headers: { "content-type": "text/html; charset=UTF-8", "cache-control": "no-store" } }); } };\n`;

fs.mkdirSync("dist/server", { recursive: true });
fs.mkdirSync("dist/.openai", { recursive: true });
fs.writeFileSync("dist/server/index.js", worker);
fs.writeFileSync("dist/server/package.json", JSON.stringify({ type: "module" }));
fs.writeFileSync("dist/.openai/hosting.json", JSON.stringify({ project_id: projectId }, null, 2));
