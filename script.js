    var selectedIcon = null
    var topIndex = 3
    var awaitingResponse = false
    function sendMessage() {
      if (!awaitingResponse) {
        var messageContent = document.getElementById("messageInput").value
        // Create a new <p> element
        var paragraph = document.createElement('p');

        // Set the text content of the <p> element
        paragraph.textContent = messageContent


        // Find the target div by its ID
        var targetDiv = document.getElementById('chat');
        paragraph.classList.add("my_message")

        // Append the <p> element to the target div
        targetDiv.appendChild(paragraph);
        awaitingResponse = true
        sendSMS(messageContent)


      }

    }
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
        musicToggle.textContent = "Play Music";
      }
    }




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

    // Make the DIV element draggable:
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

      function getAge() {
        const currentDate = new Date();
        const targetDate = new Date("2004-09-28"); // Replace with your target date in the format "YYYY-MM-DD"
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
    function setDate() {
      var timeElement = document.getElementById("time");
      timeElement.innerText = new Date().toLocaleString();
      setTimeout(setDate, 1000); // Update the time every second
    }

    setDate();


    function sendSMS(messageBody) {
      const accountSid = 'AC9577eec75abf5558561b6195bd6add94';
      const authToken = '424412b787024b505738f6703a158d50';
      const fromPhoneNumber = '+18336100199';
      const toPhoneNumber = '+18643843747';

      fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${btoa(`${accountSid}:${authToken}`)}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          From: fromPhoneNumber,
          To: toPhoneNumber,
          Body: messageBody
        })
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    }

          // Initialize the map
          var map = L.map('map').fitWorld().zoomIn(1);

          // Add the tile layer
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          }).addTo(map);
    
          // Add a marker
          function createCustomMarker(latitude, longitude, imageURL, caption) {
            // Create a custom DivIcon
            var customIcon = L.divIcon({
              className: 'custom-marker-icon',
              html: '<div style="position: relative;">' +
                '<img style="height: 24px; width: 24px; border: 2px solid red; position: relative; border-radius: 16px; object-fit: cover;left: -4px; z-index: 1" src="' + imageURL + '" class="marker-image-bottom">' +
                // '<img style="height: 48px; width: 48px; position: relative; bottom: 0; right: 16px;" src="https://cloud-jdx6xxsfn-hack-club-bot.vercel.app/0droppoint.png" class="marker-image">' +
                '</div>'
            });
    
            // Create a marker with the custom icon
            var marker = L.marker([latitude, longitude], {icon: customIcon});
    
            // Create a custom popup
            var popupContent = '<div style="text-align: center;">' +
              '<img style="max-height: 126px; border-radius: 16px; object-fit: cover;" src="' + imageURL + '">' +
              `<p style="margin: 2px 0; text-align: left;">${caption}</p>` +
              '</div>';
    
            // Bind the popup to the marker
            marker.bindPopup(popupContent);
    
            marker.addTo(map);
    
          }
          createCustomMarker(34.9482, -81.9301, 'https://cloud-gelhtq1fq-hack-club-bot.vercel.app/0screenshot_2023-06-12_at_4.15.00_pm.png', 'Dieter, Parker, Tyler, and I organized Carolina Hacks, the first student-led Hackathon for high schoolers in South Carolina. We had a blast! <br/><br/>Checkout our <a href="https://drive.google.com/file/d/1gOpYcsQk7mf2ETHbtHarUdKUDJAMFL-w/view?usp=drive_link">Carolina Hacks Documentary</a>');
          createCustomMarker(28.4595, 77.0266, 'https://cloud-6i5n6oo28-hack-club-bot.vercel.app/0screenshot_2023-06-13_at_10.33.44_am.png', 'Epoch was awesome! I met so many awesome people (including my team mates: Arpan and Vaishnavi). We built an AI-powered pickup line generator. <br/><br/>Epoch Documentary <a href="https://youtu.be/KLx4NZZPzMc">Epoch Documentary</a>');
          createCustomMarker(42.3601, -71.0589, 'https://cloud-eakdz9j3y-hack-club-bot.vercel.app/0image.png', 'I really enjoyed Angel Hacks. At Angel Hacks, we built an AI college admissions simulator, funded by Elon Musk. It is free, but students give 10 % of lifetime income.It also costs the user $250, 000 for every student they accept <br/> <br/>Checkout the <a href="https://youtu.be/KLx4NZZPzMc"> Angel Hacks Documentary</a> ');
    
          marker.addTo(map);