
# Banco Imobiliário

Banco Imobiliário simplificado feito em NodeJS 

## Instalação

Para instalar basta rodar `npm install` ou `yarn`

## Simulação

Para simulação de um jogo:
1. Edição do `.env` (opcional)
##### O arquivo `.env` possui a variável `PROPERTY_VALUE_RANDOM` que pode assumir o valor `true` ou `false`, onde os valores de compra e aluguel podem ser colocados de maneira aleatória a cada rodada, não assumindo o valor inicial hard code.
####
2. Executar `npm run start`

3. Acessar o sistema na rota [http://localhost:3000/](http://localhost:3000/) 


## Exemplo de Resposta da API
```JSON
{
    "vencedor": "impulsive",
    "jogadores": [
        "impulsive",
        "demanding",
        "cautious",
        "randomer"
    ]
}
```