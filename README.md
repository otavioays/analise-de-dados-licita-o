# Margem Licita

Aplicação web para calcular preço sugerido e margem de contribuição em licitações.

## Como usar

Abra `index.html` no navegador ou publique o repositório pelo GitHub Pages. Não há dependências nem etapa de build.

## Regra de cálculo

1. `custos totais = produto + frete + outros custos variáveis`
2. `lucro desejado = custos totais × margem desejada`
3. `imposto = (custos totais + lucro desejado) × alíquota`
4. `preço sugerido = custos totais + lucro desejado + imposto`

A tabela automática de alíquotas reproduz as faixas fornecidas na planilha de referência. Também é possível inserir uma alíquota manual.
