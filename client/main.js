import { Template } from 'meteor/templating';
import { Tasks } from '../lib/collections.js';
import { Accounts } from 'meteor/accounts-base';

//configure the accounts UI to use usernames
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

import './main.html';

//Runs on every template
Template.body.helpers({

  tasks(){
    return Tasks.find({});
  }
});


Template.add.events({
  'submit .add-form':function(){
    event.preventDefault();

    // Get input value
    const target = event.target;
    const text = target.text.value;

    //insert Task into collection
    Meteor.call('tasks.insert',text);
    // Tasks.insert({
    //   text:text,
    //   createdAt: new Date(),
    //   owner: Meteor.userId(),
    //   username: Meteor.user().username
    // });

    //Clear the input field
    target.text.value = '';

    //Close the Modal
    $('#addTask').modal('close');

    return false;
  }
});


Template.task.events({
  'click .delete-task': function(){
    //Tasks.remove(this._id);
    Meteor.call('tasks.remove',this);
    return false;
  }
});
