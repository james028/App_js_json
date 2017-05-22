
// potwierdzenie formularza
document.getElementById("mainInput").addEventListener("submit", addTrips);

//dodanie zadania
function addTrips(e) {
    
    //pobranie wpisanych wartości
    var desc = document.getElementById("descInput").value,
        placeInp = document.getElementById("placeInput").value,
        monthInp = document.getElementById("monthInput").value,
        piori = document.getElementById("piorityInput").value,
        assignedTo = document.getElementById("AssignedToInput").value,
        stat = "In Progress";
    
    
    var trip = {
        description: desc,
        place: placeInp,
        month: monthInp,
        piority: piori,
        assigned: assignedTo,
        status: stat
    }
    
    
    if (localStorage.getItem('trips') === null) {
        //utworzenie tablicy
        var trip_ar = [];
        //dodanie elemnentu do tablicy
        trip_ar.push(trip);
        //ustawienie locaStorage
        localStorage.setItem('trips', JSON.stringify(trip_ar));
    } else {
        //pobranie z localStorage
        var trip_ar = JSON.parse(localStorage.getItem('trips'));
        //dodanie trip do tablicy
        trip_ar.push(trip);
        localStorage.setItem('trips', JSON.stringify(trip_ar));
    }
    
    
    //zrestetowanie wpisanych wczesniej wartości
   document.getElementById("mainInput").reset();
    
    fetchTrips();
    
    e.preventDefault();
}


//zmiana statusu
function changeStatus(status) {
   var trips = JSON.parse(localStorage.getItem('trips'));
    
    for (var i=0; i < trips.length; i++) {
        if (trips[i].status == status) {
            trips[i].status = "Done";
        }
    }
    
    localStorage.setItem('trips', JSON.stringify(trips));
    
    fetchTrips();
    
    
}

//usunięcie zadania
function deleteTrips(place) {
    var trips = JSON.parse(localStorage.getItem('trips'));
    
    for (var i = 0; i < trips.length; i++) {
        if (trips[i].place == place) {
            //usunięcie z tablicy
            trips.splice(i, 1);
        }
    }
    
    localStorage.setItem('trips', JSON.stringify(trips));
    
    fetchTrips();
}




document.body.onload = fetchTrips;

//stworzenie zadania
function fetchTrips() {
    //pobranie z localStorage
    var trips = JSON.parse(localStorage.getItem('trips'));
    var output = document.getElementById("tripsList");
    
    
    
    output.innerHTML = "";
    
    for (var i = 0; i < trips.length; i++) {
        
        var description = trips[i].description,
            place = trips[i].place,
            month = trips[i].month,
            piority = trips[i].piority,
            assigned = trips[i].assigned,
            status = trips[i].status;
        
        
        output.innerHTML += '<div class="row-end">' +
                            '<p><span class="label-info-1"> Status: ' + status + '</span></p><br>' +
                            '<h4>Description of the delegation: </h4>' +
                            '<h3>' + description + '</h3>' +
                            '<p><i class="fa fa-map-marker fa-1" aria-hidden="true"></i> Place:  ' + place + '</p>' +
                            '<p><i class="fa fa-calendar fa-1" aria-hidden="true"></i> Month:  ' + month + '</p>' +
                            '<p><i class="fa fa-paperclip fa-1" aria-hidden="true"></i> Piority:  ' + piority + '</p>' +
                            '<p><i class="fa fa-user fa-1" aria-hidden="true"></i> Assigned to:  ' + assigned + '</p>' +
                            '<div class="row-btn">' +
                            '<p><span onclick="deleteTrips(\''+place+'\')" class="btn btn-danger btn-end">Delete</span></p>' +
                            '<p><span onclick="changeStatus(\''+status+'\')" class="btn btn-info btn-end">Done</span></p>' +
                            '</div></div>';
                                               
    }

}