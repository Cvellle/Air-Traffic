var x = document.getElementById("loc");

//GET LOCATION
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}


//GET LONGITUDE AND ALTITUDE - INSIDE IS ALSO MAKING NEW URL AND XMLHttpRequest
function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;
  
    var long = 0;
    var lat = 0;
  
    long = position.coords.longitude;
    lat = position.coords.latitude;  
      

    //GET JSON - FIRST MAKES URL  
    var url = `http://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat=${lat}&lng=${long}&fDstL=0&fDstU=100`;
    var proxy = 'https://cors-anywhere.herokuapp.com/';
    var finalURL = proxy + url;

    var hr = new XMLHttpRequest();
    hr.onreadystatechange = function() {
        
    //   if(this.status==404) {
    // console.log("notfound");
    // }
        
    //   if(this.readyState==1) {console.log("setup");}
    
    //   if(this.readyState==2) {console.log("sent");}
    
    //   if(this.readyState==3) {console.log("processed");}
    
    //   if(this.readyState==4&&this.status==200) {
        var myObj=JSON.parse(hr.responseText);
        var ordered = myObj.acList.sort((a, b) => a.Alt > b.Alt ? 1 : -1);

        var myObj=JSON.parse(hr.responseText);
        var ordered = myObj.acList.sort((a, b) => a.Alt > b.Alt ? 1 : -1);
     
        var acL = ordered.map((cur, i) => {
     
            var node = document.createElement("li");  
            var br = document.createElement("br");
            var br2 = document.createElement("br");
            var br3 = document.createElement("br");
            var br4 = document.createElement("br");
            var image = document.createElement("img");
            var info = document.createElement("div"); 
            var infodetails = document.createElement("div"); 
            var par = document.createElement("button");
            var addinfo = document.createElement("p");
            var quitinfo = document.createElement("button");
         
            par.setAttribute("class", "details");
            addinfo.setAttribute("class", "hidden add"); 
            quitinfo.setAttribute("class", "quit");
            info.setAttribute("class", "info");
            image.setAttribute("src", "http://www.emoji.co.uk/files/phantom-open-emojis/travel-places-phantom/12698-airplane.png"); 
              
            if(cur.Long>long) {
               image.setAttribute("style", "transform: scaleX(-1);");  
            }  
              
            var link = document.createTextNode("Details");
            var textnode1 = document.createTextNode(`Flight:${cur.Id}`);  
            var textnode2 = document.createTextNode(`Altitude:${cur.Alt}`);
            var more1 = document.createTextNode(`Manufacturer:${cur.Man} Model:${cur.CNum}`);
            var more2 = document.createTextNode(`From:${cur.From}`);
            var more3 = document.createTextNode(`To: ${cur.To}`);
            var quit = document.createTextNode("Quit");
    
              
             node.appendChild(image);
             
             info.appendChild(textnode1);
             info.appendChild(br);
             info.appendChild(textnode2);
             node.appendChild(info); 
             quitinfo.appendChild(quit);
             addinfo.appendChild(quitinfo);
             node.appendChild(infodetails);
             addinfo.appendChild(more1);
             addinfo.appendChild(br2);
             addinfo.appendChild(more2);
             addinfo.appendChild(br3);
             addinfo.appendChild(more3);
             addinfo.appendChild(br4);
             infodetails.appendChild(addinfo);
             par.appendChild(link);  
             infodetails.appendChild(par);  
               
             document.getElementById("list").appendChild(node);
     });
      
      
      
            function opendetails() { 
              $(this).prev().removeClass("hidden");
              $(this).prev().addClass("shown");
      }
              document.querySelectorAll(".details").forEach(a=>a.addEventListener("click", opendetails)); 
      
      
            $(document).ready(function(){
              $(".quit").click(function() {
                $(this).parent().removeClass("shown");
                $(this).parent().addClass("hidden");
           }   );
          });
    
    
      
    }
    
        hr.open("GET",finalURL,true);
        hr.send();

}




//SHOW ERROR IF ANY - FOR GET LOCATION
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }


}
setInterval(showPosition, 6000);










