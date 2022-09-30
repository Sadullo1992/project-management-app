import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

import { ApiService } from 'src/app/core/services/api.service';
import { ColumnsItem, UpdateColumn } from '../../model/model';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  public boardId: string = '';
  boardName = '';
  columns: ColumnsItem[] = [];

  createColumnForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]]
  });

  showSpinner = false;

  @ViewChild('createColumn') createColumn: ElementRef<HTMLElement> | null = null;

  constructor(public route: ActivatedRoute, private apiService: ApiService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.boardId = params['id'];
    });
    this.getBoard();
    this.getColumns();
  }

  private getColumns() {
    this.showSpinner = true;
    this.apiService.getAllColumns(this.boardId).subscribe((columns) => {
      this.columns = columns;
      this.showSpinner = false;
    })
  }

  getBoard() {
    this.apiService.getBoard(this.boardId).subscribe((board) => {
      this.boardName = board.title;
    })
  }

  onCreateColumn(ngForm: FormGroupDirective) {
    this.apiService.createColumn(this.boardId, this.createColumnForm.value).subscribe(() => {
      this.getColumns();
    });

    this.cancelCreateColumn();
    ngForm.resetForm();
  }

  showCreateColumnModal() {
    this.createColumn?.nativeElement.classList.add('modal__conatiner--active');
  }

  cancelCreateColumn() {
    this.createColumn?.nativeElement.classList.remove('modal__conatiner--active');
    this.createColumnForm.reset();
  }

  onDeleteColumn(columnId: string) {
    this.apiService.deleteColumn(this.boardId, columnId).subscribe(() => {
      this.getColumns();
    })
  }

  onEditColumn(item: ColumnsItem) {
    this.apiService.editColumn(this.boardId, item.id, {title: item.title, order: item.order}).subscribe(() => {
      this.getColumns();
    })
  }

  drop(event: CdkDragDrop<ColumnsItem[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    this.dragUpdateColumns();
  }

  dragUpdateColumns() {
    this.columns.forEach((column, index) => {
      let obj = {
        title: column.title,
        order: index + 1,
      };
      this.dragUpdateColumnToServer(column.id, obj);
    });
  }

  dragUpdateColumnToServer(columnId: string, columnUpdateInfo: UpdateColumn) {
    this.apiService.editColumn(this.boardId, columnId, columnUpdateInfo).subscribe();
  }

}
