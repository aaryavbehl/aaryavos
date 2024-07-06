/////////////////CURRENT TIME AND DATE BACKEND////////////////////////////////////////////////////////////////////////
function updateTime() {
  var currentTime = new Date().toLocaleString();
  var timeText = document.querySelector("#timeElement");
  timeText.innerHTML = currentTime;
}
setInterval(updateTime, 1000);

/////////////////CURRENT TIME AND DATE BACKEND////////////////////////////////////////////////////////////////////////

/////////////////DRAGGING WINDOWS BACKEND////////////////////////////////////////////////////////////////////////
function dragElement(element) {
var initialX = 0;
var initialY = 0;
var currentX = 0;
var currentY = 0;
if (document.getElementById(element.id + "header")) {
  document.getElementById(element.id + "header").onmousedown = startDragging;
} else {
  element.onmousedown = startDragging;
}
function startDragging(e) {
  e = e || window.event;
  e.preventDefault();
  initialX = e.clientX;
  initialY = e.clientY;
  document.onmouseup = stopDragging;
  document.onmousemove = dragElement;
}
function dragElement(e) {
  e = e || window.event;
  e.preventDefault();
  currentX = initialX - e.clientX;
  currentY = initialY - e.clientY;
  initialX = e.clientX;
  initialY = e.clientY;
  element.style.top = (element.offsetTop - currentY) + "px";
  element.style.left = (element.offsetLeft - currentX) + "px";
}
function stopDragging() {
  document.onmouseup = null;
  document.onmousemove = null;
}
}
/////////////////DRAGGING WINDOWS BACKEND////////////////////////////////////////////////////////////////////////


/////////////////ADD WINDOWS TO DRAG////////////////////////////////////////////////////////////////////////
dragElement(document.getElementById("welcome"));
dragElement(document.querySelector("#notes"))
/////////////////ADD WINDOWS TO DRAG////////////////////////////////////////////////////////////////////////


/////////////////OPEN AND CLOSE MECHANISM FOR WELCOME SCREEN////////////////////////////////////////////////////////////////////////
var welcomeScreen = document.querySelector("#welcome")
function closeWindow(element) {
element.style.display = "none"
}
function openWindow(element) {
element.style.display = "flex"
}
var welcomeScreenClose = document.querySelector("#welcomeclose")
var welcomeScreenOpen = document.querySelector("#welcomeopen")
welcomeScreenClose.addEventListener("click", function() {
closeWindow(welcomeScreen);
});
welcomeScreenOpen.addEventListener("click", function() {
openWindow(welcomeScreen);
});
/////////////////OPEN AND CLOSE MECHANISM FOR WELCOME SCREEN////////////////////////////////////////////////////////////////////////

/////////////////OPEN AND CLOSE MECHANISM FOR NOTES SCREEN////////////////////////////////////////////////////////////////////////
var notesScreen = document.querySelector("#notes")
var notesScreenClose = document.querySelector("#notesclose")
notesScreenClose.addEventListener("click", () => closeWindow(notesScreen));
var notesScreenOpen = document.querySelector("#noteopen")
notesScreenOpen.addEventListener("click", function() {
  openWindow(notesScreen);
  });
  document.getElementById('noteopen').addEventListener('click', function() {
    this.classList.toggle('selected');
});
/////////////////OPEN AND CLOSE MECHANISM FOR NOTES SCREEN////////////////////////////////////////////////////////////////////////





