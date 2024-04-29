### API de Cartas Yu-Gi-Oh! 🃏

Este é um projeto em JavaScript que utiliza a API de cartas Yu-Gi-Oh! para exibir informações sobre diferentes cartas. Abaixo está uma explicação do código:

Veja esta aplicação no vercel: https://api-yugioh.vercel.app/
---

![print da api](https://raw.githubusercontent.com/HenriBueno/api-yugioh/818ca0b0afa5d2bef6b8b1cdc3767693e73bac60/assets/images/print1.png)

![print da api](https://raw.githubusercontent.com/HenriBueno/api-yugioh/main/assets/images/print2.png)


### Funcionalidades Principais 🚀

1. **Listar Cartas**
   - A função `listarCards()` é responsável por fazer uma requisição à API e listar as cartas disponíveis.
   - A lista é exibida em uma grade de cartas, cada uma contendo uma imagem representativa.

2. **Pesquisar Cartas**
   - Ao digitar no campo de pesquisa e pressionar Enter, a função `pesquisarCard()` é acionada.
   - Ela filtra as cartas com base no texto digitado e exibe apenas as correspondentes.

3. **Navegação por Páginas**
   - As funções `avancarbotao()` e `voltarbotao()` permitem navegar entre as diferentes páginas de cartas.
   - Botões de próxima e anterior página facilitam a navegação intuitiva.

4. **Exibir Informações Detalhadas**
   - Ao clicar em uma carta, suas informações detalhadas são exibidas na seção de informações ao lado da lista.
   - As informações incluem nome, descrição, tipo, raça, raridade e atributo da carta selecionada.

---

### Estrutura do Código 🏗️

- O código utiliza o Axios para fazer requisições à API.
- As cartas são renderizadas dinamicamente no HTML com base nos dados da API.
- O código utiliza eventos de clique para interação do usuário, como ao pesquisar, navegar entre páginas e exibir informações detalhadas de uma carta.

---

Essas são as principais funcionalidades e estrutura do código. Se precisar de mais alguma explicação ou tiver dúvidas específicas, estou à disposição para ajudar! 😊
