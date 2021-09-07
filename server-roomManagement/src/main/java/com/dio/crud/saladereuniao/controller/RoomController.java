package com.dio.crud.saladereuniao.controller;

import com.dio.crud.saladereuniao.exception.ResourceNotFoundException;
import com.dio.crud.saladereuniao.model.Room;
import com.dio.crud.saladereuniao.repository.RoomRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController @CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1")
public class RoomController {

    @Autowired
    private RoomRepository roomRepository;

    @GetMapping("/rooms")
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @GetMapping("/rooms/{id}")
    public ResponseEntity<Room> getRoomById(@PathVariable(value = "id") long roomId) throws ResourceNotFoundException {
        Room room = verifyIfExists(roomId);
        return ResponseEntity.ok().body(room);
    }

    @PostMapping("/rooms")
    public Room createRoom (@Valid @RequestBody Room room) {
        return roomRepository.save(room);
    }

    @PutMapping("/rooms/{id}")
    public ResponseEntity<Room> updateRoom(@PathVariable (value = "id") long roomId,
                                           @Valid @RequestBody Room roomDetails)
    throws ResourceNotFoundException {
        Room room = verifyIfExists(roomId);
        room.setName(roomDetails.getName());
        room.setDate(roomDetails.getDate());
        room.setStartHour(roomDetails.getStartHour());
        room.setEndHour(roomDetails.getEndHour());
        final Room updatedRoom = roomRepository.save(room);

        return ResponseEntity.ok(updatedRoom);
    }

    @DeleteMapping("/rooms/{id}")
    public Map<String, Boolean> deleteRoom(@PathVariable(value = "id") long roomId)
        throws ResourceNotFoundException {
        Room room = verifyIfExists(roomId);

        roomRepository.delete(room);
        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);

        return response;
    }

    private Room verifyIfExists (long id) throws ResourceNotFoundException {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found for this id::" + id));
        return room;
    }
}
