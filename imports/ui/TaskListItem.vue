<template>
  <li :class="taskClassName">
    <button class="delete" @click="deleteThisTask">&times;</button>
    <!-- Delete button -->

    <input type="checkbox" readOnly :checked="task.checked" @click="toggleChecked" />
    <!-- Text Input -->

    <span className="text">{{task.text}}</span>
    <!-- Test -->
  </li>
</template>

<script>
import { Meteor } from 'meteor/meteor';
import { Tasks } from '../api/tasks.js';

export default {
  name: 'TaskListItem',

  props: [
    'task'
  ],

  computed: {
    taskClassName() {
      if (this.task.checked) return 'checked'
      return ''
    }
  },

  methods: {
    toggleChecked() {
      // Set the checked property to the opposite of its current value
      Meteor.call('tasks.setChecked', this.task._id, !this.task.checked);
    },

    deleteThisTask() {
      Meteor.call('tasks.remove', this.task._id);
    }
  }
}
</script>