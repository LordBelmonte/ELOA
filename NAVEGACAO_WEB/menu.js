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
