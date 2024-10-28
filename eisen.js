// TODO: Do this later when project is ready
// fetch('config/config.json')
//   .then((response) => response.json())
//   .then((config) => {
//     const loginForm = document.getElementById('loginForm');
//     const eisenhowerMatrix = document.getElementById('eisenhowerMatrix');

//     if (config.enableOTP) {
//       loginForm.style.display = 'block'; // Show login form
//       eisenhowerMatrix.style.display = 'none'; // Hide matrix
//     } else {
//       loginForm.style.display = 'none'; // Hide login form
//       eisenhowerMatrix.style.display = 'flex'; // Show matrix
//     }
//   })
//   .catch((error) => console.error('Error loading config:', error));

// Check for OTP feature enabled or not
var config = {
  enableOTP: false,
};
if (config.enableOTP) {
  loginForm.style.display = 'block'; // Show login form
  eisenhowerMatrix.style.display = 'none'; // Hide matrix
} else {
  loginForm.style.display = 'none'; // Hide login form
  eisenhowerMatrix.style.display = 'flex'; // Show matrix
}
// Above block needs to be removed when running live

var element = document.getElementById('h12');
element.innerHTML = 'Eisenhower Matrix';

function showInputPopup() {
  document.getElementById('inputPopup').style.display = 'none';
  document.getElementById('inputPopup').style.animation =
    'popup-show 0.3s ease-in-out forwards';
  document.getElementById('inputPopup').style.display = 'block';

  document.getElementById('taskInput').value = '';
  const taskText = document.getElementById('taskInput').value;
  const selectedQuadrant = document.getElementById('quadrantSelect').value;
}

function closePopup() {
  document.getElementById('inputPopup').style.animation =
    'popup-hide 0.3s ease-in-out forwards';
  setTimeout(function () {
    document.getElementById('inputPopup').style.display = 'none';
  }, 300);
}

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    closePopup();
  }
});
function showQuadrantList() {
  quadrantSelect.style.display = 'block';
}

function hideQuadrantList() {
  document.addEventListener('click', function (event) {
    if (
      !event.target.matches('.quadrant-button') &&
      !event.target.matches('#quadrantSelect')
    ) {
      quadrantSelect.style.display = 'none';
      document.removeEventListener('click', this);
    }
  });
}

quadrantButton.addEventListener('click', function () {
  if (quadrantSelect.style.display === 'none') {
    showQuadrantList();
  } else {
    hideQuadrantList();
  }
});
quadrantSelect.addEventListener('change', function () {
  const selectedValue = this.value;
  const iconClass = `fas fa-${selectedValue.split('-')[0]}`;
  quadrantButton.querySelector('i').className = iconClass;
});

async function sendOTP() {
  const phoneNumber = document.getElementById('phone').value;
  console.log('Phone number provided is: ' + phoneNumber);

  try {
    const response = await fetch('http://localhost:3000/send-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phoneNumber }),
    });

    const data = await response.json();
    console.log(data);

    if (data.success) {
      alert('OTP sent!');
    } else {
      alert('Error sending OTP');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while sending the OTP.');
  }
}

async function verifyOTP() {
  const phoneNumber = document.getElementById('phone').value;
  const otp = document.getElementById('otp').value;

  const response = await fetch('http://localhost:3000/verify-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phoneNumber, otp }),
  });

  const data = await response.json();
  if (data.success) {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('eisenhowerMatrix').style.display = 'flex'; // Display matrix
    alert('Login successful!');
  } else {
    alert('Invalid OTP');
  }
}
