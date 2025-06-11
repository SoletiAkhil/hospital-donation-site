// Copy to clipboard with feedback
function copyToClipboard(elementId, btn) {
  const text = document.getElementById(elementId).innerText;
  navigator.clipboard.writeText(text).then(() => {
    btn.innerText = "Copied!";
    btn.classList.add("copied");
    setTimeout(() => {
      btn.innerText = "Copy";
      btn.classList.remove("copied");
    }, 1200);
  });
}

// Initialize intl-tel-input for phone input
const phoneInput = document.querySelector("#phone");
if (phoneInput) {
  window.intlTelInput(phoneInput, {
    initialCountry: "in",
    separateDialCode: true,
    utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@17/build/js/utils.js",
  });
}

// Modal logic
const form = document.getElementById("donationForm");
const donationModal = document.getElementById("donationModal");
const completeBtn = document.getElementById("completeBtn");
const thankYouModal = document.getElementById("thankYouModal");
const closeThankYouBtn = document.getElementById("closeThankYou");

// Hide modals on load
if (donationModal) donationModal.style.display = "none";
if (thankYouModal) thankYouModal.style.display = "none";

// Show donation modal on form submit
if (form && donationModal) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    donationModal.style.display = "flex";
  });
}

// On completed, hide donation modal, reset form, show thank you modal
if (completeBtn && donationModal && thankYouModal && form) {
  completeBtn.addEventListener("click", () => {
    donationModal.style.display = "none";
    form.reset();
    thankYouModal.style.display = "flex";
  });
}

// Close thank you modal
if (closeThankYouBtn && thankYouModal) {
  closeThankYouBtn.addEventListener("click", () => {
    thankYouModal.style.display = "none";
  });
}

// Optional: Close modal if user clicks outside modal-content
window.addEventListener("click", (event) => {
  if (donationModal && event.target === donationModal) {
    donationModal.style.display = "none";
  }
  if (thankYouModal && event.target === thankYouModal) {
    thankYouModal.style.display = "none";
  }
});