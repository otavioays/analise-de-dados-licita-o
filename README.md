# Minha Calculadora de Licitações

Aplicação pessoal para calcular preço sugerido e margem de contribuição em licitações.

**Versão atual:** 1.1.0 — calculadora editável e corrigida.

## Aplicativo privado

[Abrir a calculadora](https://minha-calculadora-licitacoes.otavio-augus-2838.chatgpt.site)

O aplicativo publicado exige acesso autorizado. Os valores informados ficam salvos apenas no navegador do usuário.

## Como usar

Abra `index.html` no navegador. Todos os campos podem ser alterados e o resultado é recalculado imediatamente.

## Regra de cálculo

1. `custos totais = produto + frete + outros custos variáveis`
2. `lucro desejado = custos totais × margem desejada`
3. `imposto = (custos totais + lucro desejado) × alíquota`
4. `preço sugerido = custos totais + lucro desejado + imposto`

A tabela automática de alíquotas reproduz as faixas fornecidas na planilha de referência. Também é possível inserir uma alíquota manual.
