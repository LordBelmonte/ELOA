// Sample company data
const companies = [
  { name: "Nome da empresa", location: "São Paulo", area: "Tecnologia" },
  { name: "Nome da empresa", location: "Rio de Janeiro", area: "Marketing" },
  { name: "Nome da empresa", location: "Belo Horizonte", area: "Consultoria" },
  { name: "Nome da empresa", location: "Brasília", area: "Financeiro" },
  { name: "Nome da empresa", location: "São Paulo", area: "Marketing" },
  { name: "Nome da empresa", location: "Rio de Janeiro", area: "Tecnologia" },
  { name: "Nome da empresa", location: "Belo Horizonte", area: "Financeiro" },
  { name: "Nome da empresa", location: "Brasília", area: "Consultoria" },
  { name: "Nome da empresa", location: "São Paulo", area: "Consultoria" },
  { name: "Nome da empresa", location: "Rio de Janeiro", area: "Financeiro" },
  { name: "Nome da empresa", location: "Belo Horizonte", area: "Tecnologia" },
  { name: "Nome da empresa", location: "Brasília", area: "Marketing" },
]

let filteredCompanies = [...companies]

function renderCompanies(companiesToRender = filteredCompanies) {
  const grid = document.getElementById("companiesGrid")
  if (!grid) {
    console.error("Element with ID 'companiesGrid' not found")
    return
  }

  grid.innerHTML = ""

  companiesToRender.forEach((company, index) => {
    const card = document.createElement("div")
    card.className = "company-card"
    card.innerHTML = `
            <div class="company-avatar">👤</div>
            <div class="company-info">
                <h4>${company.name}</h4>
                <p>Localização: ${company.location}</p>
                <p>Área de Atuação: ${company.area}</p>
            </div>
            <div class="company-actions">
                <button class="partnership-btn" onclick="requestPartnership('${company.name}')">Parceria</button>
                <div class="contact-icons">
                    <div class="contact-icon whatsapp" onclick="openWhatsApp('${company.name}')">📱</div>
                    <div class="menu-dropdown">
                        <div class="menu-dots" onclick="toggleDropdown(${index})">⋯</div>
                        <div class="dropdown-content" id="dropdown-${index}">
                            <div class="dropdown-item delete" onclick="deleteCompany(${index}, '${company.name}')">🗑️ Excluir empresa</div>
                        </div>
                    </div>
                </div>
            </div>
        `
    grid.appendChild(card)
  })
}

function applyFilters() {
  const locationFilter = document.getElementById("locationFilter")
  const areaFilter = document.getElementById("areaFilter")

  if (!locationFilter || !areaFilter) {
    console.error("Filter elements not found")
    return
  }

  const locationValue = locationFilter.value
  const areaValue = areaFilter.value

  filteredCompanies = companies.filter((company) => {
    const locationMatch = !locationValue || company.location.toLowerCase().includes(locationValue.replace("-", " "))
    const areaMatch = !areaValue || company.area.toLowerCase().includes(areaValue)
    return locationMatch && areaMatch
  })

  renderCompanies(filteredCompanies)
}

function requestPartnership(companyName) {
  alert(`Solicitação de parceria enviada para: ${companyName}`)
}

function openWhatsApp(companyName) {
  const message = encodeURIComponent(`Olá! Gostaria de saber mais sobre a ${companyName}.`)
  window.open(`https://wa.me/?text=${message}`, "_blank")
}

function toggleDropdown(index) {
  const dropdown = document.getElementById(`dropdown-${index}`)
  if (!dropdown) return

  const isVisible = dropdown.classList.contains("show")

  // Close all other dropdowns
  document.querySelectorAll(".dropdown-content").forEach((d) => d.classList.remove("show"))

  // Toggle current dropdown
  if (!isVisible) {
    dropdown.classList.add("show")
  }
}

function deleteCompany(index, companyName) {
  if (confirm(`Tem certeza que deseja excluir a empresa "${companyName}"?`)) {
    // Remove from original companies array
    const originalIndex = companies.findIndex(
      (c, i) => c.name === companyName && c.location === filteredCompanies[index]?.location,
    )

    if (originalIndex > -1) {
      companies.splice(originalIndex, 1)
    }

    // Re-apply current filters and re-render
    applyFilters()
    alert(`Empresa "${companyName}" foi excluída com sucesso!`)
  }
  // Close dropdown
  document.querySelectorAll(".dropdown-content").forEach((d) => d.classList.remove("show"))
}

document.addEventListener("click", (event) => {
  if (!event.target.closest(".menu-dropdown")) {
    document.querySelectorAll(".dropdown-content").forEach((d) => d.classList.remove("show"))
  }
})

document.addEventListener("DOMContentLoaded", () => {
  renderCompanies()
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