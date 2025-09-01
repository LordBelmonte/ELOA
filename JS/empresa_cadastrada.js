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
  const locationFilter = document.getElementById("locationFilter").value
  const areaFilter = document.getElementById("areaFilter").value

  filteredCompanies = companies.filter((company) => {
    const locationMatch = !locationFilter || company.location.toLowerCase().includes(locationFilter.replace("-", " "))
    const areaMatch = !areaFilter || company.area.toLowerCase().includes(areaFilter)
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

function openInstagram(companyName) {
  alert(`Abrindo Instagram da empresa: ${companyName}`)
}

function toggleDropdown(index) {
  const dropdown = document.getElementById(`dropdown-${index}`)
  const isVisible = dropdown.classList.contains("show")

  // Close all other dropdowns
  document.querySelectorAll(".dropdown-content").forEach((d) => d.classList.remove("show"))

  // Toggle current dropdown
  if (!isVisible) {
    dropdown.classList.add("show")
  }
}

function viewProfile(companyName) {
  alert(`Visualizando perfil da empresa: ${companyName}`)
  // Close dropdown
  document.querySelectorAll(".dropdown-content").forEach((d) => d.classList.remove("show"))
}

function deleteCompany(index, companyName) {
  if (confirm(`Tem certeza que deseja excluir a empresa "${companyName}"?`)) {
    // Remove from filtered companies array
    const originalIndex = companies.findIndex((c) => c.name === companyName)
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

// Navigation functionality
document.querySelectorAll(".nav-item").forEach((item) => {
  item.addEventListener("click", function () {
    document.querySelectorAll(".nav-item").forEach((nav) => nav.classList.remove("active"))
    this.classList.add("active")
  })
})

// Header actions
document.querySelector(".add-members").addEventListener("click", () => {
  alert("Funcionalidade de adicionar membros")
})

document.querySelectorAll(".header-icon").forEach((icon) => {
  icon.addEventListener("click", function () {
    const iconText = this.textContent
    if (iconText === "🔍") {
      alert("Funcionalidade de busca")
    } else if (iconText === "🔔") {
      alert("Notificações")
    } else if (iconText === "👤") {
      alert("Perfil do usuário")
    }
  })
})

// Logout functionality
document.querySelector(".logout").addEventListener("click", () => {
  if (confirm("Tem certeza que deseja sair?")) {
    alert("Logout realizado com sucesso!")
  }
})

// Initialize the page
renderCompanies()
