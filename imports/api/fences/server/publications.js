// All fences-related publications

import { Meteor } from 'meteor/meteor';
import { Fences } from '../fences.js';

Meteor.publish('fences.all', function () {
	return Fences.find();
});

Meteor.publish("fences.nearest", function (latlng) {
   return Fences.find({
      loc: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: latlng
          },
          $maxDistance: 1000   //meters
        }
      }
    });
});