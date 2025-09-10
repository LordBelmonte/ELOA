function handlePartnership() {
  alert("Solicitação de parceria enviada!")
}

// Adicionar animações de entrada
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".service-card, .collaborator-card")

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }, index * 100)
      }
    })
  })

  cards.forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(20px)"
    card.style.transition = "all 0.6s ease"
    observer.observe(card)
  })
})

// Funcionalidade para adicionar novos serviços (exemplo)
function addService(title, description) {
  const servicesGrid = document.getElementById("services-grid")
  const newCard = document.createElement("div")
  newCard.className = "service-card"
  newCard.innerHTML = `
        <div class="service-logo">
            <div class="logo-placeholder">LOGO<br>EMPRESA</div>
        </div>
        <div class="service-title">${title}</div>
        <div class="service-description">${description}</div>
    `
  servicesGrid.appendChild(newCard)
}

// Funcionalidade para adicionar novos colaboradores (exemplo)
function addCollaborator(name, role) {
  const collaboratorsGrid = document.getElementById("collaborators-grid")
  const newCard = document.createElement("div")
  newCard.className = "collaborator-card"
  newCard.innerHTML = `
        <div class="collaborator-name">${name}</div>
        <div class="collaborator-photo">
            <div class="photo-placeholder">Foto do<br>colaborador</div>
        </div>
        <div class="collaborator-role">${role}</div>
    `
  collaboratorsGrid.appendChild(newCard)
}
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
