const api = axios.create({
  baseURL: "https://db.ygoprodeck.com/api/v7/cardinfo.php",
});

const lista = document.getElementById("lista");

const clique = document.getElementById("card-clique");
const cardInfo = document.getElementById("card-info");
const pagina = document.getElementById("pagina");

const carregamento = document.getElementById("carregamento");

let cardsTotal = [];

const cardsPorPagina = 100;
let paginaAtual = 1;
let contador = 0;
let paginaAtualFiltro = 1;
let contadorFiltro = 0;
let cardsDaPagina = [];

let elementosFiltrados = [];
let trocaDobotao = 0;

function pesquisarCard() {
  try {
    const input = document.getElementById("input");
    const textoDigitado = input.value.toLowerCase();
    const stringVazia = "";
    let ultimaPesquisa = "";

    if (textoDigitado !== ultimaPesquisa) {
      paginaAtual = 1;
      contador = 0;
      paginaAtualFiltro = 1;
      contadorFiltro = 0;
      proximo.disabled = false;
    }
    if (textoDigitado === stringVazia) {
      paginaAtual = 1;
      contador = 0;
      paginaAtualFiltro = 1;
      contadorFiltro = 0;
      elementosFiltrados = [];
      listarCards();
      proximo.disabled = false;
    } else {
      const itensFiltrados = cardsTotal.filter((item) =>
        item.name.toLowerCase().includes(textoDigitado)
      );
      renderizarCardsFiltrados(itensFiltrados);
      elementosFiltrados = itensFiltrados;
    }
    ultimaPesquisa = textoDigitado;
  } catch (error) {
    console.log(error);
  }
}

function renderizarCardsFiltrados(elementosFiltrados) {
  try {
    let arrayDeCards = elementosFiltrados.slice(
      contadorFiltro,
      paginaAtualFiltro * cardsPorPagina
    );
    cardsDaPagina = arrayDeCards;

    console.log(elementosFiltrados);

    if (elementosFiltrados.length > 100) {
      trocaDobotao = 1;
    } else {
      trocaDobotao = 0;
    }

    let cardsHTML = "";

    cardsDaPagina.forEach((carta, posicao) => {
      const imagens = carta.card_images[0].image_url;

      const card = `
          <div class="col-movie col-1 mt-2">
            <div class="lista-cards show-body" onclick="renderizarCardInfoFiltrado(${posicao})">
              <img src="${imagens}" class="card-img-top card" alt="...">

            </div>
          </div>`;
      cardsHTML += card;
    });

    lista.innerHTML = cardsHTML;
  } catch (error) {
    console.log(error);
  }
}

function renderizarCardInfoFiltrado(posicao) {
  try {
    const item = cardsDaPagina[posicao];
    const cardHTML = `
    <div class="card-image-infos d-flex justify-content-start flex-column" style="width: 18rem">
      <img src="${item.card_images[0].image_url}" class="card-img-top card-info" alt="Card Image">
      <div class="infos-body">
        <div class="card-body">
          <h5 class="card-title text-center p-1">${item.name}</h5>
          <p class="card-text text-center p-1">${item.desc}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Tipo: ${item.type}</li>
          <li class="list-group-item">Raça: ${item.race}</li>
          <li class="list-group-item">Raridade: ${item.card_sets[0].set_rarity}</li>
          <li class="list-group-item">Atributo: ${item.attribute}</li>
        </ul>
      </div>
    </div>`;
    cardInfo.innerHTML = cardHTML;
  } catch (error) {
    console.error(error);
  }
}
/*-------------------------------------------------------------------*/
function renderizarCardInfo(cardSelecionado) {
  try {
    const item = cardsDaPagina[cardSelecionado];
    const cardHTML = `
    <div class="card-image-infos d-flex justify-content-start flex-column" style="width: 18rem">
      <img src="${item.card_images[0].image_url}" class="card-img-top card-info" alt="Card Image">
      <div class="infos-body">
        <div class="card-body">
          <h5 class="card-title text-center p-1">${item.name}</h5>
          <p class="card-text text-center p-1">${item.desc}</p>
        </div>
        <ul class="list-group list-group-flush">
        <li class="list-group-item">Tipo: ${item.type}</li>
          <li class="list-group-item">Raça: ${item.race}</li>
          <li class="list-group-item">Raridade: ${item.card_sets[0].set_rarity}</li>
          <li class="list-group-item">Atributo: ${item.attribute}</li>

        </ul>
      </div>
    </div>`;
    cardInfo.innerHTML = cardHTML;
  } catch (error) {
    console.error(error);
  }
}
async function listarCards() {
  try {
    const response = await api.get("/");
    const resposta = response.data.data;
    cardsTotal = resposta;

    const arrayDeCards = cardsTotal.slice(
      contador,
      paginaAtual * cardsPorPagina
    );

    cardsDaPagina = arrayDeCards;
    console.log(cardsDaPagina);
    let cardsHTML = "";

    cardsDaPagina.forEach((carta, cardSelecionado) => {
      const imagens = carta.card_images[0].image_url;
      const card = `
          <div class="col-movie col-1 mt-2">
            <div class="lista-cards show-body" id="card-clique" onclick="renderizarCardInfo(${cardSelecionado})">
              <img src="${imagens}" class="card-img-top card" alt="...">

            </div>
          </div>`;
      cardsHTML += card;
    });

    lista.innerHTML = cardsHTML;
  } catch (error) {
    console.log(error);
  }
}

