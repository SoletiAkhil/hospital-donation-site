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
document.addEventListener('DOMContentLoaded', function () {
  // Elements
  const donationForm = document.getElementById('donationForm');
  const donationModal = document.getElementById('donationModal');
  const bankDetailsModal = document.getElementById('bankDetailsModal');
  const thankYouModal = document.getElementById('thankYouModal');
  const closeDonationModal = document.getElementById('closeDonationModal');
  const closeBankDetailsModal = document.getElementById('closeBankDetailsModal');
  const completedDonationBtn = document.getElementById('completedDonationBtn');
  const closeThankYou = document.getElementById('closeThankYou');
  const donateBtn = document.getElementById('donateBtn');
  // Prevent closing bankDetailsModal when clicking outside
  if (bankDetailsModal) {
    bankDetailsModal.addEventListener('click', function (e) {
      // Only close if NOT bankDetailsModal
      if (e.target === bankDetailsModal) {
        // Do nothing (prevent closing)
      }
    });
  }
  // Open donation modal
  if (donateBtn && donationModal) {
    donateBtn.addEventListener('click', function () {
      donationModal.style.display = 'flex';
    });
  }

  // Close donation modal
  if (closeDonationModal && donationModal) {
    closeDonationModal.addEventListener('click', function () {
      donationModal.style.display = 'none';
    });
  }

  // On form submit, show bank details modal
  if (donationForm && bankDetailsModal && donationModal) {
    donationForm.addEventListener('submit', function (e) {
      e.preventDefault();
      donationModal.style.display = 'none';
      bankDetailsModal.style.display = 'flex';
    });
  }

  // Close bank details modal
  if (closeBankDetailsModal && bankDetailsModal) {
    closeBankDetailsModal.addEventListener('click', function () {
      bankDetailsModal.style.display = 'none';
    });
  }

  // On completed, show thank you modal
  if (completedDonationBtn && bankDetailsModal && thankYouModal) {
    completedDonationBtn.addEventListener('click', function (e) {
      e.preventDefault();
      bankDetailsModal.style.display = 'none';
      thankYouModal.style.display = 'flex';
    });
  }

  // Close thank you modal
  if (closeThankYou && thankYouModal) {
    closeThankYou.addEventListener('click', function () {
      thankYouModal.style.display = 'none';
    });
  }

  // Optional: Close modals when clicking outside modal-content
  document.querySelectorAll('.modal').forEach(function(modal) {
    modal.addEventListener('click', function(e) {
      // Prevent closing for bankDetailsModal
      if (modal.id === 'bankDetailsModal') return;
      if (e.target === modal) modal.style.display = 'none';
    });
  });
});

// Tab switching logic (if you use tabs elsewhere)
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
  });
});

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBaputojorE1lSwEY4RribQsBmWO1mewVo",
    authDomain: "donation-20155.firebaseapp.com",
    projectId: "donation-20155",
    storageBucket: "donation-20155.firebasestorage.app",
    messagingSenderId: "1035176455496",
    appId: "1:1035176455496:web:eeff01046c0cd16fd3177d",
    measurementId: "G-4VQ9RSP78V",
    databaseURL: "https://donation-20155-default-rtdb.firebaseio.com/"
  };

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Function to write donation form data to Firebase Realtime Database
function writeData(form) {
  const donationData = {
    name: form.name.value,
    phone: form.phone.value,
    email: form.email.value,
    amount: form.amount.value,
    address: form.address.value,
    city: form.city.value,
    zip: form.zip.value,
    country: form.country.value,
    timestamp: new Date().toISOString()
  };

  // Push a new donation entry under 'donations'
  db.ref('donations').push(donationData)
    .then(() => {
      // Optionally show a success message or proceed to next modal
      // alert("Donation data saved!");
    })
    .catch((error) => {
      console.error("Error writing donation data: ", error);
    });
}

// Update the donation form submit handler to call writeData
if (donationForm && bankDetailsModal && donationModal) {
  donationForm.addEventListener('submit', function (e) {
    e.preventDefault();
    writeData(donationForm);
    donationModal.style.display = 'none';
    bankDetailsModal.style.display = 'flex';
    donationForm.reset();
  });
}
