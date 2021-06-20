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


const changeTaskTitleCallback = action('Change status clicked')
const   changeTaskStatusCallback = action('Change status clicked')
const    removeTaskCallback = action('Remove task clicked')
const baseArg = {
  changeTaskTitle: changeTaskTitleCallback,
  changeTaskStatus:changeTaskStatusCallback,
  removeTask:removeTaskCallback,
}
const Template: Story<TasksPropsType> = (args) => <Task {...args} />;

export const TaskIsExample = Template.bind({});
TaskIsExample.args = {
task: {id:'1', title:'JS', isDone:true},
  todoListID: 'todoListID',
  ...baseArg,
};

export const TaskIsNotExample = Template.bind({});
TaskIsNotExample.args = {
  task: {id:'1', title:'JS', isDone:false},
  todoListID: 'todoListID',
 ...baseArg,
};