listarCards();
let anterior = document.getElementById("anterior-pagina");
let proximo = document.getElementById("proxima-pagina");

function avancarbotao() {
  anterior.disabled = false;

  if (cardsDaPagina.length < 100) {
    console.log(cardsDaPagina.length);
    proximo.disabled = true;
  } else {
    lista.innerHTML = "";
    if (trocaDobotao === 1) {
      paginaAtualFiltro++;
      contadorFiltro += 100;
      renderizarCardsFiltrados(elementosFiltrados);
    } else {
      paginaAtual++;
      contador += 100;
      listarCards();

      contadorFiltro;
    }
    carregamento.setAttribute("id", "carregamento");
    const imagem = document.createElement("img");
    imagem.src = "./assets/images/carregamento.gif";
    carregamento.appendChild(imagem);
    setTimeout(retirarTelaDeCarregamento, 3000);
  }
}

function voltarbotao() {
  proximo.disabled = false;

  if (paginaAtual > 1 || paginaAtualFiltro > 1) {
    lista.innerHTML = "";
    if (trocaDobotao === 1) {
      paginaAtualFiltro--;
      contadorFiltro -= 100;
      renderizarCardsFiltrados(elementosFiltrados);
    } else {
      paginaAtual--;
      contador -= 100;
      listarCards();
    }
    carregamento.setAttribute("id", "carregamento");
    const imagem = document.createElement("img");
    imagem.src = "./assets/images/carregamento.gif";
    carregamento.appendChild(imagem);
    setTimeout(retirarTelaDeCarregamento, 3000);
  } else {
    anterior.disabled = true;
  }
}

function renderizarCardInfo(cardSelecionado) {
  try {
    const item = cardsDaPagina[cardSelecionado];
    const cardHTML = `
    <div class="card-image-infos d-flex justify-content-start flex-column" style="width: 18rem">
      <img src="${item.card_images[0].image_url}" class="card-img-top card-info" alt="Card Image">
      <div class="infos-body">
        <div class="card-body">
          <h5 class="card-title text-center p-1">${item.name}</h5>
          <p class="card-text text-center p-1">${item.desc}</p>
        </div>
        <ul class="list-group list-group-flush">
        <li class="list-group-item">Tipo: ${item.type}</li>
          <li class="list-group-item">Raça: ${item.race}</li>
          <li class="list-group-item">Raridade: ${item.card_sets[0].set_rarity}</li>
          <li class="list-group-item">Atributo: ${item.attribute}</li>

        </ul>
      </div>
    </div>`;
    cardInfo.innerHTML = cardHTML;
  } catch (error) {
    console.error(error);
  }
}

function retirarTelaDeCarregamento() {
  carregamento.innerHTML = "";
  carregamento.removeAttribute("id");
}

setTimeout(retirarTelaDeCarregamento, 4000);
