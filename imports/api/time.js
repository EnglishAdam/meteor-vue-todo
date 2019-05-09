import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Time = new Mongo.Collection('time');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('time', function () {
    return Time.find({});
  });
}

Meteor.methods({
  'time.update'() {
    Time.upsert('currentTime', { $set: { time: new Date() } });
  }
})