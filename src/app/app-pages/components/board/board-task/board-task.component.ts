import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TasksItem } from 'src/app/app-pages/model/model';
import { User } from 'src/app/auth/model/model';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-board-task',
  templateUrl: './board-task.component.html',
  styleUrls: ['./board-task.component.scss']
})
export class BoardTaskComponent implements OnInit {

  @Input() task: TasksItem = {
    id: '',
    title: '',
    order: 0,
    description: '',
    userId: '',
    boardId: '',
    columnId: '',
    files: []
  };
  @Output() onDelete = new EventEmitter();

  user: User | null = null;

  @ViewChild('confirmDeleteTask') confirmDeleteTask: ElementRef<HTMLElement> | null = null;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getUser();
  }


  private getUser() {
    this.apiService.getUser(this.task.userId).subscribe((user) => {
      this.user = user;
    })
  }

  delete() {
    this.onDelete.emit(this.task.id);
  }
  showConfirmModal() {
    this.confirmDeleteTask?.nativeElement.classList.add('modal__conatiner--active');
  }

  cancelConfirmation() {
    this.confirmDeleteTask?.nativeElement.classList.remove('modal__conatiner--active');
  }

}
