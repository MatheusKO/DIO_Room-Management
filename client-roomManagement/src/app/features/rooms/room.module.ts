import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CreateRoomComponent } from "./create-room/create-room.component";
import { ListRoomsComponent } from "./list-rooms/list-rooms.component";
import { RoomDetailsComponent } from "./room-details/room-details.component";

@NgModule({
  declarations: [
    RoomDetailsComponent,
    ListRoomsComponent,
    CreateRoomComponent
  ], imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '', redirectTo: 'rooms', pathMatch: 'full'
      },
      {
        path: 'rooms', component: ListRoomsComponent
      },
      {
        path: 'rooms/create', component: CreateRoomComponent
      },
      {
        path: 'rooms/details/:id', component: RoomDetailsComponent
      }
    ])
  ]
})
export class RoomModule {

}