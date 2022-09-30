import { Pipe, PipeTransform } from '@angular/core';
import { TasksItem } from '../model/model';

@Pipe({
  name: 'sortByOrder'
})
export class SortByOrderPipe implements PipeTransform {

  transform(allTasks: TasksItem[]) {
    if (!allTasks) {
      return allTasks;
    }
    return allTasks.sort((a, b) => a.order - b.order);
  }

}
