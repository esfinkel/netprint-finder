
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition);
    } else {
        err.style.display = "block";
        err.innerText = "Geolocation is not supported by this browser.";
    }
}

function getPosition(position) {
    currentLocation = {lat: position.coords.latitude, lng: position.coords.longitude};
    waiting.style.display = "none";
    settings.style.display = "block";
    runProgram();
}



function radians(degs) {
    // convert degrees to radians
    var pi = Math.PI;
    return degs * (pi/180);
}

function gc_dist(lat_1,lng_1,lat_2,lng_2) {
    // find great circle distance (in km) between any two points
    // convert decimal degrees to radians
    lat_1 = radians(lat_1);
    lng_1 = radians(lng_1);
    lat_2 = radians(lat_2);
    lng_2 = radians(lng_2);
    // haversine formula
    var dlng = lng_2 - lng_1;
    var dlat = lat_2 - lat_1;
    var a = Math.pow(Math.sin(dlat/2), 2) + Math.cos(lat_1) * Math.cos(lat_2) * Math.pow(Math.sin(dlng/2), 2);
    var c = 2 * Math.asin(Math.sqrt(a));
    var km = 6367 * c;
    // end of calculation
    // limit decimals
    return km;
}

function min_dist(printers, me_pos, num_printers) {
    // for every printer:
    //     1. find printer location
    //     2. add printer to list
    //     3. sort printers and remove one if necessary
    // return the list (with length num_printers)
    
    // fake distance for debugging - if code is successful, printer with name ''
    // should not be printed to console
    dists = [['',10000000000000,true,null]];
    printers.forEach(printer => {        
        var lat = parseFloat(printer[3]);
        var lng = parseFloat(printer[4]);
        var newdist = gc_dist(me_pos['lat'],me_pos['lng'],lat,lng);
        var avail = available(printer[5]);
        if (avail[0]!=false) dists.push([printer[1], newdist, avail[0], avail[1]]);
        dists.sort((a, b) => {return a[1] - b[1]});
        if (dists.length > num_printers) dists.pop();
    });
    dists.sort((a, b) => {return a[1] - b[1]});
    return dists
}

function available(schedule) {
    // return value of: printer's building is open. defaults to True.
    // TODO: schedules need to be manually entered, and many haven't.
    // --schedule information for cornell buildings is not centrally compiled,
    //   nor stored online in any standardized way
    // 
    // schedule has format {0:[9.0,18.0],1:[8,19],...} or
    //          {0:[,],1:[,],2:[,],3:[,],4:[,],5:[,],6:[,]} where monday is 0
    if (schedule===null) {
        // return [false, null];
        // console.log('No sched.');
        return ['maybe', null];
    }
    var rightnow = new Date();
    var dayofweek = (rightnow.getDay()-1)%7;
    var hour = rightnow.getHours() + rightnow.getMinutes()/60;
    try {
        var closes_in = Math.round(60*schedule[dayofweek][1] - hour);
        // console.log('On day ' + ['M', 'T', 'W', 'R', 'F', 'S', 'U'][dayofweek] + ', open from ' + schedule[dayofweek][0] + ' to ' + schedule[dayofweek][1] + '. Open now: '+(schedule[dayofweek][0] <= hour && hour <= schedule[dayofweek][1]-.001));
        return [(schedule[dayofweek][0] <= hour && hour <= schedule[dayofweek][1]-.001), closes_in];
    } catch (error) {
        console.log('Error: '+error);
        return ['maybe', null];        
    }
}

function print_answer(dists, type, quantity) {
    // Print answer
    var ans = 'Showing '+quantity+' printers of type "'+type+'":<br/><br/>';
    ans += '<ol>';
    dists.forEach( dist => {
        if (dist[2]==true) var secondPart = 'is open. It closes in about ' + dist[3] + ' minutes.\n';
        else var secondPart = 'might be open.\n';
        var pAns = '<li>Printer "' + dist[0];
        pAns += '" is ' + Math.round(dist[1]*100)/100+' km away and ' + secondPart + '</li>';
        ans += pAns;
    })
    ans += '</ol>';
    info.style.display = "block";
    info.innerHTML = ans;
}


function runProgram() {
    
    var relevant_printers = [];
    var type = document.querySelector('input[name="p-type"]:checked').value;
    switch (type) {
        case 'black-and-white': relevant_printers = printers_bw; break;
        case 'color': relevant_printers = printers_color; break;
        default: relevant_printers = printers_bw.concat(printers_color); break;
    }
    
    var quantity = document.querySelector('input[name="quantity"]').value;

    var answer = min_dist(relevant_printers, currentLocation, quantity);
    print_answer(answer, type, quantity);
}



function init() {

    var waiting = document.getElementById("waiting");
    var settings = document.getElementById("settings");
    var err = document.getElementById("err");
    var info = document.getElementById("info");
    
    var currentLocation = false;
    getLocation();

}