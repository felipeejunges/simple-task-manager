import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task },
    private taskService: TaskService
  ) { }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.data.task.id ? this.updateTask(this.data.task) : this.addTask(this.data.task)
  }

  updateTask(task: Task): void {
    this.taskService.updateTask(task).subscribe(() => {
      this.dialogRef.close(this.data.task);
    });
  }

  addTask(task: Task): void {
    this.taskService.addTask(task).subscribe(() => {
      this.dialogRef.close(this.data.task);
    });
  }
}