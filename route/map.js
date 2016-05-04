
        var map = L.map('routingmap', {
            center : [47.264269, 11.385312],
            zoom : 16
        });
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap contributors</a>'
        }).addTo(map);


var routing = L.Routing.control({
  waypoints: [
    L.latLng(47.26, 11.38),
    L.latLng(47, 12.54)
  ]
}).addTo(map);
map.setView([47.26, 11.38],9)

//punkt zu punkt map.on("click", function(event)) -> console.log vom event