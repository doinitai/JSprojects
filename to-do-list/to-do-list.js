const inputBox = document.getElementById("taskInput");
const listContainer = document.getElementById("taskList");
const filterButtons = document.querySelectorAll('.filter');

function addTask() {
  if (inputBox.value === "") {
    alert("You must write something!");
  } else {
    let li = document.createElement("li"); //create new li element in the list
    li.innerHTML = inputBox.value; //add the input value to li element
    listContainer.appendChild(li); //add li element to the list

    let span = document.createElement("span"); //create new span element in the list
    span.innerHTML = "\u00d7"; //add 'x' to the span element
    li.appendChild(span); //add new element as a child to the li element
  }
  inputBox.value = ""; //empty the input box after adding task
}

inputBox.addEventListener("keyup", function (event) { //add task when enter is pressed
  if (event.key === "Enter") {
    addTask();
  }
});

listContainer.addEventListener("click", function (e) { //if a task is clicked as checked
    if (e.target.tagName === "LI") {//if we clicked on <li> element then add class 'checked'
      e.target.classList.toggle("checked");
    } else if (e.target.tagName === "SPAN") {//if we clicked on <span> element then parent element <li> will be deleted
      e.target.parentElement.remove();
    }
},);

filterButtons.forEach(button => {//for each button with class 'filter' is attached an event listener that will react to the click event
  button.addEventListener('click', function() {
    filterButtons.forEach(btn => btn.classList.remove('active'));//delete 'active' class from all buttons
    this.classList.add('active'); //add 'active' class for the clicked button
    
    const filterType = this.id;//store the id of the clicked button
    const tasks = document.querySelectorAll('#taskList li');//all li elements that are children of tasklist

    tasks.forEach(task => {//execute function for each li element in the list
      if (filterType === 'showAll') {
        task.style.display = 'block';//show all elements in the list
      } else if (filterType === 'showCompleted') {
        if (task.classList.contains('checked')) {
          task.style.display = 'block';//show only elements with 'checked' class
        } else {
          task.style.display = 'none';//show only elements without 'checked' class
        }
      } else if (filterType === 'showUncompleted') {
        if (task.classList.contains('checked')) {
          task.style.display = 'none';
        } else {
          task.style.display = 'block';
        }
      }
    });
  });
});