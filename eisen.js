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
  document.getElementById("inputPopup").style.display = "block";
  document.getElementById("taskInput").focus(); // Focus on task input for easy typing

  document.getElementById('inputPopup').style.animation =
    'popup-show 0.3s ease-in-out forwards';
  document.getElementById('inputPopup').style.display = 'block';

  document.getElementById('taskInput').value = '';
  const taskText = document.getElementById('taskInput').value;
  const selectedQuadrant = document.getElementById('quadrantSelect').value;
  document.querySelector('.matrix-container').classList.add('blur-background');
}

function closePopup() {
  document.getElementById('inputPopup').style.animation =
    'popup-hide 0.3s ease-in-out forwards';
  setTimeout(function () {
    document.getElementById('inputPopup').style.display = 'none';
  }, 300);
  document
    .querySelector('.matrix-container')
    .classList.remove('blur-background');
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

// quadrantButton.addEventListener('click', function () {
//   if (quadrantSelect.style.display === 'none') {
//     showQuadrantList();
//   } else {
//     hideQuadrantList();
//   }
// });
// quadrantSelect.addEventListener('change', function () {
//   const selectedValue = this.value;
//   const iconClass = `fas fa-${selectedValue.split('-')[0]}`;
//   quadrantButton.querySelector('i').className = iconClass;
// });

// Show or hide the dropdown when the icon button is clicked
document
  .getElementById('quadrantButton')
  .addEventListener('click', function () {
    const quadrantSelect = document.getElementById('quadrantSelect');
    if (quadrantSelect.style.display === 'none') {
      quadrantSelect.style.display = 'block'; // Show dropdown
    } else {
      quadrantSelect.style.display = 'none'; // Hide dropdown
    }
  });

// Change the icon when a quadrant is selected
document
  .getElementById('quadrantSelect')
  .addEventListener('change', function () {
    const selectedValue = this.value;
    const iconClass = `fas fa-${selectedValue.split('-')[0]}`; // e.g., 'fa-exclamation-triangle'
    document.querySelector('#quadrantButton i').className = iconClass;
    this.style.display = 'none'; // Hide dropdown after selection
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

// Task Addtion section
function addTaskToQuadrant() {
  // Get values from the input form
  const quadrant = document.getElementById('quadrantSelect').value;
  const taskDetails = document.getElementById('taskInput').value;

  // Ensure task details are not empty
  if (taskDetails.trim() === '') {
    alert('Please enter a task description.');
    return;
  }

  // Find the quadrant div
  const quadrantDiv = document.querySelector(`.${quadrant}`);

  // Check if there's already a UL for tasks in the quadrant, otherwise create one
  let taskList = quadrantDiv.querySelector('ul');
  if (!taskList) {
    taskList = document.createElement('ul');
    taskList.classList.add('task-list');
    quadrantDiv.appendChild(taskList);
  }

  // Create a new list item with a checkbox for the task
  const taskItem = document.createElement('li');
  taskItem.classList.add('task-item');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('task-checkbox');

  const taskLabel = document.createElement('label');
  taskLabel.textContent = taskDetails;
  taskLabel.classList.add('task-label');
  checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
      taskLabel.classList.add('completed');
    } else {
      taskLabel.classList.remove('completed');
    }
  });

  // Append checkbox and label to the task item
  taskItem.appendChild(checkbox);
  taskItem.appendChild(taskLabel);

  // Append the new task item to the task list
  taskList.appendChild(taskItem);

  // Clear the input form after submission
  document.getElementById('taskInput').value = '';
  document.getElementById('taskDate').value = '';
  document.getElementById('taskTime').value = '';
  closePopup(); // Optional: Close the popup after submitting
}
document
  .getElementById('taskInput')
  .addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission if inside a form
      addTaskToQuadrant(); // Call the function to add the task
    }
  });
document.addEventListener('keydown', function (event) {
  if (event.ctrlKey && event.altKey && event.key === 'j') {
    event.preventDefault(); // Prevent any default action for this key combination
    showInputPopup(); // Show the input popup
  }
});
