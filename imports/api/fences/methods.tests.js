// Tests for fences methods
//
// https://guide.meteor.com/testing.html

import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { Fences } from './fences.js';
import './methods.js';

if (Meteor.isServer) {
  describe('fences methods', function () {
    beforeEach(function () {
      Fences.remove({});
    });

    it('can add a new link', function () {
      const addLink = Meteor.server.method_handlers['fences.insert'];

      addLink.apply({}, ['meteor.com', 'https://www.meteor.com']);

      assert.equal(fences.find().count(), 1);
    });
  });
}
