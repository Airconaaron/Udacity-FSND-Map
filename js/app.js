var map;
function initMap() {
    var rafflesCity = {lat: 1.294, lng: 103.8534};
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 1.30, lng: 103.84},
      zoom: 14
    });
    var marker = new google.maps.Marker({
          position: rafflesCity,
          map: map,
          animation: google.maps.Animation.DROP,
          title: "Raffles City"
        });
    var infoWindow = new google.maps.InfoWindow({
        content: "<h2> Raffles City </h2>"
    })
    marker.addListener('click', function (){
        infoWindow.open(map, marker);
    })
    ko.applyBindings(new ViewModel());
}

function mapsError() {
    var h = document.createElement("H1");
    h.appendChild(document.createTextNode("An error occured with Google Maps please refresh! "));
    document.getElementById('map').appendChild(h);
}

var restaurantsdummy = [
    {name: 'dumbass', visible: true},
    {name: 'bitch', visible: true},
    {name: 'stupid', visible: true},
];
// Let's use the yelp api to retrieve the top
// var backupData = [
// {name:, lat:, lng:, yelpID: },
// {name:, lat:, lng:, yelpID: },
// {name:, lat:, lng:, yelpID: },
// {name:, lat:, lng:, yelpID: },
// {name:, lat:, lng:, yelpID: }
// ]
var clientID = "4iHSnv81UKKBiPrCXMZbIA";
var clientSecret = "rPfvCTeYUrApYCF9bVaPapX5ba8MZKwBUfBTccRgUsBnSHfBa2RoWEcerQn3XtpO";
var access_token = "lhFmwIj5PVyMkmZ_AtUxkUEexQByVn7D7_befbBL93QzNWFosyGzGL-KQX6iZEAkNFu_8lsaih30bvHuiD1ZVLVTaWhRIU5zH6Qm5CsvfIdk-T1yu7dJ5KYvLuvmWXYx";
// Token for yelp should never expire

var yelp_search_url = "https://api.yelp.com/v3/businesses/search";
var yelp_reviews_url = ""

// var crypto = require('crypto');
// var OAuth = require('oauth-1.0a');

// var oauth = OAuth({
//     consumer: {
//         key: '<your consumer key>',
//         secret: '<your consumer secret>'
//     },
//     signature_method: 'HMAC-SHA1',
//     hash_function: function(base_string, key) {
//         return crypto.createHmac('sha1', key).update(base_string).digest('base64');
//     }
// });
var ViewModel = function() {
    var self = this;

    self.filtertext = ko.observable("")
    self.showItem = function () {
        console.log(self.filtertext())
    }
    self.restaurants = ko.observableArray(restaurantsdummy);
}

