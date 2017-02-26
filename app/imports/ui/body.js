/**
 * Created by zac on 2/25/17.
 */

import { Template } from 'meteor/templating';

import './body.html';

Template.body.helpers({
  tasks:  [
    { text: 'This is task 1'},
    { text: 'This is task 2'},
    { text: 'This is task 3'}
  ],
    }
);
