// All fences-related publications

import { Meteor } from 'meteor/meteor';
import { Fences } from '../fences.js';

Meteor.startup(function () {  
	Fences._ensureIndex({ "loc": "2dsphere" }, { "unique": true });
});

Meteor.publish('fences.all', function () {
	return Fences.find();
});

Meteor.publish("fences.nearest", function (lat, lng) {

   return Fences.find({
      loc: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lat, lng]
          },
          $maxDistance: 1000   //meters
        }
      }
    });
});