import { Pipe, PipeTransform } from '@angular/core';
import { ColumnsItem } from '../model/model';

@Pipe({
  name: 'sortByOrderColumn'
})
export class SortByOrderColumnPipe implements PipeTransform {

  transform(allColumns: ColumnsItem[]) {
    if (!allColumns) {
      return allColumns;
    }
    return allColumns.sort((a, b) => a.order - b.order);
  }

}
