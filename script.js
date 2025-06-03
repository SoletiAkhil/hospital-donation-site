const form = document.getElementById('donationForm');
const mobileInput = document.querySelector("#mobile");
const modal = document.getElementById('donationModal');
const closeModalBtn = document.getElementById('closeModal');
const iti = window.intlTelInput(mobileInput, {
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    separateDialCode: true,
});

form.addEventListener('submit', function(event) {
  event.preventDefault(); // prevent actual form submission

  // Validate the form if needed here (HTML validation is already on inputs)

  // Show the modal
  modal.style.display = 'block';

  // Optionally, clear the form or keep data
  // form.reset();
});

// Close modal when user clicks on "X"
closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Also close modal if user clicks outside the modal-content
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});
