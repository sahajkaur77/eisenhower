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
//       loginForm.style.display = 'none'; // Hide login forms
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
  document.getElementById('inputPopup').style.display = 'block';
  document.getElementById('taskInput').focus(); // Focus on task input for easy typing

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
    const response = await fetch(
      'https://otp-app-440814.de.r.appspot.com/send-otp',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      }
    );

    const data = await response.json();
    console.log(data);

    if (data.success) {
      document.getElementById('loginForm').style.display = 'none'; // Hide login form
      document.getElementById('eisenhowerMatrix').style.display = 'flex'; // Show matrix
    } else {
      alert('Invalid OTP'); // You can keep this if you want an error message for invalid OTP
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while verifying the OTP.'); // Optional: error message
  }
}
async function verifyOTP() {
  const phoneNumber = document.getElementById('phone').value;
  const otp = document.getElementById('otp').value;

  const response = await fetch(
    'https://otp-app-440814.de.r.appspot.com/verify-otp',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber, otp }),
    }
  );

  const data = await response.json();
  if (data.success) {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('eisenhowerMatrix').style.display = 'flex'; // Display matrix
  } else {
    // Handle invalid OTP, e.g., display an error message or redirect to login page
    console.error('Invalid OTP');
    // You might want to add a visual indicator or message to the user here
  }
}

// Task Addtion section
function addTaskToQuadrant() {
  // Get values from the input form
  const quadrant = document.getElementById('quadrantSelect').value;
  const taskDetails = document.getElementById('taskInput').value;
  const taskDate = document.getElementById('taskDate').value; // Ensure we're using `.value`
  const taskTime = document.getElementById('taskTime').value; // Ensure we're using `.value`

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

  const dateTimeSpan = document.createElement('span');
  dateTimeSpan.textContent = `${taskDate} ${taskTime}`;
  dateTimeSpan.classList.add('date-time');

  const taskContentDiv = document.createElement('div');
  taskContentDiv.classList.add('task-content');
  taskContentDiv.appendChild(taskLabel);
  taskContentDiv.appendChild(dateTimeSpan);

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
  taskItem.appendChild(dateTimeSpan);

  // Append the new task item to the task list
  taskList.appendChild(taskItem);
  checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
      taskItem.classList.add('completed'); // Optional: Add a style for completed tasks
      taskList.appendChild(taskItem); // Move to bottom
    } else {
      taskList.insertBefore(taskItem, taskList.firstChild); // Move back to top if unchecked
    }
  });

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
document.querySelector('.calendar-icon').addEventListener('click', function () {
  document.getElementById('taskDate').focus();
});
document.querySelector('.time-icon').addEventListener('click', function () {
  document.getElementById('taskTime').focus();
});
const dateInput = document.getElementById('taskDate');
const timeInput = document.getElementById('taskTime');
const dateTimeDisplay = document.getElementById('dateTimeDisplay');

// Function to update the display with selected date and time
function updateDateTimeDisplay() {
  const selectedDate = dateInput.value;
  const selectedTime = timeInput.value;

  // Format the display text
  const displayText = `${selectedDate || 'No Date'} ${
    selectedTime || 'No Time'
  }`;

  // Set the text content of the display element
  dateTimeDisplay.textContent = displayText;
}

// Add event listeners to update display when date or time is selected
dateInput.addEventListener('change', updateDateTimeDisplay);
timeInput.addEventListener('change', updateDateTimeDisplay);
