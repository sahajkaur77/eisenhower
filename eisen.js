  function helloWorldOfMaxi() {
    console.log('hello world of maxi');
  }

  var element = document.getElementById('h12');
  element.innerHTML = 'Eisenhower Matrix';
  helloWorldOfMaxi();
 
  function showInputPopup() {
    document.getElementById("inputPopup").style.display = "none";
    document.getElementById("inputPopup").style.animation = "popup-show 0.3s ease-in-out forwards";
    document.getElementById("inputPopup").style.display = "block";
  
    document.getElementById("taskInput").value = "";
    const taskText = document.getElementById("taskInput").value;
  const selectedQuadrant = document.getElementById("quadrantSelect").value;

  }
  
  function closePopup() {
    document.getElementById("inputPopup").style.animation = "popup-hide 0.3s ease-in-out forwards";
    setTimeout(function() {
      document.getElementById("inputPopup").style.display = "none";
    }, 300);
  }
  
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closePopup();
    }
  });
  function showQuadrantList() {
    quadrantSelect.style.display = 'block'; }
  
  function hideQuadrantList() {
  
    document.addEventListener('click', function(event) {
      if (!event.target.matches('.quadrant-button') && !event.target.matches('#quadrantSelect')) {
        quadrantSelect.style.display = 'none';
        document.removeEventListener('click', this);
      }
    });
  }
  
  quadrantButton.addEventListener('click', function() {
    if (quadrantSelect.style.display === 'none') {
      showQuadrantList();
    } else {
      hideQuadrantList();
    }
  });
  quadrantSelect.addEventListener('change', function() {
    const selectedValue = this.value;
    const iconClass = `fas fa-${selectedValue.split('-')[0]}`;
    quadrantButton.querySelector('i').className = iconClass; 
  });