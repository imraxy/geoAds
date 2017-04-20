import { Fences } from '/imports/api/fences/fences.js';
import { Meteor } from 'meteor/meteor';
import './info.html';

Template.info.onCreated(function () {
  Meteor.subscribe('fences.all');
  Meteor.subscribe('fences.nearest', 26.88755022616618, 75.83488941192627 );
});

Template.info.helpers({
  fences() {
    return Fences.find({});
  },
  nearestFences(){
    
  }
});

Template.info.events({
  'submit .info-link-add'(event) {
    event.preventDefault();

    const target = event.target;
    const lat = target.lat;
    const lng = target.lng;
    const radius = target.radius;
    const advertisements = [{title: target.advertisement_title.value, description: target.advertisement_description.value}];

    Meteor.call('fences.replace', lat.value, lng.value, radius.value, advertisements, (error) => {
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
