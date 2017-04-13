// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Fences } from './fences.js';

Meteor.methods({
  'fences.insert'(lat, lng, radius, advertisements) {
    //check(url, String);
    //check(title, String);

    return Fences.insert({
      userId: Meteor.userId(),
      lat,
      lng,
      radius,
      advertisements: advertisements,
      createdAt: new Date(),
    });
  },

  'fences.update'(lat, lng, radius, advertisements) {
    //check(url, String);
    //check(title, String);
    
    return Fences.update({lat: lat, lng: lng}, {
      userId: Meteor.userId(),
      lat,
      lng,
      radius,
      advertisements: advertisements,
      createdAt: new Date(),
    }, { upsert : true });
  },
});