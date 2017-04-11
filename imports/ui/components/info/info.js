import { Fences } from '/imports/api/fences/fences.js';
import { Meteor } from 'meteor/meteor';
import './info.html';

Template.info.onCreated(function () {
  Meteor.subscribe('fences.all');
});

Template.info.helpers({
  fences() {
    return Fences.find({});
  },
});

Template.info.events({
  'submit .info-link-add'(event) {
    event.preventDefault();

    const target = event.target;
    const lat = target.lat;
    const lng = target.lng;
    const radius = target.radius;
    const advertisements = [{title: target.advertisement_title.value, description: target.advertisement_description.value}];

    Meteor.call('fences.insert', lat.value, lng.value, radius.value, advertisements, (error) => {
      if (error) {
        alert(error.error);
      } else {
        lat.value = '';
        lng.value = '';
        radius.value = '';
        target.advertisement_title.value = '';
        target.advertisement_description.value = '';
      }
    });
  },
});
