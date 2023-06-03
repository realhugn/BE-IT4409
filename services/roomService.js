import Room from "../models/room"

class RoomService {
     async createRoom (data) {
        try {
            const newRoom = await Room.create(data)
            return newRoom
        } catch (error) {
            throw error
        }
     } 
    
    async getRoom (id) {
        try {
            const room = await Room.get(id)
            return room
        } catch (error) {
            throw error
        }
    }

    async allRooms(id) {
        try {
            const rooms = await Room.all(id)
            return rooms
        } catch (error) {
            throw error
        }
    }

    async updateRoom(data) {
        try {
            const isExist = await this.getRoom(data.id)
            if(!isExist) return null
            const updateRoom = await Room.update(data)
            return updateRoom
        } catch (error) {
            throw error
        }
    }

    async deleteRoom(id) {
        try {
            const isExist = await this.getRoom(id)
            if(!isExist) 
                return null
            const deletedRoom = await Room.delete(id)
            return deletedRoom
        } catch (error) {
            throw error
        }
    }
}

export default new RoomService()