import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Button, ButtonProps } from './Button';
import AddItemForm, {AddItemFormPropsType} from "../AddItemForm";
import {action} from "@storybook/addon-actions";
import Task, {TasksPropsType} from "../Task";

export default {
  title: 'TODOLIST/Task',
  component: Task,

} as Meta;

const Template: Story<TasksPropsType> = (args) => <Task {...args} />;

export const TaskExample = Template.bind({});
TaskExample.args = {
task: {id:'1', title:'JS', isDone:true},
  todoListID: 'todoListID',
  changeTaskTitle: action('Change status clicked'),
      changeTaskStatus:action('Change status clicked'),
    removeTask: action('Remove task clicked'),
};

export const TaskIsNotExample = Template.bind({});
TaskIsNotExample.args = {
  task: {id:'1', title:'JS', isDone:false},
  todoListID: 'todoListID',
  changeTaskTitle: action('Change status clicked'),
  changeTaskStatus:action('Change status clicked'),
  removeTask: action('Remove task clicked'),
};
