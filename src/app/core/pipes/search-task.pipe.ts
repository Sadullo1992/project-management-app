import { Pipe, PipeTransform } from '@angular/core';
import { TasksItem } from 'src/app/app-pages/model/model';

@Pipe({
  name: 'searchTask'
})
export class SearchTaskPipe implements PipeTransform {

  transform(value: TasksItem[], searchText: string): TasksItem[] {
    if(value.length === 0) {
      return value;
    }
    return value.filter((item) => {
      if(
        item.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        item.description.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        item.order.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
        ) {
        return true;
      }
      return false;
    });
  }

}
