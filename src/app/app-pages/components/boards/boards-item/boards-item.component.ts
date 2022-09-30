import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { BoardsItem } from 'src/app/app-pages/model/model';

@Component({
  selector: 'app-boards-item',
  templateUrl: './boards-item.component.html',
  styleUrls: ['./boards-item.component.scss']
})
export class BoardsItemComponent implements OnInit {

  @Input() item: BoardsItem | null = null;
  @Output() deleteBoard = new EventEmitter();
  @Output() editBoard = new EventEmitter();

  @ViewChild('editBoardRef') editBoardRef: ElementRef<HTMLElement> | null = null;
  @ViewChild('confirmDeleteBoard') confirmDeleteBoard: ElementRef<HTMLElement> | null = null;

  editBoardForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  delete() {
    this.deleteBoard.emit(this.item?.id);
  }

  edit(ngForm: FormGroupDirective) {
    this.editBoard.emit({
      ...this.item,
      title: this.editBoardForm.value.title,
      description: this.editBoardForm.value.description});

    this.cancelEditBoard();
    ngForm.resetForm();
  }

  showEditBoardModal() {
    this.editBoardRef?.nativeElement.classList.add('modal__conatiner--active');
  }

  cancelEditBoard() {
    this.editBoardRef?.nativeElement.classList.remove('modal__conatiner--active');
    this.editBoardForm.reset();
  }

  showConfirmModal() {
    this.confirmDeleteBoard?.nativeElement.classList.add('modal__conatiner--active');
  }

  cancelConfirmation() {
    this.confirmDeleteBoard?.nativeElement.classList.remove('modal__conatiner--active');
  }

}
