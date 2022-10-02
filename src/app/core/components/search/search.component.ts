import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TasksItem } from 'src/app/app-pages/model/model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  allTasks: TasksItem[] = [];
  searchText = '';

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getBoards();
  }

  private getBoards() {
    this.apiService.getAllBoards().subscribe((boards) => {
      for(let board of boards) {
        this.getColumns(board.id);
      }
    })
  }

  private getColumns(boardId: string) {
    this.apiService.getAllColumns(boardId).subscribe((columns) => {
      for(let column of columns) {
        this.getAllTasks(boardId, column.id);
      }
    })
  }

  private getAllTasks(boardId: string, columnId:string) {
    this.apiService.getAllTasks(boardId, columnId).subscribe((tasks) => {
      this.allTasks = [...this.allTasks, ...tasks];
    });
  }

  selectTaskBySearch(task: TasksItem) {
    this.router.navigate(['boards', task.boardId]);
    this.searchText = '';
    setTimeout(()=> {
      document.querySelector(`[data-task="${task.id}"]`)?.classList.add('board__task--selected');
    }, 2000);
    window.addEventListener('click', () => {
      document.querySelector(`[data-task="${task.id}"]`)?.classList.remove('board__task--selected');
    })
  }

}
