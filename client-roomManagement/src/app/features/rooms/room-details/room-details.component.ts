import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Room } from '../room';
import { RoomsService } from '../rooms.service';

@Component({
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit {

  room!: Room;

  constructor(private activatedRoute: ActivatedRoute,
    private roomsService: RoomsService,
    private router: Router) { }

  ngOnInit(): void {
    const param = this.activatedRoute.snapshot.paramMap.get('id');
    const id = param? +param : -1;

    this.roomsService.retrieveById(id).subscribe({
      next: room => this.room = room,
      error: err => console.log('Error', err)
    });
  }

  save(): void {
    this.roomsService.update(this.room).subscribe({
      next: room => {
        this.router.navigateByUrl('/rooms')
        console.log('Saved with success', room)
      },
      error: err => console.log('Error', err)
    });
  }
}
