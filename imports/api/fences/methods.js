// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Fences } from './fences.js';
import { Analytics } from './analytics.js';

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
      loc: [lat, lng],
      createdAt: new Date(),
    });
  },

  'fences.replace'(lat, lng, radius, advertisements) {
    //check(url, String);
    //check(title, String);
    
    return Fences.update({lat: lat, lng: lng}, {
      userId: Meteor.userId(),
      lat,
      lng,
      radius,
      advertisements: advertisements,
      loc: [Number(lat), Number(lng)],
      createdAt: new Date(),
    }, { upsert : true });
  },

  'fences.update'(documentId, lat, lng, radius, advertisements) {
    //check(url, String);
    //check(title, String);
    var setDoc = {};

    if(!(documentId) || !(Meteor.userId())) return false;

    setDoc.userId = Meteor.userId();
    setDoc.updatedAt = new Date();

    if(lat) setDoc.lat = lat;
    if(lng) setDoc.lng = lng;    
    if(radius) setDoc.radius = radius;    
    if(advertisements) setDoc.advertisements = advertisements;
    if(lat && lng) setDoc.loc = [Number(lat), Number(lng)];

    return Fences.update({ _id: documentId }, {
      $set: setDoc
    });
  },

  'analytics.insert'(fenceId, deviceId) {
    //check(url, String);
    //check(title, String);
    
    return Analytics.insert({
      userId: Meteor.userId(),
      deviceId: deviceId,
      fenceId: ObjectId(fenceId),
      createdAt: new Date(),
    });
  },

  'analytics.update'(fenceId, deviceId) {
    //check(url, String);
    //check(title, String);
    
    return Analytics.update({fenceId, deviceId}, {
      userId: Meteor.userId(),
      deviceId: deviceId,
      fenceId: ObjectId(fenceId),
      createdAt: new Date(),
    }, { upsert : true });
  },
});