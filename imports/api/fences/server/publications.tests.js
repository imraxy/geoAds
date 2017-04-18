// Tests for the fences publications
//
// https://guide.meteor.com/testing.html

import { assert } from 'meteor/practicalmeteor:chai';
import { Fences } from '../fences.js';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';
import './publications.js';

describe('fences publications', function () {
  beforeEach(function () {
    Fences.remove({});
    Fences.insert({
      lat: 'meteor homepage',
      lng: 'https://www.meteor.com',
    });
  });

  describe('fences.all', function () {
    it('sends all fences', function (done) {
      const collector = new PublicationCollector();
      collector.collect('fences.all', (collections) => {
        assert.equal(collections.fences.length, 1);
        done();
      });
    });
  });

  describe('fences.nearest', function () {
    it('sends neatest fences', function (done) {
      const collector = new PublicationCollector();
      collector.collect('fences.nearest', (collections) => {
        assert.equal(collections.fences.length, 1);
        done();
      });
    });
  });
});
