// Sidebar toggle functionality
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

// Event listeners
menuToggle.addEventListener("click", toggleSidebar)
overlay.addEventListener("click", closeSidebar)

// Navigation functionality
const navItems = document.querySelectorAll(".nav-item")
navItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault()

    // Remove active class from all items
    navItems.forEach((nav) => nav.classList.remove("active"))

    // Add active class to clicked item
    item.classList.add("active")

    // Close sidebar on mobile
    if (window.innerWidth <= 768) {
      closeSidebar()
    }
  })
})

// Close sidebar on window resize
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    closeSidebar()
  }
})

// Service card hover effects
const serviceCards = document.querySelectorAll(".service-card")
serviceCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-5px)"
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)"
  })
})
