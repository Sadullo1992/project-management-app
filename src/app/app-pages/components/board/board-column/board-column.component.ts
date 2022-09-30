import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

import { ColumnsItem, CreateTask, TasksItem, UpdateTask } from 'src/app/app-pages/model/model';
import { User } from 'src/app/auth/model/model';
import { ApiService } from 'src/app/core/services/api.service';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';


@Component({
  selector: 'app-board-column',
  templateUrl: './board-column.component.html',
  styleUrls: ['./board-column.component.scss']
})
export class BoardColumnComponent implements OnInit {

  @Input() item: ColumnsItem = {
    id: '',
    title: '',
    order: 0
  };
  @Output() deleteColumn = new EventEmitter();
  @Output() editColumn = new EventEmitter();

  @ViewChild('confirmDeleteColumn') confirmDeleteColumn: ElementRef<HTMLElement> | null = null;
  @ViewChild('editColumnTitle') editColumnTitle: ElementRef<HTMLElement> | null = null;
  @ViewChild('createTask') createTask: ElementRef<HTMLElement> | null = null;

  editColumnForm: FormGroup = this.fb.group({
    columnTitle: ['', [Validators.required]]
  });

  tasks: TasksItem[] = [];
  users: User[] = [];

  public boardId: string = '';

  createTaskData: CreateTask = {
    title: '',
    description: '',
    userId: ''
  }
  taskForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    userId: ['', [Validators.required]]
  });

  isEdit = false;
  editingTask: TasksItem = {
    id: '',
    title: '',
    order: 0,
    description: '',
    userId: '',
    boardId: '',
    columnId: '',
    files: []
  };


  constructor(private apiService: ApiService, public route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.editColumnForm.controls['columnTitle'].setValue(this.item.title);
    this.route.params.subscribe((params) => {
      this.boardId = params['id'];
    });
    this.getTasks();
    this.getUsers();
  }

  delete() {
    this.deleteColumn.emit(this.item?.id);
  }

  showConfirmModal() {
    this.confirmDeleteColumn?.nativeElement.classList.add('modal__conatiner--active');
  }

  cancelConfirmation() {
    this.confirmDeleteColumn?.nativeElement.classList.remove('modal__conatiner--active');
  }

  edit() {
    this.editColumn.emit({
      ...this.item,
      title: this.editColumnForm.value.columnTitle,
    });
  }

  showEditColumnModal() {
    this.editColumnTitle?.nativeElement.classList.add('title__edit__form--active');
  }

  cancelEditColumn() {
    this.editColumnTitle?.nativeElement.classList.remove('title__edit__form--active');
  }

  // Task
  private getTasks() {
    this.apiService.getAllTasks(this.boardId, this.item.id).subscribe((tasks) => {
      this.tasks = tasks;
    })
  }

  onCreateTask(ngForm: FormGroupDirective) {
    this.apiService.createTask(this.boardId, this.item.id, this.taskForm.value).subscribe(() => {
      this.getTasks();
    });

    this.cancelCreateTask();
    ngForm.resetForm();
  }

  showCreateTaskModal() {
    this.createTask?.nativeElement.classList.add('modal__conatiner--active');
    this.getUsers();
  }

  cancelCreateTask() {
    this.createTask?.nativeElement.classList.remove('modal__conatiner--active');
    this.isEdit = false;
    this.taskForm.reset();
  }

  private getUsers() {
    this.apiService.getAllUsers().subscribe((users) => {
      this.users = users;
    })
  }

  onDeleteTask(taskId: string) {
    this.apiService.deleteTask(this.boardId, this.item.id, taskId).subscribe(() => {
      this.getTasks();
    })
  }

  editTask(id: string) {
    this.isEdit = true;
    this.getTask(id);
    this.showCreateTaskModal();
  }

  getTask(taskId: string) {
    this.apiService.getTask(this.boardId, this.item.id, taskId).subscribe((task) => {
      this.editingTask = task;
    })
  }

  onEditTask(ngForm: FormGroupDirective) {
    this.apiService.editTask(this.boardId, this.item.id, this.editingTask.id, {
      title: this.taskForm.value.title,
      order: this.editingTask.order,
      description: this.taskForm.value.description,
      userId: this.taskForm.value.userId,
      boardId: this.editingTask.boardId,
      columnId: this.editingTask.columnId,
    }).subscribe(() => {
      this.getTasks();
    });
    this.cancelCreateTask();
    ngForm.resetForm();
    this.isEdit = false;
  }

  drop(event: CdkDragDrop<TasksItem[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
    this.dragUpdateTasks();
  }

  dragUpdateTasks() {
    this.tasks.forEach((task, index) => {
      let obj = {
        title: task.title,
        order: index + 1,
        description: task.description,
        userId: task.userId,
        boardId: task.boardId,
        columnId: task.columnId,
      };
      this.dragUpdateTaskToServer(task.id, obj);
    });
  }

  dragUpdateTaskToServer(taskId: string, taskUpdateInfo: UpdateTask) {
    this.apiService.editTask(this.boardId, this.item.id, taskId, taskUpdateInfo).subscribe();
  }
}
