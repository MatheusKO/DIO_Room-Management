import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from './room';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  roomsUrl = 'http://localhost:8082/api/v1/rooms/';

  constructor(private httpClient: HttpClient) { }

  retrieveById(id: number): Observable<Room> {
    return this.httpClient.get<Room>(`${this.roomsUrl}/${id}`);
  }

  create(room: Room): Observable<Room> {
    return this.httpClient.post<Room>(this.roomsUrl, room);
  }

  update(room: Room): Observable<Room> {
    return this.httpClient.put<Room>(this.roomsUrl + room.id, room);
  }

  retrieveAll(): Observable<Room[]> {
    return this.httpClient.get<Room[]>(this.roomsUrl);
  }

  get(id: number): Observable<Room> {
    return this.httpClient.get<Room>(this.roomsUrl + id);
  }

  deleteById(id: number): Observable<void> {
    return this.httpClient.delete<void>(this.roomsUrl + id);
  }
}
