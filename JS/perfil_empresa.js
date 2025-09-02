// Auto-save functionality
class BusinessProfile {
  constructor() {
    this.initializeElements()
    this.loadSavedData()
    this.setupEventListeners()
    this.setupAutoResize()
  }

  initializeElements() {
    // Company info elements
    this.companyName = document.querySelector(".company-name")
    this.companyPhone = document.querySelector(".company-phone")
    this.companyEmail = document.querySelector(".company-email")
    this.companyDescription = document.querySelector(".company-description textarea")

    // Service elements
    this.serviceTitles = document.querySelectorAll(".service-title")
    this.serviceDescriptions = document.querySelectorAll(".service-description")
  }

  setupEventListeners() {
    // Company info auto-save
    ;[this.companyName, this.companyPhone, this.companyEmail, this.companyDescription].forEach((element) => {
      if (element) {
        element.addEventListener("input", () => this.saveData())
        element.addEventListener("blur", () => this.saveData())
      }
    })

    // Services auto-save
    this.serviceTitles.forEach((title, index) => {
      title.addEventListener("input", () => this.saveServiceData(index))
      title.addEventListener("blur", () => this.saveServiceData(index))
    })

    this.serviceDescriptions.forEach((description, index) => {
      description.addEventListener("input", () => this.saveServiceData(index))
      description.addEventListener("blur", () => this.saveServiceData(index))
    })
  }

  setupAutoResize() {
    // Auto-resize textareas
    const textareas = document.querySelectorAll("textarea")
    textareas.forEach((textarea) => {
      textarea.addEventListener("input", () => this.autoResize(textarea))
      // Initial resize
      this.autoResize(textarea)
    })
  }

  autoResize(textarea) {
    textarea.style.height = "auto"
    textarea.style.height = textarea.scrollHeight + "px"
  }

  saveData() {
    const companyData = {
      name: this.companyName?.value || "",
      phone: this.companyPhone?.value || "",
      email: this.companyEmail?.value || "",
      description: this.companyDescription?.value || "",
    }

    localStorage.setItem("businessProfile_company", JSON.stringify(companyData))
  }

  saveServiceData(index) {
    const services = JSON.parse(localStorage.getItem("businessProfile_services")) || []

    services[index] = {
      title: this.serviceTitles[index]?.value || "",
      description: this.serviceDescriptions[index]?.value || "",
    }

    localStorage.setItem("businessProfile_services", JSON.stringify(services))
  }

  loadSavedData() {
    // Load company data
    const companyData = JSON.parse(localStorage.getItem("businessProfile_company"))
    if (companyData) {
      if (this.companyName) this.companyName.value = companyData.name || ""
      if (this.companyPhone) this.companyPhone.value = companyData.phone || ""
      if (this.companyEmail) this.companyEmail.value = companyData.email || ""
      if (this.companyDescription) this.companyDescription.value = companyData.description || ""
    }

    // Load services data
    const servicesData = JSON.parse(localStorage.getItem("businessProfile_services")) || []
    servicesData.forEach((service, index) => {
      if (this.serviceTitles[index]) {
        this.serviceTitles[index].value = service.title || ""
      }
      if (this.serviceDescriptions[index]) {
        this.serviceDescriptions[index].value = service.description || ""
      }
    })
  }

  // Method to clear all data
  clearAllData() {
    localStorage.removeItem("businessProfile_company")
    localStorage.removeItem("businessProfile_services")
    location.reload()
  }

  // Method to export data
  exportData() {
    const companyData = JSON.parse(localStorage.getItem("businessProfile_company")) || {}
    const servicesData = JSON.parse(localStorage.getItem("businessProfile_services")) || []

    const exportData = {
      company: companyData,
      services: servicesData,
      exportDate: new Date().toISOString(),
    }

    const dataStr = JSON.stringify(exportData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })

    const link = document.createElement("a")
    link.href = URL.createObjectURL(dataBlob)
    link.download = "business-profile.json"
    link.click()
  }
}

// Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const businessProfile = new BusinessProfile()

  // Make methods available globally for debugging
  window.businessProfile = businessProfile

  // Add keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    // Ctrl/Cmd + S to save (though auto-save is already active)
    if ((e.ctrlKey || e.metaKey) && e.key === "s") {
      e.preventDefault()
      businessProfile.saveData()
      console.log("Data saved manually")
    }

    // Ctrl/Cmd + E to export data
    if ((e.ctrlKey || e.metaKey) && e.key === "e") {
      e.preventDefault()
      businessProfile.exportData()
    }
  })
})

// Add some utility functions
function formatPhoneNumber(input) {
  // Simple phone formatting for Brazilian numbers
  let value = input.value.replace(/\D/g, "")
  if (value.length >= 11) {
    value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
  } else if (value.length >= 7) {
    value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3")
  } else if (value.length >= 3) {
    value = value.replace(/(\d{2})(\d{0,5})/, "($1) $2")
  }
  input.value = value
}

// Apply phone formatting to phone input
document.addEventListener("DOMContentLoaded", () => {
  const phoneInput = document.querySelector(".company-phone")
  if (phoneInput) {
    phoneInput.addEventListener("input", () => formatPhoneNumber(phoneInput))
  }
})
