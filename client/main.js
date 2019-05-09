import { Meteor } from 'meteor/meteor';
import Vue from 'vue';
import VueMeteorTracker from 'vue-meteor-tracker';   // here!

// Add plugins
Vue.use(VueMeteorTracker);                           // here!

import App from '../imports/ui/App.vue';
import './main.html';

Meteor.startup(() => {
  new Vue({
    el: '#app',
    ...App,
  });
});