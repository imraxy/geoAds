import { Fences } from '/imports/api/fences/fences.js';
import './map.html';

Meteor.startup(function() {  
	GoogleMaps.load({ v: '3', key: 'AIzaSyA38OB3QrAv4fC2d4B5w98VxsgfqiC4yY4', libraries: 'geometry,places,drawing' });
});

Template.map.onCreated(function() {

Meteor.subscribe('fences.all');
Meteor.subscribe('fences.nearest', [ 26.88755022616618, 75.83488941192627 ]);

var circle;

GoogleMaps.ready('map', function(map) {
  
	var map = GoogleMaps.maps.map.instance;
  
	var infoWindow = new google.maps.InfoWindow({
		map: map
	});

	/** /
	google.maps.event.addListener(map, 'click', function(event) {
		Fences.insert({ lat: event.latLng.lat(), lng: event.latLng.lng() });
	});
	/**/

	
	var markers = {};

	Fences.find().observe({
		added: function (document) {
			var marker = new google.maps.Marker({
				draggable: true,
				animation: google.maps.Animation.DROP,
				position: new google.maps.LatLng(document.lat, document.lng),
				title: document.advertisements[0]['title'],
				map: map,
				id: document._id
			});

			google.maps.event.addListener(marker, 'dragend', function(event) {

				Meteor.call('fences.update', marker.id, event.latLng.lat(), event.latLng.lng(), (error) => {
					if (error) {
						alert(error.error);
					} else {
						alert(marker.title + " Updated location");
					}
		  		});
			});

			markers[document._id] = marker;
		},

		changed: function (newDocument, oldDocument) {
			markers[newDocument._id].setPosition({ lat: newDocument.lat, lng: newDocument.lng });
		},

		removed: function (oldDocument) {
			markers[oldDocument._id].setMap(null);
			google.maps.event.clearInstanceListeners(markers[oldDocument._id]);
			delete markers[oldDocument._id];
		}	
	});

	/**/  
  
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
  	navigator.geolocation.getCurrentPosition(function(position) {
  
	var pos = {
		lat: position.coords.latitude,
		lng: position.coords.longitude
	};

	infoWindow.setPosition(pos);

	infoWindow.setContent('We are here...');
  
  	map.setCenter(pos);
  }, function() {
  	handleLocationError(true, infoWindow, map.getCenter());
  });
  
  } else {
  	// Browser doesn't support Geolocation
  	handleLocationError(false, infoWindow, map.getCenter());
  }
  
	var drawingManager = new google.maps.drawing.DrawingManager({
		drawingMode: google.maps.drawing.OverlayType.MARKER,
		drawingControl: true,
		drawingControlOptions: {
		position: google.maps.ControlPosition.TOP_CENTER,
		drawingModes: [
			google.maps.drawing.OverlayType.CIRCLE
			]
  		},
  
	circleOptions: {
		fillColor: '#ffff00',
		fillOpacity: 1,
		strokeWeight: 5,
		clickable: false,
		editable: true,
		zIndex: 1
	}
  });
  
  drawingManager.setMap(map);

  drawingManager.setDrawingMode(google.maps.drawing.OverlayType.CIRCLE);
  
  google.maps.event.addListener(drawingManager, 'circlecomplete', onCircleComplete);

});

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
	'Error: The Geolocation service failed.' :
	'Error: Your browser dont support geolocation.');
}
  
function onCircleComplete(shape) {
	if (shape == null || (!(shape instanceof google.maps.Circle))) return;
	if (circle != null) {
		circle.setMap(null);
		circle = null;
	}

circle = shape;

$(".info-link-add input[name=radius]").val(circle.getRadius());
$(".info-link-add input[name=lat]").val(circle.getCenter().lat());
$(".info-link-add input[name=lng]").val(circle.getCenter().lng());

}
});

Template.map.helpers({
mapOptions: function() {
	if (GoogleMaps.loaded()) {
		return {
			center: new google.maps.LatLng(26.886248834126576, 75.83332300186157),
			zoom: 16
		};
	}
}
});