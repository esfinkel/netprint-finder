// Main functionality

    // called once onload

function init() { 

    statusArea = document.getElementById("status");       // for whatever reason, having "var" makes it not global in Chrome
    settings = document.getElementById("settings");
    info = document.getElementById("info");
    infoLabel = document.getElementById("infoLabel");
    printerType = document.getElementById("printer-type");
    nudgeText = document.getElementById("nudge");
    additionalInfo = document.getElementById("additional-info");
    
    currentLocation = false;

    currInd = 0;

    getLocation();

}

function testNext() {
    var query = 'https://www.google.com/maps/search/?api=1&query=';
    query += printers_bw.concat(printers_color)[currInd][3];
    query += ',';
    query += printers_bw.concat(printers_color)[currInd][4];

    document.getElementById("test-next").innerHTML = printers_bw.concat(printers_color)[currInd][1];

    Object.assign(document.createElement('a'), { target: '_blank', href: query}).click();
    currInd += 1;
}

function getLocation() { 
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition);
    } else {
        statusArea.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function getPosition(position) {
    statusArea.innerHTML = "Acquiring location...";
    currentLocation = {lat: position.coords.latitude, lng: position.coords.longitude};
    window.console.log("If you're curious:");
    window.console.log(currentLocation);
    runProgram();
    displayEverything();
}

function displayEverything() {
    settings.style.display = "block";
    statusArea.style.display = "none";
    additionalInfo.style.display = "block";
    // var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification)); // duck-typing that I found online
    var isSafari = (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1);
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isSafari && !isMobile) showTipPrompt();
}



    // called whenever parameters are changed

function runProgram() {
    var relevant_printers = [];
    // var type = document.querySelector('input[name="p-type"]:checked').value;
    var type = 'any';
    switch (printerType.innerText) {
        case 'b': {relevant_printers = printers_bw.concat(printers_color); break;}
        case 'c': {relevant_printers = printers_color; type = "color"; break;}
        default: {relevant_printers = printers_bw.concat(printers_color); break;}
    }
    
    var quantity = document.querySelector('input[name="quantity"]').value;

    var answer = min_dist(relevant_printers, currentLocation, quantity);
    print_answer(answer, type, quantity);
}

    // data processing helpers 

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
    // return value of: printer's building is open. true, false, or 'maybe'. defaults to 'maybe'.
    // TODO: schedules need to be manually entered, and many haven't.
    //      -- schedule information for cornell buildings is not centrally compiled,
    //          nor stored online in any standardized way
    // 
    // schedule has format {0:[9.0,18.0],1:[8,19],...} or
    //          {0:[,],1:[,],2:[,],3:[,],4:[,],5:[,],6:[,]} where monday is 0
    // 
    if (schedule===null) { // obviously err toward too many printers
        // console.log('No sched.');
        return ['maybe', null];
    }
    var rightnow = new Date();
    var dayofweek = (rightnow.getDay()+6)%7;
    var mins = rightnow.getHours()*60 + rightnow.getMinutes();
    try {
        var closes_in = Math.round(schedule[dayofweek][1]*60 - mins);
        // console.log('Closes at '+60*schedule[dayofweek][1]+'. Right now it is')
        // console.log('On day ' + ['M', 'T', 'W', 'R', 'F', 'S', 'U'][dayofweek] + ', open from ' + schedule[dayofweek][0] + ' to ' + schedule[dayofweek][1] + '. Open now: '+(schedule[dayofweek][0] <= hour && hour <= schedule[dayofweek][1]-.001));
        return [(schedule[dayofweek][0]*60 <= mins && mins <= schedule[dayofweek][1]*60-.1), closes_in];
    } catch (error) {
        console.log('Error: '+error);
        return ['maybe', null];        
    }
}

function print_answer(dists, type, quantity) {
    // Print answer
    var label = 'Showing '+quantity+' printers of type "'+type+'"<br><br>';
    var ans = '<ol>';
    dists.forEach( dist => {
        var pAns = '<li>Printer "' + dist[0];
        pAns += '". ' + dist[1].toFixed(2) + ' km away. '; // Math.round(dist[1]*100)/100 
        if (dist[2]==true) pAns += 'Currently open; closes in about ' + dist[3] + ' minutes.';
        else pAns += 'Might be open.';
        pAns += '</li>'; 
        ans += pAns;
    })
    ans += '</ol>';
    infoLabel.style.display = "block";
    info.style.display = "block";
    nudge.style.display = "inline";
    infoLabel.innerHTML = label;
    info.innerHTML = ans;
}


    // math helpers

function radians(degs) {
    // convert degrees to radians
    var pi = Math.PI;
    return degs * (pi/180);
}

function gc_dist(lat_1,lng_1,lat_2,lng_2) {
    // find great circle distance (in km) between any two points
    // convert decimal degrees to radians
    lat_1 = radians(lat_1); lng_1 = radians(lng_1);
    lat_2 = radians(lat_2); lng_2 = radians(lng_2);
    // haversine formula
    var dlng = lng_2 - lng_1; var dlat = lat_2 - lat_1;
    var a = Math.pow(Math.sin(dlat/2), 2) + Math.cos(lat_1) * Math.cos(lat_2) * Math.pow(Math.sin(dlng/2), 2);
    var c = 2 * Math.asin(Math.sqrt(a));
    var km = 6367 * c;
    return km;
}

// Additional features

function reportIssue() {
    form = document.getElementById("reportIssueForm");
    form.style.display = "block";
}

function setPrinterType(key) {
    if (printerType.innerHTML !== key) {
        printerType.innerHTML=key;
        runProgram();
    } 
}

function showTipPrompt() {
    document.getElementById("loc-tip-prompt").style.display = "block";
}

function showTip() {
    document.getElementById("loc-tip").style.display = "block";
}

