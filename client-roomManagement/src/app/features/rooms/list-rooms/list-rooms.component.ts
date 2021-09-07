import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/features/rooms/room';
import { RoomsService } from 'src/app/features/rooms/rooms.service';

@Component({
  templateUrl: './list-rooms.component.html',
  styleUrls: ['./list-rooms.component.css']
})
export class ListRoomsComponent implements OnInit {

  listRooms: Room[] = [];

  constructor(private roomsService: RoomsService) { }

  ngOnInit(): void {
    this.retrieveAll();
  }

  retrieveAll(): void {
    this.roomsService.retrieveAll().subscribe({
      next: rooms => {
        this.listRooms = rooms;
      },
      error: err => console.log('Error', err)
    });
  }

  deleteById(roomId: number): void {
    this.roomsService.deleteById(roomId).subscribe({
      next: () => {
        console.log('Deleted with success');
        this.retrieveAll();
      },
      error: err => console.log('Error', err)
    })
  }

}
