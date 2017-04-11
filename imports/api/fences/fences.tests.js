// Tests for the behavior of the fences collection
//
// https://guide.meteor.com/testing.html

import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { Fences } from './fences.js';

if (Meteor.isServer) {
  describe('fences collection', function () {
    it('insert correctly', function () {
      const fenceId = Fences.insert({
        lat: 'meteor homepage',
        lng: 'https://www.meteor.com',
      });
      const added = Fences.find({ _id: fenceId });
      const collectionName = added._getCollectionName();
      const count = added.count();

      assert.equal(collectionName, 'fences');
      assert.equal(count, 1);
    });
  });
}
