// Theme Toggle Functionality
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Load saved theme or default to light
const savedTheme = localStorage.getItem("theme") || "light";
body.setAttribute("data-theme", savedTheme);
updateThemeToggle();

themeToggle.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeToggle();
});

function updateThemeToggle() {
  const theme = body.getAttribute("data-theme");
  themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
}

// Smooth Scrolling Navigation
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    // Update active nav link
    navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");

    // Smooth scroll to section
    targetSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

// Update active nav link on scroll
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const scrollPos = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
});

// Modal Functionality
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Close modal when clicking outside
document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });
});

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal.active").forEach((modal) => {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  }
});

// Contact Form Validation and Submission
const contactForm = document.getElementById("contactForm");
const formResponse = document.getElementById("formResponse");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form data
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Reset previous response
  formResponse.style.display = "none";
  formResponse.className = "form-response";

  // Validation
  if (!name || !email || !message) {
    showFormResponse("Please fill in all fields.", "error");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showFormResponse("Please enter a valid email address.", "error");
    return;
  }

  // Simulate form submission
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.textContent = "Sending...";
  submitButton.disabled = true;

  setTimeout(() => {
    showFormResponse(
      "Thank you for your message! I'll get back to you soon.",
      "success"
    );
    contactForm.reset();
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }, 1500);
});

function showFormResponse(message, type) {
  formResponse.textContent = message;
  formResponse.className = `form-response ${type}`;
  formResponse.style.display = "block";

  // Auto-hide success messages after 5 seconds
  if (type === "success") {
    setTimeout(() => {
      formResponse.style.display = "none";
    }, 5000);
  }
}

// Scroll Reveal Animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");
    }
  });
}, observerOptions);

// Observe all scroll-reveal elements
document.querySelectorAll(".scroll-reveal").forEach((el) => {
  observer.observe(el);
});
