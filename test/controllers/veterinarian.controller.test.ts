import veterinarianService from '../../src/services/veterinarian.service'
import { describe, expect, it } from 'bun:test'
import { treaty } from '@elysiajs/eden'
import { veterinarianController } from '../../src/controllers/veterinarian.controller'
import { faker } from '@faker-js/faker'

const api: any = treaty(veterinarianController)

function createRandomVeterinarian() {
    return {
        id: faker.database.mongodbObjectId(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        address: faker.location.streetAddress(),
        phone: faker.phone.number()
    }
}

describe('Get all', () => {
    it('returns 200 with non deleted veterinarians', async () => {
        const veterinarians = faker.helpers.multiple(createRandomVeterinarian, {count: 10})
        veterinarianService.findAll = async () => veterinarians

        const { data, status } = await api.veterinarians.get()
        
        expect(data).toStrictEqual(veterinarians)
        expect(status).toBe(200)
    })
})
describe('Get by id', () => {
    it('returns 200 with veterinarian', async () => {
        const vet = createRandomVeterinarian()
        veterinarianService.findById = async (id) => vet

        const { data, status } = await api.veterinarians[vet.id].get()
        expect(data).toStrictEqual(vet)
        expect(status).toBe(200)
    })
    it('returns 404 when veterinarian does not exists', async () => {
        veterinarianService.findById = async (id) => null

        const id = faker.database.mongodbObjectId()
        const { status } = await api.veterinarians[id].get()
        expect(status).toBe(404)
    })
})
describe('Post', () => {
    it('returns 201 with created veterinarian', async () => {
        const veterinarian = createRandomVeterinarian()
        const body = {...veterinarian, id: undefined}
        veterinarianService.create = async (vet) => veterinarian

        const { data, status } = await api.veterinarians.post(body)
        expect(data).toStrictEqual(veterinarian)
        expect(status).toBe(201)
    })
    it('returns 422 when required fields are missing', async () => {
        const veterinarian = createRandomVeterinarian()
        const body = {...veterinarian, id: undefined, name: undefined}

        const { status } = await api.veterinarians.post(body)
        expect(status).toBe(422)
    })
    it('returns 422 when email is invalid', async () => {
        const veterinarian = createRandomVeterinarian()
        const body = {...veterinarian, id: undefined, email: "invalid"}

        const { status } = await api.veterinarians.post(body)
        expect(status).toBe(422)
    })
})
describe('Put', () => {
    it('returns 200 with updated veterinarian', async () => {
        const vet = createRandomVeterinarian()
        const body = {...vet, _id: undefined}
        veterinarianService.update = async (id, veterinarian) => vet

        const { data, status } = await api.veterinarians[vet.id].put(body)
        expect(data).toStrictEqual(vet)
        expect(status).toBe(200)
    })
    it('returns 422 when required fields are missing', async () => {
        const vet = createRandomVeterinarian()
        const body = {...vet, id: undefined, name: undefined}

        const { status } = await api.veterinarians[vet.id].put(body)
        expect(status).toBe(422)
    })
    it('returns 422 when email is invalid', async () => {
        const vet = createRandomVeterinarian()
        const body = {...vet, id: undefined, email: "invalid"}

        const { status } = await api.veterinarians[vet.id].put(body)
        expect(status).toBe(422)
    })
})
describe('Delete', () => {
    it('returns 200 with deleted veterinarian', async () => {
        const vet = createRandomVeterinarian()
        veterinarianService.delete = async (id) => vet

        const { data, status } = await api.veterinarians[vet.id].delete()
        expect(data).toStrictEqual(vet)
        expect(status).toBe(200)
    })
    it('returns 404 when veterinarian does not exists', async () => {
        veterinarianService.delete = async (id) => null
        const id = faker.database.mongodbObjectId()

        const { status } = await api.veterinarians[id].delete()
        expect(status).toBe(404)
    })
})