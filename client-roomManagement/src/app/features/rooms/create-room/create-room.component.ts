import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Room } from '../room';
import { RoomsService } from '../rooms.service';

@Component({
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {

  room: Room = {} as Room;

  name!: string;
  date!: string;
  startHour!: string;
  endHour!: string;

  constructor(private roomsService: RoomsService,
    private router: Router) { }

  ngOnInit(){
    this.resetForm();
  }

  resetForm(): void {
    this.name = '';
    this.date = '';
    this.startHour = '';
    this.endHour = '';
  }

  save(): void {
    console.log(this.name);
    this.room.name = this.name;
    this.room.date = this.date;
    this.room.startHour = this.startHour;
    this.room.endHour = this.endHour
    this.roomsService.create(this.room).subscribe({
      next: room => {
        this.router.navigateByUrl('/rooms')
        console.log('Saved with success', room)
      },
      error: err => console.log('Error', err)
    });
  }

}
