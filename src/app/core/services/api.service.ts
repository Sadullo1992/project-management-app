import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Board, BoardsItem, ColumnsItem, CreateBoard, CreateColumn, CreateTask, CreateTaskResponse, TasksItem, UpdateColumn, UpdateTask } from 'src/app/app-pages/model/model';
import { LoginUserData, SignUpUserData, Token, User } from 'src/app/auth/model/model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  singUp(user: SignUpUserData): Observable<User> {
    return this.httpClient.post<User>('/signup', user);
  }

  login(user: LoginUserData): Observable<Token> {
    return this.httpClient.post<Token>('/signin', user);
  }

  getUser(id: string): Observable<User> {
    return this.httpClient.get<User>(`/users/${id}`);
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>('/users');
  }

  deleteUser(id: string) {
    return this.httpClient.delete(`/users/${id}`);
  }

  updateUser(user: SignUpUserData, id: string): Observable<User> {
    return this.httpClient.put<User>(`/users/${id}`, user);
  }

  getAllBoards(): Observable<BoardsItem[]> {
    return this.httpClient.get<BoardsItem[]>('/boards');
  }

  createBoard(boardInfo: CreateBoard): Observable<BoardsItem> {
    return this.httpClient.post<BoardsItem>('/boards', boardInfo);
  }

  deleteBoard(id: string) {
    return this.httpClient.delete(`/boards/${id}`);
  }

  editBoard(id: string, boardInfo: CreateBoard): Observable<BoardsItem> {
    return this.httpClient.put<BoardsItem>(`/boards/${id}`, boardInfo);
  }

  getBoard(id: string): Observable<Board> {
    return this.httpClient.get<Board>(`/boards/${id}`);
  }

  getAllColumns(id: string): Observable<ColumnsItem[]> {
    return this.httpClient.get<ColumnsItem[]>(`/boards/${id}/columns`);
  }

  createColumn(id: string, columnInfo: CreateColumn): Observable<ColumnsItem> {
    return this.httpClient.post<ColumnsItem>(`/boards/${id}/columns`, columnInfo);
  }

  deleteColumn(boardId: string, columnId:string) {
    return this.httpClient.delete(`/boards/${boardId}/columns/${columnId}`);
  }

  editColumn(boardId: string, columnId:string, updateColumnInfo: UpdateColumn): Observable<ColumnsItem> {
    return this.httpClient.put<ColumnsItem>(`/boards/${boardId}/columns/${columnId}`, updateColumnInfo);
  }

  getAllTasks(boardId: string, columnId:string): Observable<TasksItem[]> {
    return this.httpClient.get<TasksItem[]>(`/boards/${boardId}/columns/${columnId}/tasks`);
  }

  createTask(boardId: string, columnId:string, taskInfo: CreateTask): Observable<CreateTaskResponse> {
    return this.httpClient.post<CreateTaskResponse>(`/boards/${boardId}/columns/${columnId}/tasks`, taskInfo);
  }

  deleteTask(boardId: string, columnId:string, taskId: string) {
    return this.httpClient.delete(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`);
  }

  getTask(boardId: string, columnId:string, taskId: string): Observable<TasksItem> {
    return this.httpClient.get<TasksItem>(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`);
  }

  editTask(boardId: string, columnId:string, taskId:string, updateTaskInfo: UpdateTask): Observable<TasksItem> {
    return this.httpClient.put<TasksItem>(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`, updateTaskInfo);
  }

}
