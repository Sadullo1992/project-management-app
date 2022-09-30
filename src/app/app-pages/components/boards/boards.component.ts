import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { BoardsItem, CreateBoard } from '../../model/model';


@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {

  createBoardForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]]
  });
  showSpinner = false;

  boards: BoardsItem[] = [];

  @ViewChild('createBoard') createBoard: ElementRef<HTMLElement> | null = null;

  constructor(private apiService: ApiService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getBoards();
  }

  private getBoards() {
    this.showSpinner = true;
    this.apiService.getAllBoards().subscribe({
      next: (boards) => {
        this.boards = boards;
        this.showSpinner = false;
      }
    });
  }

  onCreateBoard(ngForm: FormGroupDirective) {
    this.apiService.createBoard(this.createBoardForm.value).subscribe(() => {
      this.getBoards();
    });

    this.cancelCreateBoard();
    ngForm.resetForm();
  }

  showCreateBoardModal() {
    this.createBoard?.nativeElement.classList.add('modal__conatiner--active');
  }

  cancelCreateBoard() {
    this.createBoard?.nativeElement.classList.remove('modal__conatiner--active');
    this.createBoardForm.reset();
  }

  onDeleteBoard(id: string) {
    this.apiService.deleteBoard(id).subscribe(() => {
      this.getBoards();
    });
  }

  onEditBoard(item: BoardsItem) {
    this.apiService.editBoard(item.id, {title: item.title, description: item.description}).subscribe(() => {
      this.getBoards();
    });
  }

  goToBoardPage(boardId: string) {
    this.router.navigate(['boards', boardId]);
  }
}
