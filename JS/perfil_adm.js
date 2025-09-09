let editingItem = null
let editingType = null

// Função para abrir modal
function openModal(type) {
  const modal = document.getElementById(`modal-${type}`)
  modal.classList.add("active")
}

function openModalForEdit(type, cardElement) {
  editingItem = cardElement
  editingType = type

  const modal = document.getElementById(`modal-${type}`)
  const form = document.getElementById(`form-${type}`)

  // Preencher formulário com dados do card
  if (type === "colaboradores") {
    fillColaboradorForm(cardElement, form)
  } else if (type === "servicos") {
    fillServicoForm(cardElement, form)
  }

  modal.classList.add("active")
}

function fillColaboradorForm(cardElement, form) {
  const cardTitles = cardElement.querySelectorAll(".card-title")
  const cardSubtitles = cardElement.querySelectorAll(".card-subtitle")

  form.querySelector('input[name="nome"]').value = cardTitles[0].textContent
  form.querySelector('input[name="cargo"]').value = cardSubtitles[0].textContent
  form.querySelector('input[name="contato"]').value = cardSubtitles[1].textContent
  form.querySelector('input[name="data"]').value = cardTitles[1].textContent
}

function fillServicoForm(cardElement, form) {
  const cardTitles = cardElement.querySelectorAll(".card-title")
  const cardSubtitles = cardElement.querySelectorAll(".card-subtitle")

  form.querySelector('input[name="titulo"]').value = cardTitles[0].textContent
  form.querySelector('input[name="preco"]').value = cardSubtitles[0].textContent
  form.querySelector('input[name="pagamento"]').value = cardSubtitles[1].textContent
  form.querySelector('input[name="descricao"]').value = cardTitles[1].textContent
}

// Função para fechar modal
function closeModal(type) {
  const modal = document.getElementById(`modal-${type}`)
  modal.classList.remove("active")

  editingItem = null
  editingType = null
  document.getElementById(`form-${type}`).reset()
}

document.getElementById("form-colaboradores").addEventListener("submit", function (e) {
  e.preventDefault()

  const formData = new FormData(this)
  const colaborador = {
    nome: formData.get("nome"),
    cargo: formData.get("cargo"),
    contato: formData.get("contato"),
    data: formData.get("data"),
  }

  if (editingItem && editingType === "colaboradores") {
    // Atualizar colaborador existente
    updateColaboradorInList(editingItem, colaborador)
    alert("Colaborador atualizado com sucesso!")
  } else {
    // Adicionar novo colaborador
    addColaboradorToList(colaborador)
    alert("Colaborador cadastrado com sucesso!")
  }

  // Limpar formulário e fechar modal
  this.reset()
  closeModal("colaboradores")
})

document.getElementById("form-servicos").addEventListener("submit", function (e) {
  e.preventDefault()

  const formData = new FormData(this)
  const servico = {
    titulo: formData.get("titulo"),
    descricao: formData.get("descricao"),
    preco: formData.get("preco"),
    pagamento: formData.get("pagamento"),
  }

  if (editingItem && editingType === "servicos") {
    // Atualizar serviço existente
    updateServicoInList(editingItem, servico)
    alert("Serviço atualizado com sucesso!")
  } else {
    // Adicionar novo serviço
    addServicoToList(servico)
    alert("Serviço cadastrado com sucesso!")
  }

  // Limpar formulário e fechar modal
  this.reset()
  closeModal("servicos")
})

function updateColaboradorInList(cardElement, colaborador) {
  const cardTitles = cardElement.querySelectorAll(".card-title")
  const cardSubtitles = cardElement.querySelectorAll(".card-subtitle")

  cardTitles[0].textContent = colaborador.nome
  cardSubtitles[0].textContent = colaborador.cargo
  cardSubtitles[1].textContent = colaborador.contato
  cardTitles[1].textContent = colaborador.data
}

function updateServicoInList(cardElement, servico) {
  const cardTitles = cardElement.querySelectorAll(".card-title")
  const cardSubtitles = cardElement.querySelectorAll(".card-subtitle")

  cardTitles[0].textContent = servico.titulo
  cardSubtitles[0].textContent = servico.preco
  cardSubtitles[1].textContent = servico.pagamento
  cardTitles[1].textContent = servico.descricao
}

function addColaboradorToList(colaborador) {
  const container = document.getElementById("colaboradores-list")
  const cardHTML = `
        <div class="card">
            <div class="card-image"></div>
            <div class="card-content">
                <div class="card-title">${colaborador.nome}</div>
                <div class="card-subtitle">${colaborador.cargo}</div>
                <div class="card-subtitle">${colaborador.contato}</div>
            </div>
            <div class="card-content">
                <div class="card-title">${colaborador.data}</div>
            </div>
            <div class="card-actions">
                <button class="btn-small btn-edit" onclick="openModalForEdit('colaboradores', this.closest('.card'))">✏️ Editar</button>
                <button class="btn-small btn-delete" onclick="this.closest('.card').remove()">✖️ Excluir</button>
            </div>
        </div>
    `
  container.insertAdjacentHTML("beforeend", cardHTML)
}

function addServicoToList(servico) {
  const container = document.getElementById("servicos-list")
  const cardHTML = `
        <div class="card">
            <div class="card-image"></div>
            <div class="card-content">
                <div class="card-title">${servico.titulo}</div>
                <div class="card-subtitle">${servico.preco}</div>
                <div class="card-subtitle">${servico.pagamento}</div>
            </div>
            <div class="card-content">
                <div class="card-title">${servico.descricao}</div>
            </div>
            <div class="card-actions">
                <button class="btn-small btn-edit" onclick="openModalForEdit('servicos', this.closest('.card'))">✏️ Editar</button>
                <button class="btn-small btn-delete" onclick="this.closest('.card').remove()">✖️ Excluir</button>
            </div>
        </div>
    `
  container.insertAdjacentHTML("beforeend", cardHTML)
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-delete")) {
    if (confirm("Tem certeza que deseja excluir este item?")) {
      e.target.closest(".card").remove()
    }
  } else if (e.target.classList.contains("btn-edit")) {
    const card = e.target.closest(".card")
    const isColaborador = card.closest("#colaboradores-list")
    const type = isColaborador ? "colaboradores" : "servicos"
    openModalForEdit(type, card)
  }
})
// Importar o nav em todas as páginas
document.addEventListener("DOMContentLoaded", () => {
  fetch("../NAVEGACAO_WEB/menu.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("sidebar-container").innerHTML = data

      // depois de carregar, ativar o JS do menu
      initSidebar()
    })
})

// Sidebar toggle functionality
function initSidebar() {
const menuToggle = document.getElementById("menuToggle")
const sidebar = document.getElementById("sidebar")
const mainContent = document.getElementById("mainContent")
const overlay = document.getElementById("overlay")

function toggleSidebar() {
  sidebar.classList.toggle("active")
  mainContent.classList.toggle("sidebar-open")
  overlay.classList.toggle("active")
}

function closeSidebar() {
  sidebar.classList.remove("active")
  mainContent.classList.remove("sidebar-open")
  overlay.classList.remove("active")
}

menuToggle.addEventListener("click", toggleSidebar)
overlay.addEventListener("click", closeSidebar)

// Abrir/fechar submenu de Serviços
const servicosNav = document.querySelector(".nav-item:nth-child(2)") // pega o "Serviços"
servicosNav.addEventListener("click", (e) => {
  e.preventDefault()
  servicosNav.classList.toggle("open")
})    
}