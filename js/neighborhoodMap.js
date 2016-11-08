

// Creation of main variables
var map,
    marker,
    infoWindow;


// Function to load the Google Maps API.
function initMap() {

    // Initial coordinates when the map is first loaded
    initialCoordinates = Model.locations[2].location;

    // Different options that manipulate the map API
    var options = {
        //Central Park is the center of the map.
        center: initialCoordinates,
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
        var positions = [
            {loc.northFilter.location};
        ];

        // Create the variable "titles" within the scope of the for loop to get the name of the neighborhood.
        var titles = loc.title;


        // Create the variable "marker" within the scope of the for loop.
        marker = new google.maps.Marker({
            position: positions,
            title: titles,
            animation: google.maps.Animation.DROP,
            map: map
        });

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
}; // End of initMap -----------------------------------------------------------


// Function that populates the infowindow with the appropiate text.
function infowindowDescription(marker, infoWindow) {

    // Checking if infowindow is open.
    if (infoWindow.marker != marker) {

        // Setting infowindow to equate to marker.
        infoWindow.marker = marker;

        // Setting the location of where the infowindow will open.
        infoWindow.open(map, marker);

        // Setting the text content that appears within the infowindo.
        infoWindow.setContent(marker.title);

        // Setting the event listener to clear when the infowindow is closed.
        infoWindow.addListener("closeclick", function(){
            infoWindow.marker = null;
            // Changes the marker color back to its default color.
            // marker.setIcon(initMap.defaultIcon);
        });
    };
};


// Function that makes the markers bounce when they are selected.
function toggleBounce(marker) {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
};


// Your application’s stored data. This data represents objects and operations in your business domain (e.g., bank accounts that can perform money transfers) and is independent of any UI. When using KO, you will usually make Ajax calls to some server-side code to read and write this stored model data.
var Model = {

    // Styling the maps so the neighborhoods get highlighted.
    // Styles takes from: "https://snazzymaps.com/style/2709/local-neighborhoods"
    styles: [ {"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"},{"visibility":"on"}]},{"featureType":"administrative.neighborhood","elementType":"geometry.fill","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f1f0f0"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"visibility":"on"}]},{"featureType":"landscape.natural.landcover","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#03b7b0"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.school","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#cccccc"},{"lightness":"0"}]},{"featureType":"poi.school","elementType":"geometry.fill","stylers":[{"color":"#fcce61"}]},{"featureType":"poi.school","elementType":"labels.icon","stylers":[{"visibility":"on"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#f1f0f0"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#cccccc"},{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry.fill","stylers":[{"color":"#fcce61"}]},{"featureType":"transit.line","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"transit.station.bus","elementType":"geometry.fill","stylers":[{"hue":"#ffb300"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#2ab6de"},{"lightness":"0"},{"gamma":"1.00"}]},{"featureType":"water","elementType":"labels.text","stylers":[{"visibility":"simplified"},{"color":"#ffffff"}]}
    ],

    // Creation of location variables and hardcoded different neighborhoods.
    locations: [

        // Filter results that show the results of each neighborhoods.
        {northFilter: {
            {title: "Harlem", location: {lat: 40.8116, lng: -73.9465}},
            {title: "Inwood", location: {lat: 40.8677, lng: -73.9212}},
            {title: "Washington Heights", location: {lat: 40.8417, lng: -73.9394}}
        }},

        {eastFilter: {
            {title: "Carnegie Hill", location: {lat: 40.7845, lng: -73.9551}},
            {title: "Lenox Hill", location: {lat: 40.7662, lng: -73.9602}},
            {title: "Upper East Side", location: {lat: 40.7736, lng: -73.9566}},
            {title: "Yorkville", location: {lat: 40.7762, lng: -73.9492}}
        }},

        {southFilter: {
            {title: "Battery Park City", location: {lat: 40.7033, lng: -74.0170}},
            {title: "East Village", location: {lat: 40.7265, lng: -73.9815}},
            {title: "Financial District", location: {lat: 40.7075, lng: -74.0113}},
            {title: "Garment District", location: {lat: 40.7547, lng: -73.9916}},
            {title: "Gramercy Park", location: {lat: 40.7368, lng: -73.9845}},
            {title: "Greenwich Village", location: {lat: 40.7336, lng: -74.0027}},
            {title: "Kips Bay", location: {lat: 40.7423, lng: -73.9801}},
            {title: "Midtown", location: {lat: 40.7549, lng: -73.9840}},
            {title: "Nolita", location: {lat: 40.7229, lng: -73.9955}},
            {title: "SoHo", location: {lat: 40.7233, lng: -74.0030}},
            {title: "Tribeca", location: {lat: 40.7163, lng: -74.0086}},
            {title: "Tudor City", location: {lat: 40.7488, lng: -73.9716}}
        }},

        {westFilter: {
            {title: "Hell's Kitchen", location: {lat: 40.7638, lng: -73.9918}},
            {title: "Upper West Side", location: {lat: 40.7870, lng: -73.9754}}
        }}
    ]
}; // End of Model ------------------------------------------------------------


// A pure-code representation of the data and operations on a UI. For example, if you’re implementing a list editor, your view model would be an object holding a list of items, and exposing methods to add and remove items.
var ViewModel = function() {

    // Setting this to self to differentiate easier.
    var self = this;

    // Creation of observable array and binding it to Model.locations.
    self.locationsList = ko.observableArray(Model.locations);

    // Creation of observable array that bind to the different checkboxes.
    // self.neighborhoods = ko.observableArray([northFilter, eastFilter, southFilter, westFilter]);

    // Sets the default value of the checkboxes to false so they are not checked.
    self.visibleFilters = ko.observable(false);

    // Computed funtion that filters only the north neighborhoods.
    self.northArray = ko.computed(function() {

    });

    // Computed funtion that filters only the east neighborhoods.
    self.eastArray = ko.computed(function() {

    });

    // Computed funtion that filters only the south neighborhoods.
    self.southArray = ko.computed(function() {

    });

    // Computed funtion that filters only the west neighborhoods.
    self.westArray = ko.computed(function() {

    });
}; // End of ViewModel ---------------------------------------------------------

// Error alert if Google Maps API is not available.
var googleFail = function() {
    alert("Could not load Google Map. Try again later");
};

var VM = ViewModel;
