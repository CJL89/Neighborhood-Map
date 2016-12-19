

// Creation of main variables
var map,
    marker,
    infoWindow;


// Function to load the Google Maps API.
function initMap() {

    // Different options that manipulate the map API
    var options = {
        //Central Park is the center of the map.
        center: Model.locations[2].location,
        // Initial camera span when map is loaded.
        zoom: 12,
        // Initializing the style that saved in the variable "styles".
        styles: Model.styles,
        // Disabled the feature of changing between earth and other types.
        mapTypeControl: false,
        // Disabled the street view feature.
        streetViewControl: false
    };

    // Initializing map and saving in variable and inputing in the "maps" ID.
    map = new google.maps.Map(document.getElementById('map'), options);

    // Creation of variable "infowindow" so we can dislay the names of the neighborhoods.
    infoWindow = new google.maps.InfoWindow();

    // For loop that iterates through the different locations.
    Model.locations.forEach(function(loc) {

        // Create variable "position" within the scope of the for loop to get the lat & lng.
        var positions = loc.location;

        // Create the variable "titles" within the scope of the for loop to get the name of the neighborhood.
        var titles = loc.title;

        // Create of variable bounds of the map so it shows all the markers.
        var bounds = new google.maps.LatLngBounds();

        // Create the variable "marker" within the scope of the for loop.
        marker = new google.maps.Marker({
            position: positions,
            title: titles,
            animation: google.maps.Animation.DROP,
            map: map,
        });

        // bounds.extend(locations);
        // map.fitBounds(bounds);

        // Call for the function wikipediaAPI.
        wikipediaAPI(marker);

        // Event listener that displays the infowindow when a certain marker is clicked on.
        marker.addListener('click', function() {

            // Makes the marker bounce when it is clicked on.
            toggleBounce(this);

            // Calls for the function that populates the markers.
            infowindowDescription(this, infoWindow);
        });

        // Saving the results of the loop in the variable marker.
        loc.marker = marker;
    });

    // Activates KO
    ko.applyBindings(new VM());
} // End of initMap -----------------------------------------------------------


// Function that populates the infowindow with the appropiate text.
function infowindowDescription(marker, infoWindow) {

    // Checking if infowindow is open.
    if (infoWindow.marker != marker) {

        // Setting infowindow to equate to marker.
        infoWindow.marker = marker;

        // Setting the location of where the infowindow will open.
        infoWindow.open(map, marker);

        // Setting the text content that appears within the infowindow.
        infoWindow.setContent("<h4>" + marker.title + "</h4><p>" + marker.description + "</p>");

        // Setting the event listener to clear when the infowindow is closed.
        infoWindow.addListener("closeclick", function(){
            infoWindow.marker = null;
        });
    }
}


// Function that makes the markers bounce when they are selected.
function toggleBounce(marker) {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {

        // Gets the animation from google to make the markers bounce.
        marker.setAnimation(google.maps.Animation.BOUNCE);

        // Set the times the marker will bounce after it gets clicked.
        setTimeout(function() {
            marker.setAnimation(null);
        }, 2100);
    }
}


// Function that gathers the information from WikiPedia.
function wikipediaAPI(marker) {

    // Creation of variable that holds the address of the API + the title of the location.
    var wikiURL = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + marker.title + "&format=json&callback=wikiCallback";

    // AJAX request that makes sure whether or not is successful.
    $.ajax({

        // URL of the AJAX request.
        url: wikiURL,

        // Type of request.
        type: "get",

        // Type of file.
        dataType: "jsonp",

    // Function that handles the sucessful retrieval of information from Wikipedia.
    }).done(function(response) {

        // Creation of the variable of the description of the maker clicked.
        var description = response[2][0];

        // Save of the variables to the different markers.
        marker.description = description;

    // Function that handles the failed retrieval of informaton from Wikipedia.
    }).fail(function() {

        // Message that is displayed after failed attempt of retrieval of information in infowindow.
        marker.description = ("Could not connect to Wikipedia");
    });
}


