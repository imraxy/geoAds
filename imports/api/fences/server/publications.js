// All fences-related publications

import { Meteor } from 'meteor/meteor';
import { Fences } from '../fences.js';

Meteor.publish('fences.all', function () {
  return Fences.find();
});
