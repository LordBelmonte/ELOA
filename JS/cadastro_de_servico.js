// Sidebar toggle functionality
const menuToggle = document.getElementById("menuToggle")
const sidebar = document.getElementById("sidebar")
const mainContent = document.getElementById("mainContent")
const overlay = document.getElementById("overlay")

// Service modal elements
const serviceModal = document.getElementById("serviceModal")
const closeModal = document.getElementById("closeModal")
const registerBtn = document.querySelector(".register-btn")
const serviceForm = document.getElementById("serviceForm")
const uploadBtn = document.getElementById("uploadBtn")

let isEditMode = false
let currentServiceId = null

function toggleSidebar() {
  sidebar.classList.toggle("open")
  mainContent.classList.toggle("sidebar-open")
  overlay.classList.toggle("active")
}

function closeSidebar() {
  sidebar.classList.remove("open")
  mainContent.classList.remove("sidebar-open")
  overlay.classList.remove("active")
}

// Modal functions
function openServiceModal() {
  serviceModal.classList.add("active")
  overlay.classList.add("active")
}

function closeServiceModal() {
  serviceModal.classList.remove("active")
  overlay.classList.remove("active")
  serviceForm.reset()
  isEditMode = false
  currentServiceId = null
  document.querySelector(".modal-header h2").textContent = "Cadastro de serviços"
}

function editService(button) {
  const serviceCard = button.closest(".service-card")
  const serviceData = {
    id: serviceCard.dataset.serviceId,
    title: serviceCard.dataset.title,
    description: serviceCard.dataset.description,
    pricing: serviceCard.dataset.pricing,
    payment: serviceCard.dataset.payment,
  }

  // Set edit mode
  isEditMode = true
  currentServiceId = serviceData.id

  // Update modal title
  document.querySelector(".modal-header h2").textContent = "Editar serviço"

  // Populate form fields
  document.getElementById("serviceTitle").value = serviceData.title
  document.getElementById("serviceDescription").value = serviceData.description
  document.getElementById("servicePricing").value = serviceData.pricing
  document.getElementById("paymentMethod").value = serviceData.payment

  // Open modal
  openServiceModal()
}

menuToggle.addEventListener("click", toggleSidebar)

overlay.addEventListener("click", () => {
  if (serviceModal.classList.contains("active")) {
    closeServiceModal()
  } else {
    closeSidebar()
  }
})

// Modal event listeners
registerBtn.addEventListener("click", openServiceModal)
closeModal.addEventListener("click", closeServiceModal)

// Close modal on escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (serviceModal.classList.contains("active")) {
      closeServiceModal()
    } else {
      closeSidebar()
    }
  }
})

// Form submission handler
serviceForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const formData = {
    title: document.getElementById("serviceTitle").value,
    description: document.getElementById("serviceDescription").value,
    pricing: document.getElementById("servicePricing").value,
    payment: document.getElementById("paymentMethod").value,
  }

  if (isEditMode) {
    console.log("Serviço editado (ID: " + currentServiceId + "):", formData)

    // Update the service card with new data
    const serviceCard = document.querySelector(`[data-service-id="${currentServiceId}"]`)
    if (serviceCard) {
      serviceCard.dataset.title = formData.title
      serviceCard.dataset.description = formData.description
      serviceCard.dataset.pricing = formData.pricing
      serviceCard.dataset.payment = formData.payment

      // Update displayed content
      serviceCard.querySelector("h3").textContent = formData.title
      const paragraphs = serviceCard.querySelectorAll(".service-info p")
      paragraphs[0].textContent = formData.pricing
      paragraphs[1].textContent = formData.payment
    }

    alert("Serviço atualizado com sucesso!")
  } else {
    console.log("Novo serviço cadastrado:", formData)
    alert("Serviço cadastrado com sucesso!")
  }

  closeServiceModal()
})

// Upload button handler
uploadBtn.addEventListener("click", () => {
  const input = document.createElement("input")
  input.type = "file"
  input.accept = "image/*"
  input.onchange = (e) => {
    const file = e.target.files[0]
    if (file) {
      console.log("Imagem selecionada:", file.name)
      alert("Imagem selecionada: " + file.name)
    }
  }
  input.click()
})
