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
function addTask(taskText, quadrant, taskDate = "", taskTime = "") {
  // Create the task element
  const taskElement = document.createElement("div");
  taskElement.classList.add("task");
  taskElement.style.fontSize = "0.8rem"; // Set smaller font size for the text

  // Create a bullet element with a separate container for the text
  const bulletContainer = document.createElement("span");
  bulletContainer.classList.add("bullet-container");
  const bullet = document.createElement("span");
  bullet.classList.add("bullet");
  bullet.innerText = "*"; // Black bullet
  bulletContainer.appendChild(bullet);

  const taskTextElement = document.createElement("span");
  taskTextElement.classList.add("task-text");
  taskTextElement.innerText = taskText;

  // Append bullet and text to the task element
  taskElement.appendChild(bulletContainer);
  taskElement.appendChild(taskTextElement);

  // Add due date and time (if provided)
  if (taskDate && taskTime) {
    const dueDateElement = document.createElement("span");
    dueDateElement.classList.add("due-date");
    dueDateElement.innerText = `${taskDate} ${taskTime}`;
    taskElement.appendChild(dueDateElement);
  }

  // Find the target quadrant element
  const targetQuadrant = document.querySelector(`.quadrant.${quadrant}`);

  // Get the existing tasks in the quadrant (if any)
  const existingTasks = targetQuadrant.querySelectorAll(".task");

  // Insert the task element at the bottom of the quadrant
  if (existingTasks.length > 0) {
    targetQuadrant.insertBefore(taskElement, existingTasks[existingTasks.length]); // Insert after the last existing task
  } else {
    targetQuadrant.appendChild(taskElement); // Append if no tasks exist
  }
}
function playButton() {
  // Get the task details
  const taskText = document.getElementById("taskInput").value;
  const selectedQuadrant = document.getElementById("quadrantSelect").value;
  const taskDate = document.getElementById("taskDate").value;
  const taskTime = document.getElementById("taskTime").value;

  // Add the task to the matrix
  addTask(taskText, selectedQuadrant, taskDate, taskTime);

  // (Optional) Clear the input fields
  document.getElementById("taskInput").value = "";
  document.getElementById("taskDate").value = "";
  document.getElementById("taskTime").value = "";

  // Close the popup
  closePopup();
}