// Your application’s stored data. This data represents objects and operations in your business domain (e.g., bank accounts that can perform money transfers) and is independent of any UI. When using KO, you will usually make Ajax calls to some server-side code to read and write this stored model data.
var Model = {

    // Styling the maps so the neighborhoods get highlighted.
    // Styles takes from: "https://snazzymaps.com/style/2709/local-neighborhoods"
    styles: [ {"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"},{"visibility":"on"}]},{"featureType":"administrative.neighborhood","elementType":"geometry.fill","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f1f0f0"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"visibility":"on"}]},{"featureType":"landscape.natural.landcover","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#03b7b0"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.school","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#cccccc"},{"lightness":"0"}]},{"featureType":"poi.school","elementType":"geometry.fill","stylers":[{"color":"#fcce61"}]},{"featureType":"poi.school","elementType":"labels.icon","stylers":[{"visibility":"on"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#f1f0f0"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#cccccc"},{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry.fill","stylers":[{"color":"#fcce61"}]},{"featureType":"transit.line","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"transit.station.bus","elementType":"geometry.fill","stylers":[{"hue":"#ffb300"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#2ab6de"},{"lightness":"0"},{"gamma":"1.00"}]},{"featureType":"water","elementType":"labels.text","stylers":[{"visibility":"simplified"},{"color":"#ffffff"}]}
    ],

    // Creation of location variables and hardcoded different neighborhoods.
    locations: [

        // Filter results that show the results of each neighborhood.
        {title: "Battery Park City", location: {lat: 40.7033, lng: -74.0170}},
        {title: "Carnegie Hill", location: {lat: 40.7845, lng: -73.9551}},
        {title: "Central Park", location: {lat: 40.7829, lng: -73.9654}},
        {title: "East Village", location: {lat: 40.7265, lng: -73.9815}},
        {title: "Financial District", location: {lat: 40.7075, lng: -74.0113}},
        {title: "Garment District", location: {lat: 40.7547, lng: -73.9916}},
        {title: "Gramercy Park", location: {lat: 40.7368, lng: -73.9845}},
        {title: "Greenwich Village", location: {lat: 40.7336, lng: -74.0027}},
        {title: "Harlem", location: {lat: 40.8116, lng: -73.9465}},
        {title: "Hell's Kitchen", location: {lat: 40.7638, lng: -73.9918}},
        {title: "Inwood", location: {lat: 40.8677, lng: -73.9212}},
        {title: "Kips Bay", location: {lat: 40.7423, lng: -73.9801}},
        {title: "Lenox Hill", location: {lat: 40.7662, lng: -73.9602}},
        {title: "Midtown Manhattan", location: {lat: 40.7549, lng: -73.9840}},
        {title: "Morning Heights", location: {lat: 40.8090, lng: -73.9624}},
        {title: "Nolita", location: {lat: 40.7229, lng: -73.9955}},
        {title: "SoHo", location: {lat: 40.7233, lng: -74.0030}},
        {title: "Tribeca", location: {lat: 40.7163, lng: -74.0086}},
        {title: "Tudor City", location: {lat: 40.7488, lng: -73.9716}},
        {title: "Upper East Side", location: {lat: 40.7736, lng: -73.9566}},
        {title: "Upper West Side", location: {lat: 40.7870, lng: -73.9754}},
        {title: "Washington Heights", location: {lat: 40.8417, lng: -73.9394}},
        {title: "Yorkville", location: {lat: 40.7762, lng: -73.9492}}
        ]
}; // End of Model ------------------------------------------------------------


// A pure-code representation of the data and operations on a UI. For example, if you’re implementing a list editor, your view model would be an object holding a list of items, and exposing methods to add and remove items.
var ViewModel = function() {

    // Setting this to self to differentiate easier.
    var self = this;
    this.query = ko.observable('');

    // Searched through the locations and lists the names of the different locations that were found.
    this.searchBox = ko.computed(function() {
        return ko.utils.arrayFilter(Model.locations, function(loc) {
            if (self.query().length === 0 || loc.title.toLowerCase().indexOf(self.query().toLowerCase()) > -1) {
                loc.marker.setVisible(true);
                return true;
            } else {
                loc.marker.setVisible(false);
                return false;
            }
        });
    });

    // Click function that locates the marker that the user clicked.
    this.showMarker = function(location) {
        google.maps.event.trigger(location.marker, "click");
    };

}; // End of ViewModel ---------------------------------------------------------

// Error alert if Google Maps API is not available.
var googleFail = function() {
    alert("Could not load Google Map. Try again later");
};

var VM = ViewModel;
