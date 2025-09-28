class CarouselManager {
  constructor() {
    this.currentSlide = 0
    this.slides = document.querySelectorAll(".slide")
    this.indicators = document.querySelectorAll(".indicator")
    this.isPlaying = true
    this.intervalId = null

    this.init()
  }

  init() {
    // Botones de control
    document.querySelector(".prev-btn").addEventListener("click", () => this.prevSlide())
    document.querySelector(".next-btn").addEventListener("click", () => this.nextSlide())
    document.querySelector(".pause-btn").addEventListener("click", () => this.togglePlay())

    // Indicadores
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => this.goToSlide(index))
    })

    // Iniciar reproducción automática
    this.startAutoPlay()

    // Pausar al hacer hover
    document.querySelector(".carousel-section").addEventListener("mouseenter", () => {
      if (this.isPlaying) {
        this.pauseAutoPlay()
      }
    })

    document.querySelector(".carousel-section").addEventListener("mouseleave", () => {
      if (this.isPlaying) {
        this.startAutoPlay()
      }
    })
  }

  goToSlide(index) {
    // Remover clase active de slide actual
    this.slides[this.currentSlide].classList.remove("active")
    this.indicators[this.currentSlide].classList.remove("active")

    // Actualizar índice
    this.currentSlide = index

    // Agregar clase active al nuevo slide
    this.slides[this.currentSlide].classList.add("active")
    this.indicators[this.currentSlide].classList.add("active")
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.slides.length
    this.goToSlide(nextIndex)
  }

  prevSlide() {
    const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length
    this.goToSlide(prevIndex)
  }

  startAutoPlay() {
    this.intervalId = setInterval(() => {
      this.nextSlide()
    }, 5000)
  }

  pauseAutoPlay() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }

  togglePlay() {
    const pauseBtn = document.querySelector(".pause-btn")

    if (this.isPlaying) {
      this.pauseAutoPlay()
      this.isPlaying = false
      // Cambiar icono a play
      pauseBtn.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="5,3 19,12 5,21"/>
                </svg>
            `
    } else {
      this.startAutoPlay()
      this.isPlaying = true
      // Cambiar icono a pause
      pauseBtn.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="6" y="4" width="4" height="16"/>
                    <rect x="14" y="4" width="4" height="16"/>
                </svg>
            `
    }
  }
}

// Validación de formulario
class FormValidator {
  constructor() {
    this.rutInput = document.getElementById("rut")
    this.passwordInput = document.getElementById("password")
    this.togglePasswordBtn = document.querySelector(".toggle-password")

    this.init()
  }

  init() {
    // Formateo de RUT
    this.rutInput.addEventListener("input", (e) => this.formatRUT(e))
    this.rutInput.addEventListener("blur", (e) => this.validateRUT(e))

    // Validación de contraseña
    this.passwordInput.addEventListener("blur", (e) => this.validatePassword(e))

    // Toggle password visibility
    this.togglePasswordBtn.addEventListener("click", () => this.togglePasswordVisibility())

    // Validación del formulario
    document.querySelector("form").addEventListener("submit", (e) => this.handleSubmit(e))
  }

  formatRUT(e) {
    let value = e.target.value.replace(/[^0-9kK]/g, "")

    if (value.length > 1) {
      const body = value.slice(0, -1)
      const dv = value.slice(-1)
      value = body.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "-" + dv
    }

    e.target.value = value
  }

  validateRUT(e) {
    const errorMsg = e.target.parentNode.querySelector(".error-message")

    if (!e.target.value.trim()) {
      errorMsg.style.display = "block"
      e.target.style.borderColor = "#ef4444"
    } else {
      errorMsg.style.display = "none"
      e.target.style.borderColor = "#e5e7eb"
    }
  }

  validatePassword(e) {
    const errorMsg = e.target.parentNode.parentNode.querySelector(".error-message")

    if (!e.target.value.trim()) {
      errorMsg.style.display = "block"
      e.target.style.borderColor = "#ef4444"
    } else {
      errorMsg.style.display = "none"
      e.target.style.borderColor = "#e5e7eb"
    }
  }

  togglePasswordVisibility() {
    const type = this.passwordInput.type === "password" ? "text" : "password"
    this.passwordInput.type = type

    // Cambiar icono
    const icon =
      type === "password"
        ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
            </svg>`
        : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
            </svg>`

    this.togglePasswordBtn.innerHTML = icon
  }

  handleSubmit(e) {
    e.preventDefault()

    // Validar todos los campos
    this.validateRUT({ target: this.rutInput })
    this.validatePassword({ target: this.passwordInput })

    const hasErrors = document.querySelectorAll('.error-message[style*="block"]').length > 0

    if (!hasErrors && this.rutInput.value.trim() && this.passwordInput.value.trim()) {
      console.log("Formulario válido - redirigiendo...")
      // Aquí iría la lógica de login
    }
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  new CarouselManager()
  new FormValidator()
})
