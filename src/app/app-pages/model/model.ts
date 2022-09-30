export interface BoardsItem {
  id: string;
  title: string;
  description: string;
}

export interface CreateBoard {
  title: string;
  description: string;
}

export interface Board {
  id: string;
  title: string;
  description: string;
  columns: ColumnsItem[];
}

export interface ColumnsItem {
  id: string;
  title: string;
  order: number;
}

export interface CreateColumn {
  title: string;
}

export interface UpdateColumn {
  title: string;
  order: number;
}

export interface TasksItem {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  files: File[]
}

export interface UpdateTask {
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

export interface File {
  filename: string;
  fileSize: number;
}

export interface CreateTask {
  title: string;
  description: string;
  userId: string;
}

export interface CreateTaskResponse {
  id: string;
  title: string;
  description: string;
  userId: string;
}
