    var selectedIcon = null
    var topIndex = 3

  
////////////////MUSIC TOGGLE BACKEND////////////////////////
     function toggleMusic() {
      var video = document.getElementById("videoElement");
      var musicToggle = document.getElementById("musicToggle");

      if (video.muted) {
        video.muted = false;
        video.style.display = "block";
        video.play(); // Play the video
        musicToggle.textContent = "Mute Music";
      } else {
        video.muted = true;
        video.style.display = "none";
        musicToggle.textContent = "Play Some Linkin Park?";
      }
    }
////////////////MUSIC TOGGLE BACKEND////////////////////////





///////////////////////////////////Interaction with the apps/////////////////////////////////////////////////////
function tapWindow(elmnt) {
      elmnt.style.zIndex = topIndex++;
    }

    function openIcon(name) {
      if (selectedIcon == document.getElementById(name + "Icon")) {
        openElement(document.getElementById(name))
        map.invalidateSize()
        selectedIcon = null
        document.getElementById(name + "Icon").style.backgroundColor = "rgba(85, 166, 241, 0.0)";
        dragElement(document.getElementById(name));

      } else {
        if (selectedIcon) {
          selectedIcon.style.backgroundColor = "rgba(85, 166, 241, 0.0)"
        }
        selectedIcon = document.getElementById(name + "Icon")
        document.getElementById(name + "Icon").style.backgroundColor = "rgba(85, 166, 241, 0.6)";



        selectedIcon = document.getElementById(name + "Icon")
        document.getElementById(name + "Icon").style.backgroundColor = "rgba(85, 166, 241, 0.6)";
      }
    }

    function openElement(elmnt) {

      elmnt.style.display = 'flex';
      elmnt.style.zIndex = topIndex++;

    }
    function closeElement(elmnt) {
      elmnt.style.display = 'none'
    }


    dragElement(document.getElementById("welcome"));

    function dragElement(elmnt) {
      var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      if (document.getElementById(elmnt.id + "handle")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "handle").onmousedown = dragMouseDown;
      } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
      }
///////////////////////////////////Interaction with the apps/////////////////////////////////////////////////////


////////////////////////////////////////Getting age backend///////////////////////////////////////////////////////
      function getAge() {
        const currentDate = new Date();
        const targetDate = new Date("2006-11-30"); // Replace with your target date in the format "YYYY-MM-DD"
        const differenceMs = currentDate - targetDate;
        const millisecondsPerYear = 365.25 * 24 * 60 * 60 * 1000;
        const yearsWithDecimals = (differenceMs / millisecondsPerYear).toFixed(5);
        document.getElementById("age").textContent = yearsWithDecimals
        console.log("age here")
      }
      getAge()
      function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
      }
////////////////////////////////////////Getting age backend///////////////////////////////////////////////////////


/////////////////////////////////////DRAG BACKEND/////////////////////////////////////
      function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.zIndex = topIndex++;

        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      }

      function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
      }
    }
/////////////////////////////////////DRAG BACKEND/////////////////////////////////////   


/////////////////////////////DATE AND TIME BACKEND///////////////////////////////////////////  
    function setDate() {
      var timeElement = document.getElementById("time");
      timeElement.innerText = new Date().toLocaleString();
      setTimeout(setDate, 1000); // Update the time every second
    }

    setDate();
/////////////////////////////DATE AND TIME BACKEND///////////////////////////////////////////




/////////////////////////////MAP BACKEND//////////////////////////////////////////////////////      
          var map = L.map('map').fitWorld().zoomIn(1);

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          }).addTo(map);
    
          
          function createCustomMarker(latitude, longitude, imageURL, caption) {
            
            var customIcon = L.divIcon({
              className: 'custom-marker-icon',
              html: '<div style="position: relative;">' +
                '<img style="height: 24px; width: 24px; border: 2px solid red; position: relative; border-radius: 16px; object-fit: cover;left: -4px; z-index: 1" src="' + imageURL + '" class="marker-image-bottom">' +
                
                '</div>'
            });
    
            
            var marker = L.marker([latitude, longitude], {icon: customIcon});
    
        
            var popupContent = '<div style="text-align: center;">' +
              '<img style="max-height: 126px; border-radius: 16px; object-fit: cover;" src="' + imageURL + '">' +
              `<p style="margin: 2px 0; text-align: left;">${caption}</p>` +
              '</div>';
    
            // Bind the popup to the marker
            marker.bindPopup(popupContent);
    
            marker.addTo(map);
    
          }
          createCustomMarker(28.6139, 77.2090, '/assets/mapsme.gif', 'This is my hometown, Delhi, which is the capital of India! :D <br/><br/>Checkout my portfolio website <a href="https://aaryav.netlify.app">aaryav.netlify.app</a>');
          createCustomMarker(28.4595, 77.0266, '');
          createCustomMarker(42.3601, -71.0589, '');
    
          marker.addTo(map);
/////////////////////////////MAP BACKEND//////////////////////////////////////////////////////  