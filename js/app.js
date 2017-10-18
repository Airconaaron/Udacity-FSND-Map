var map;
// default restaurants
var restaurantsdummy = [      
    {id: "52d0b63811d2fd7c68dde58d", name: "Loving Hut", visible: true, lat: 1.3111, lng: 103.9011, marker: null},
    {id: "5040b096e4b053a531156a51", name: "Eight Treasures Vegan", visible: true, lat: 1.2871636946078702, lng: 103.8478677916091, marker: null},
    {id: "4c88c4130f3c236a5422f55c", name: "VeganBurg", visible: true, lat: 1.3209101273283017, lng: 103.9051775284811, marker: null},
    {id: "5715bdc138fa6cc402aacc27", name: "Jiu Pin Lian Vegan Food", visible: true, lat: 1.276715, lng: 103.845832, marker: null},
    {id: "4bbb60a053649c74a6fd49fb", name: "Enso Kitchen Japanese Zen Vegan", visible: true, lat: 1.2792761860213915, lng: 103.83973801274446, marker: null},
    {id: "55c79686498e2d86e5f8a340", name: "Genesis Vegan Restaurant", visible: true, lat: 1.3136886876351592, lng: 103.852963304929, marker: null},
    {id: "56aa6e34498ed42196c9caf0", name: "nomVnom", visible: true, lat: 1.288992, lng: 103.846746, marker: null},
    {id: "4e741c8baeb780be09a0321f", name: "Sarnies", visible: true, lat: 1.281584, lng: 103.848005, marker: null},
    {id: "4f893f93e4b039b144e41437", name: "The Living Cafe & Deli", visible: true, lat: 1.331001, lng: 103.796405, marker: null},
    {id: "54c47d68498ee8c2a68aba27", name: "Green Dot", visible: true, lat: 1.318825, lng: 103.892634, marker: null}
];

var clientID = "WWXWZRK4KOQZVZIASI5Q04TDA1ZBTFHTGS5CX1WP53OY0NAN";
var clientSecret = "TXETBY5QVYOWTNSVTXYUIKT0CQO21KN1HA2BVOIEZYIPLV2M";
var foursquare_search_url = "https://api.foursquare.com/v2/venues/search";
var restaurant_detail_url = "https://api.foursquare.com/v2/venues/";

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 1.30, lng: 103.84},
      zoom: 12
    });
    restaurantsdummy.forEach(function(datum) {
        var newMarker = new google.maps.Marker({
            position: {lat: datum.lat,lng:datum.lng},//{datum['lat'], datum['lng']},
            map: map,
            animation: google.maps.Animation.Drop,
            title: datum.name
        });
        datum.marker = newMarker;
        var contentStr = "";
        // retrieves content for our info window
        $.ajax({
                url: restaurant_detail_url + datum.id,
                type: "get",
                data: {
                    client_id: clientID,
                    client_secret: clientSecret,
                    v: 20170101,
                },
                dataType: "json",
                success: function(data) {
                    place = data.response.venue;
                    var pref = "img/";
                    var suff = "/dumbcat.jpg";
                    if (place.bestPhoto != undefined) {
                        pref = place.bestPhoto.prefix;
                        suff = place.bestPhoto.suffix
                    }
                    contentStr = "<h2>" + datum.name + "</h2>" + 
                                "<p> Price: " + place.price.message+ "</p>" +
                                "<img src=\' " + pref + "200x200" + suff + " \' class = \' center-block\'> "; 
                    var newInfo = new google.maps.InfoWindow({
                        content: contentStr
                    });
                    newMarker.addListener('click', function(){
                        newInfo.open(map,newMarker);
                        map.panTo(newMarker.getPosition())
                    });
                },
                error: function(e) {
                    alert('Something went wrong with FourSquare');
                }
            });
    });
    ko.applyBindings(new ViewModel());
}

// error function for when google maps fails
function mapsError() {
    // incase JQuery didn't load either ...
    var h = document.createElement("H1");
    h.appendChild(document.createTextNode("An error occured with Google Maps please refresh! "));
    document.getElementById('map').appendChild(h);
}

var ViewModel = function() {
    var self = this;
    self.filtertext = ko.observable("")
    self.showItem = function (data) {
        google.maps.event.trigger(data.marker, 'click');
    }
    // store all restaurants here
    self.restaurants = ko.observableArray(restaurantsdummy);
    self.restaurantsFilter = ko.computed(function() {
        var myfilter = self.filtertext().toLowerCase();
        if (myfilter.length > 0) {
            // then actually do something cuz theres a word
            return ko.utils.arrayFilter(self.restaurants(), function(item) {
                item.visible = item.name.toLowerCase().includes(myfilter);
                return item.visible;
            });
        }
        else {
            // thingie is empty
            self.restaurants().forEach(function(datum){
                datum.visible = true;
            });
            return self.restaurants();
        }
    }, self);
}
