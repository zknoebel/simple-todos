/**
 * Created by zac on 2/25/17.
 */


import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '../api/tasks.js';



import './task.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {

  this.state = new ReactiveDict();

  Meteor.subscribe('tasks');

});



Template.body.helpers({
  tasks() {

    return Tasks.find({});

  },

});

Template.body.events({
  'submit .new-task'(event){
    event.preventDefault();



    const text = target.text.value;



    // Insert a task into the collection

    Meteor.call('tasks.insert', text);



    // Clear form

    target.text.value = '';



    Tasks.insert({
      text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });

    target.text.value = '';
  },
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },
});

Template.body.helpers({
  tasks(){
    const instance = Template.instance();
    return Tasks.find({ checked: { $ne: true } }, {sort: {createdAt: -1 }});
    return Tasks.find({}, { sort: { createdAt: -1 }});
  },
  incompleteCount() {
    return Tasks.find({ checked: {$ne: true } }).count();
  }
});
