import Service from "../models/service"

class ServiceService {
     async createService (data) {
        try {
            const newService = await Service.create(data)
            return newService
        } catch (error) {
            throw error
        }
     } 
    
    async getService (id) {
        try {
            const service = await Service.get(id)
            return service
        } catch (error) {
            throw error
        }
    }

    async allServices(id) {
        try {
            const services = await Service.all(id)
            return services
        } catch (error) {
            throw error
        }
    }

    async updateService(data) {
        try {
            const isExist = await this.getService(data.id)
            if(!isExist) return null
            const updateService = await Service.update(data)
            return updateService
        } catch (error) {
            throw error
        }
    }

    async deleteService(id) {
        try {
            const isExist = await this.getService(id)
            if(!isExist) 
                return null
            const deletedService = await Service.delete(id)
            return deletedService
        } catch (error) {
            throw error
        }
    }

    async servicesInRoom (id) {
        try {
            const services = await Service.services_in_room(id)
            return services
        } catch (error) {
            throw error
        }
    }

    async roomsInService(id) {
        try {
            const service = await Service.rooms_in_service(id)

            return service
        } catch (error) {
            throw error
        }
    }
    
    async addServiceToRoom(data) {
        try {
            const services = await Service.add_service_to_room(data)
            return services
        } catch (error) {
            throw error
        }
    } 

    async removeServiceInRoom(data) {
        try {
            const removeService = await Service.remove_service_in_room(data)
            return removeService
        } catch (error) {
            throw error
        }
    }
}

export default new ServiceService()