function helloWorldOfMaxi() {
  console.log('hello world of maxi');
}

var element = document.getElementById('h12');
element.innerHTML = 'Eisenhower Matrix';
helloWorldOfMaxi();

function showInputPopup() {
  document.getElementById("inputPopup").style.display = "block";
}

function closePopup() {
  document.getElementById("inputPopup").style.display = "none";
}

function addTask() {
  var taskText = document.getElementById("taskInput").value;
  document.getElementById("taskInput").value = "";
}