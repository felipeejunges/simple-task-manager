import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks?: Array<Task>;

  constructor(private taskService: TaskService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((tasks: any[]) => {
      this.tasks = []
      this.tasks = tasks;
    });
  }

  openEditDialog(task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '250px',
      data: { task: { ...task } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTasks();
      }
    });
  }

  openNewTaskDialog(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '250px',
      data: { task: { id: null, title: '' } }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadTasks();
    });
  }


  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
  }
}