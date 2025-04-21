document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const navLinks = document.getElementById('navLinks');
  toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Login Modal
  const loginBtn = document.getElementById('loginBtn');
  const loginModal = document.getElementById('loginModal');
  const closeBtn = document.getElementById('closeLogin');

  loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.style.display = 'flex';
  });

  closeBtn.addEventListener('click', () => {
    loginModal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
      loginModal.style.display = 'none';
    }
  });

  // Pricing Modal
  const openPricing = document.getElementById("openPricing");
  const pricingModal = document.getElementById("pricingModal");
  const closePricing = document.getElementById("closePricing");

  openPricing.addEventListener("click", (e) => {
    e.preventDefault();
    pricingModal.style.display = "block";
  });

  closePricing.addEventListener("click", () => {
    pricingModal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === pricingModal) {
      pricingModal.style.display = "none";
    }
  });

  // About Modal (✅ moved inside)
  const openAbout = document.getElementById("aboutBtn");
  const aboutModal = document.getElementById("aboutModal");
  const closeAbout = document.getElementById("closeAbout");

  openAbout.addEventListener("click", (e) => {
    e.preventDefault();
    aboutModal.style.display = "flex";
  });

  closeAbout.addEventListener("click", () => {
    aboutModal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === aboutModal) {
      aboutModal.style.display = "none";
    }
  });

  document.getElementById("chatToggle").addEventListener("click", () => { //slide to next page
    window.location.href = "chatbot.html";
  });
});

document.getElementById("signupBtn").addEventListener("click", function (e) {
e.preventDefault();

const name = document.getElementById("signupName").value;
const email = document.getElementById("signupEmail").value;

if (name && email) {
  localStorage.setItem("userName", name);
  localStorage.setItem("userEmail", email);
  
  // Optional: redirect to chatbot page
  window.location.href = "chatbot.html"; // Replace with actual chatbot page path
}
});