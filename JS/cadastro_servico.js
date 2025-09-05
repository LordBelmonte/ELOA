// Service modal elements
const serviceModal = document.getElementById("serviceModal")
const closeModal = document.getElementById("closeModal")
const registerBtn = document.querySelector(".register-btn")
const serviceForm = document.getElementById("serviceForm")
//const uploadBtn = document.getElementById("uploadBtn")
const overlay = document.getElementById("overlay")
const serviceImage = document.getElementById("serviceImage");
const previewImage = document.getElementById("previewImage");

let isEditMode = false
let currentServiceId = null
let selectedFile = null // Guarda a imagem selecionada

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
  selectedFile = null
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
  document.getElementById("serviceCategory").value = serviceData.category || "Administrativo"
  document.getElementById("servicePricing").value = serviceData.pricing
  document.getElementById("paymentMethod").value = serviceData.payment

  // Open modal
  openServiceModal()
}

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

/* Form submission handler
serviceForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const formData = {
    titulo_servico: document.getElementById("serviceTitle").value,
    desc_servico: document.getElementById("serviceDescription").value,
    categoria_servico: document.getElementById("serviceCategory").value,
    precificacao: document.getElementById("servicePricing").value,
    forma_pagamento: document.getElementById("paymentMethod").value,
    img_servico: selectedFile || null
  }

  if (isEditMode) {
    console.log("Serviço editado (ID: " + currentServiceId + "):", formData)
    const serviceCard = document.querySelector(`[data-service-id="${currentServiceId}"]`)
    if (serviceCard) {
      serviceCard.dataset.title = formData.titulo_servico
      serviceCard.dataset.description = formData.desc_servico
      serviceCard.dataset.pricing = formData.precificacao
      serviceCard.dataset.payment = formData.forma_pagamento
      serviceCard.dataset.category = formData.categoria_servico

      serviceCard.querySelector("h3").textContent = formData.titulo_servico
      const paragraphs = serviceCard.querySelectorAll(".service-info p")
      paragraphs[0].textContent = formData.precificacao
      paragraphs[1].textContent = formData.forma_pagamento
    }
    //alert("Serviço atualizado com sucesso!")
  } else {
    //console.log("Novo serviço cadastrado:", formData)
    //alert("Serviço cadastrado com sucesso!")
  }

  closeServiceModal()
})
*/

serviceImage.addEventListener('change', () => {
    const file = serviceImage.files[0];
    if(file) {
        const reader = new FileReader();
        reader.onload = e => {
            previewImage.src = e.target.result;
            previewImage.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        previewImage.src = '';
        previewImage.style.display = 'none';
    }
});


// Upload button handler
/*uploadBtn.addEventListener("click", () => {
  const input = document.createElement("input")
  input.type = "file"
  input.accept = "image/*"
  input.onchange = (e) => {
    const file = e.target.files[0]
    if (file) {
      selectedFile = file
      console.log("Imagem selecionada:", file.name)
      alert("Imagem selecionada: " + file.name)
    }
  }
  input.click()
})
*/
