// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Fences } from '../../api/fences/fences.js';

Meteor.startup(() => {
  // if the Fences collection is empty
  if (Fences.find().count() === 0) {
    
    //server.call('login', {user: {email: 'imraxy@gmail.com'}, password: 'spykid'});

    const data = [
      {
        userId: this.userId,
        lat: 26.889281,
        lng: 75.836042,
        createdAt: new Date(),
        advertisements:[
        {title:'First Advt', description: 'this is first Advt'}
        ]
      },
      {
        userId: this.userId,
        lat: 26.887591,
        lng: 75.834095,
        createdAt: new Date(),
        advertisements:[
        {title:'Second Advt', description: 'this is second Advt'}
        ]
      },
      {
        userId: this.userId,
        lat: 26.886062,
        lng: 75.833428,
        createdAt: new Date(),
        advertisements:[
        {title:'Third Advt', description: 'this is third Advt'}
        ]
      },
      
    ];

    data.forEach(fence => Fences.insert(fence));
  }
});
