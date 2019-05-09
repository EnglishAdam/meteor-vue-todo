<template>
  <div class="container">
    <header>
      <h1>Todo List ({{incompleteCount}})</h1>

      <label class="hide-completed">
        <input
          type="checkbox"
          readOnly
          :checked="hideCompleted"
          @click="toggleHideCompleted"
        />
        Hide Completed Tasks
      </label>


        <form class="new-task" @submit="handleSubmit" >
          <input
            type="text"
            v-model="text"
            ref="textInput"
            placeholder="Type to add new tasks"
          />
        </form>
    </header>

    <ul>
      <task-list-item v-for="task in tasks" :key="task._id" :task="task"></task-list-item>
    </ul>
  </div>
</template>

<script>
import { Tasks } from '../api/tasks.js';
import { Meteor } from 'meteor/meteor';
import TaskListItem from './TaskListItem.vue'

export default {
  name: 'App',

  data() {
    console.log('Sending non-Meteor data to Vue component');
    return {
      hello: 'World',
      settings: Meteor.settings.public,   // not Meteor reactive
      hideCompleted: false, // Whether to show the completed todos
      text: ''
    }
  },

  components: {
    'task-list-item': TaskListItem
  },

  // Vue Methods
  methods: {  
    handleSubmit(event) {
      event.preventDefault();
  
      // Find the text field via the React ref
      const text = this.text.trim();
  
      // Insert new task
      Meteor.call('tasks.insert', text);
  
      // Clear form
      this.text = '';
    },

    toggleHideCompleted() {
      this.hideCompleted = !this.hideCompleted
    }
  },
  // Meteor reactivity
  meteor: {
    // Subscriptions - Errors not reported spelling and capitalization.
    $subscribe: {
      'tasks': []
    },

    tasks () {
      const tasks = Tasks.find({}, { sort: { createdAt: -1 } }).fetch()
      if (this.hideCompleted)return tasks.filter(task => !task.checked)
      return tasks
    },

    incompleteCount () {
      return Tasks.find({ checked: { $ne: true } }).count()
    }
  }
}
</script>