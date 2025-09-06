function comprar(produto) {
  alert(`Você comprou: ${produto}`);
}
function abrirInfoBazar() {
  const novaJanela = window.open("", "_blank");
  novaJanela.document.write(`
      <html>
        <head>
          <title>Informações do Bazar</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f0f0f0;
              padding: 2rem;
              color: #333;
            }
            h1 {
              color: #4CAF50;
              font-size: 1.5rem;
            }
            p {
              margin-top: 1rem;
              font-size: 1rem;
            }
          </style>
        </head>
        <body>
          <h1>Local e Horário do Bazar</h1>
          <p><strong>Local:</strong> Escola Odair Martiniano da Silva Mandela</p>
          <p><strong>Funcionamento:</strong> Das 8h às 10h</p>
          <p>Esperamos por você!</p>
        </body>
      </html>
    `);
}
function abrirInfoBazar() {
  const novaJanela = window.open("", "_blank");
  novaJanela.document.write(`
      <html>
        <head>
          <title>Informações do Bazar</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background: linear-gradient(135deg, #e0f7fa, #ffffff);
              padding: 3rem;
              color: #333;
              text-align: center;
            }
            .container {
              background-color: white;
              border-radius: 12px;
              padding: 2rem;
              max-width: 500px;
              margin: auto;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #4CAF50;
              margin-bottom: 1rem;
            }
            p {
              font-size: 1rem;
              margin: 0.5rem 0;
            }
            .emoji {
              font-size: 2rem;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="emoji">📍🕒</div>
            <h1>Informações do Bazar</h1>
            <p><strong>Local:</strong> Escola Odair Martiniano da Silva Mandela</p>
            <p><strong>Horário:</strong> Das 8h às 10h</p>
            <p>Esperamos por você com muitas ofertas e novidades!</p>
          </div>
        </body>
      </html>
    `);
}
// === CARRINHO ===
let carrinho = [];

function adicionarAoCarrinho(nome, preco) {
  carrinho.push({ nome, preco });
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const lista = document.getElementById("carrinho-itens");
  lista.innerHTML = "";
  let total = 0;
  carrinho.forEach((item, index) => {
    total += item.preco;
    lista.innerHTML += `<li>${item.nome} - R$ ${item.preco.toFixed(
      2
    )} <button onclick="removerItem(${index})">x</button></li>`;
  });
  document.querySelector(
    ".carrinho-total"
  ).innerText = `Total: R$ ${total.toFixed(2)}`;
}

function removerItem(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

// === MAPA ===
function initMap() {
  const localizacao = { lat: -23.55052, lng: -46.633308 }; // Coordenadas de exemplo
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: localizacao,
  });
  new google.maps.Marker({
    position: localizacao,
    map: map,
  });
}

let cart = [];
let total = 0;

function toggleCart() {
  document.getElementById("cart").classList.toggle("open");
}

function addToCart(name, price) {
  cart.push({ name, price }), (total += price), updateCart();
}

function removeFromCart(index) {
  (total -= cart[index].price), cart.splice(index, 1), updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";
  cart.forEach((item, index) => {
    cartItems.innerHTML += `
      <li>
        ${item.name} - R$ ${item.price.toFixed(2).replace(".", ",")}
        <button onclick="removeFromCart(${index})">❌</button>
      </li>
    `;
  });
  document.getElementById("cart-total").innerText = total
    .toFixed(2)
    .replace(".", ",");
}

function finalizarCompra() {
  if (cart.length === 0) {
    alert("Seu carrinho está vazio!");
  } else {
    alert("Compra finalizada! Obrigado por comprar no Bazar Online 🎉");
    cart = [];
    total = 0;
    updateCart();
    toggleCart();
  }
}

// === MAPA ===
function initMap() {
  const localizacao = { lat: -23.55052, lng: -46.633308 }; // Coordenadas de exemplo
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: localizacao,
  });
  new google.maps.Marker({
    position: localizacao,
    map: map,
  });
}
const sqlite3 = require("sqlite3").verbose();

// Cria/abre o banco localmente (arquivo database.db)
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Erro ao conectar no banco:", err.message);
  } else {
    console.log("Conectado ao banco de dados SQLite!");
  }
});

// Criar tabela exemplo
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      email TEXT
    )
  `);
});

module.exports = db;
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/usuarios")
      .then((res) => setUsuarios(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Lista de Usuários</h1>
      <ul>
        {usuarios.map((u) => (
          <li key={u.id}>
            {u.nome} - {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
