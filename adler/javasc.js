/*adlerweg script
 zeigt drei etappen des adlerwegs auf einer leflet karte mit photos von panoramio
 verteilt auf mehrere zeilen
*/
//var hallo ="sepp"
//alert(hallo)
/*var liste=[1,2,3,4,5]
alert(liste.length) -> die anzahl der elemente wird angezeigt
alert(liste[0]) -> erste element wird angesprochen mit 0, eckige Klammer immer bei listen


var termin={
	"ort": "Innsbruck",
	"zeit": "18 uhr"
	"teilnehmer": ['maria','sepp','franz']
			}
alert(termin.ort) -> ort wird angesprochen		
alert(termin.teilnehmer[0]) -> maria wird angesprochen

for (i=0; i<termin.teilnehmer.length; i+=1){ -> vorschleife, i ist variable für liste, teilnehmerliste wurd durchgegangen (anfang, bis wohin, was passiert nach jeder schleife)
	alert(termin.teilnehmer[i])
											}
	
for (key in termin) 	{
	if (key=="tag")	{				->!= verneinung
	alert(key +"-" + termin[key]);
					}
	else	{
		alert('kein tag', sondern '+key)
	}
						}
)	

function saghallo() {
		alert("hallo")
}
sageHallo();
function sagWas(message) {
		alert("message")
}
sagWas(ich_kenn_mich_nicht_aus);
*/

window.onload = function() {
            var adlerKarte = L.map("adlerkarteDiv");

            var layers = { // http://www.basemap.at/wmts/1.0.0/WMTSCapabilities.xml
                geolandbasemap: L.tileLayer("http://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
                    subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
                    attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
                }),
                bmapoverlay: L.tileLayer("http://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
                    subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
                    attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
                }),
                bmapgrau: L.tileLayer("http://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
                    subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
                    attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
                }),
                bmaphidpi: L.tileLayer("http://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
                    subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
                    attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
                }),
                bmaporthofoto30cm: L.tileLayer("http://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
                    subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
                    attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
                })
            };
            adlerKarte.addLayer(layers.geolandbasemap);
            //adlerKarte.setView([47, 11], 10);
            var etappe02 = L.geoJson(etappe02json, {
                style: {
                    color: "#ff0050",
                    weight: 15
                }
            });

            var etappe03 = L.geoJson(etappe03json, {
                style: {
                    color: "#ff1500",
                    weight: 15
                }
            });

            var etappe04 = L.geoJson(etappe04json, {
                style: {
                    color: "#0404B4",
                    weight: 15
                }
            });

            var etappenGruppe = L.featureGroup([etappe02, etappe03, etappe04]);
            adlerKarte.addLayer(etappenGruppe);
            adlerKarte.fitBounds(etappenGruppe.getBounds());
            //L.control.layers({"OSM":layers},{"Tracks":etappenGruppe}).addTo(adlerKarte);

            L.control.layers({
                "Geoland Basemap": layers.geolandbasemap,
                "Geoland Basemap Overlay": layers.bmapoverlay,
                "Geoland Basemap Grau": layers.bmapgrau,
                "Geoland Basemap High DPI": layers.bmaphidpi,
                "Geoland Basemap Orthofoto": layers.bmaporthofoto30cm
            }, {
                etappenGruppe
            }).addTo(adlerKarte)



            etappe02.bindPopup("<b>Etappe 02</b>");
            etappe03.bindPopup("<b>Etappe 03</b>");
            etappe04.bindPopup("<b>Etappe 04</b>");

            var bounds = etappenGruppe.getBounds();

            var url = 'http://www.panoramio.com/map/get_panoramas.php?set=public&from=0&to=20' +
                '&minx=' + bounds.getWest() +
                '&miny=' + bounds.getSouth() +
                '&maxx=' + bounds.getEast() +
                '&maxy=' + bounds.getNorth() +
                '&size=mini_square&mapfilter=true&callback=zeigBilder';
            //alert(url);

            var script = document.createElement("script");
            script.src = url;
            document.getElementsByTagName('head')[0].appendChild(script);

            window.zeigBilder = function(data) {
                for (var i = 0; i < data.photos.length; i++) {
                    console.log("Photo title: ", i, data.photos[i].photo_title);
                    L.marker([data.photos[i].latitude, data.photos[i].longitude], {
                            icon: L.icon({
                                iconUrl: data.photos[i].photo_file_url
                            })
                        }).bindPopup("<h2>" + data.photos[i].photo_title + "</h2>" + "<a href='" + data.photos[i].photo_url + "'>Link zum Bild</a>")
                        .addTo(adlerKarte);
                }
            }
        };