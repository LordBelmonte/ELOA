class MentoriaManager {
  constructor() {
    this.cards = document.querySelectorAll(".mentoring-card")
    this.init()
  }

  init() {
    this.loadData()
    this.setupEventListeners()
    this.setupAutoResize()
  }

  setupEventListeners() {
    this.cards.forEach((card) => {
      const inputs = card.querySelectorAll("input, textarea")

      inputs.forEach((input) => {
        // Auto-save on input
        input.addEventListener("input", () => {
          this.saveData()
          this.autoResize(input)
        })

        // Enhanced focus effects
        input.addEventListener("focus", () => {
          card.style.transform = "translateY(-4px)"
          card.style.boxShadow = "0 12px 30px rgba(156, 136, 255, 0.4)"
        })

        input.addEventListener("blur", () => {
          card.style.transform = "translateY(-2px)"
          card.style.boxShadow = "0 8px 25px rgba(156, 136, 255, 0.3)"
        })
      })

      // Time input formatting
      const timeInput = card.querySelector(".event-time")
      timeInput.addEventListener("input", (e) => {
        this.formatTimeInput(e.target)
      })
    })

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "s":
            e.preventDefault()
            this.saveData()
            this.showSaveNotification()
            break
          case "e":
            e.preventDefault()
            this.exportData()
            break
        }
      }
    })
  }

  setupAutoResize() {
    const textareas = document.querySelectorAll(".event-description")
    textareas.forEach((textarea) => {
      this.autoResize(textarea)
    })
  }

  autoResize(element) {
    if (element.tagName === "TEXTAREA") {
      element.style.height = "auto"
      element.style.height = Math.max(60, element.scrollHeight) + "px"
    }
  }

  formatTimeInput(input) {
    let value = input.value.replace(/[^\d]/g, "")

    if (value.length >= 2) {
      value = value.substring(0, 2) + ":" + value.substring(2, 4)
    }

    input.value = value
  }

  saveData() {
    const data = {}

    this.cards.forEach((card) => {
      const cardId = card.dataset.card
      const title = card.querySelector(".event-title").value
      const time = card.querySelector(".event-time").value
      const description = card.querySelector(".event-description").value

      data[cardId] = { title, time, description }
    })

    localStorage.setItem("mentoriaData", JSON.stringify(data))
  }

  loadData() {
    const savedData = localStorage.getItem("mentoriaData")

    if (savedData) {
      const data = JSON.parse(savedData)

      this.cards.forEach((card) => {
        const cardId = card.dataset.card
        const cardData = data[cardId]

        if (cardData) {
          card.querySelector(".event-title").value = cardData.title || ""
          card.querySelector(".event-time").value = cardData.time || ""
          card.querySelector(".event-description").value = cardData.description || ""
        }
      })
    }
  }

  exportData() {
    const data = {}

    this.cards.forEach((card) => {
      const cardId = card.dataset.card
      const title = card.querySelector(".event-title").value
      const time = card.querySelector(".event-time").value
      const description = card.querySelector(".event-description").value

      if (title || time || description) {
        data[`Mentoria ${cardId}`] = { title, time, description }
      }
    })

    const dataStr = JSON.stringify(data, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)

    const link = document.createElement("a")
    link.href = url
    link.download = "mentorias.json"
    link.click()

    URL.revokeObjectURL(url)
  }

  showSaveNotification() {
    const notification = document.createElement("div")
    notification.textContent = "Dados salvos!"
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4caf50;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 500;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `

    document.body.appendChild(notification)

    setTimeout(() => {
      notification.remove()
    }, 2000)
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new MentoriaManager()
})

// Add CSS animation for notifications
const style = document.createElement("style")
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`
document.head.appendChild(style)
