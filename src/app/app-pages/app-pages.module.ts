import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { HomePageComponent } from './components/home-page/home-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AppPagesRoutingModule } from './app-pages-routing.model';
import { BoardsComponent } from './components/boards/boards.component';
import { BoardComponent } from './components/board/board.component';
import { BoardsItemComponent } from './components/boards/boards-item/boards-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClickStopPropagationDirective } from './directives/click-stop-propagation.directive';
import { BoardColumnComponent } from './components/board/board-column/board-column.component';
import { BoardTaskComponent } from './components/board/board-task/board-task.component';
import { SortByOrderPipe } from './pipes/sort-by-order.pipe';
import { SortByOrderColumnPipe } from './pipes/sort-by-order-column.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    HomePageComponent,
    NotFoundComponent,
    BoardsComponent,
    BoardComponent,
    BoardsItemComponent,
    ClickStopPropagationDirective,
    BoardColumnComponent,
    BoardTaskComponent,
    SortByOrderPipe,
    SortByOrderColumnPipe
  ],
  imports: [
    AppPagesRoutingModule,
    CommonModule,
    SharedModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    DragDropModule
  ],
  exports: [
    HomePageComponent,
    BoardsComponent,
    BoardComponent
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
  ]
})
export class AppPagesModule { }
