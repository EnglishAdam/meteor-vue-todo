import { Meteor } from 'meteor/meteor';

import { Time } from '../imports/api/time.js';

Meteor.startup(() => {
    // Update the current time
    Meteor.call('time.update');
    // Add a new doc on each start.
    Time.insert({ time: new Date() });
    // Print the current time from the database
    console.log(`The time is now ${Time.findOne().time}`);
});
