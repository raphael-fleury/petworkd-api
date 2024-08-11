import veterinarianService from '../../src/services/veterinarian.service'
import { beforeAll, describe, expect, it } from 'bun:test'
import { treaty } from '@elysiajs/eden'
import { veterinarianController } from '../../src/controllers/veterinarian.controller'
import { faker } from '@faker-js/faker'

const api: any = treaty(veterinarianController)

function createRandomVeterinarian() {
    return {
        id: faker.database.mongodbObjectId(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        address: {
            country: faker.location.country(),
            postalCode: faker.location.zipCode(),
            street: faker.location.street(),
            number: faker.number.int({min: 1}),
            city: faker.location.city(),
            state: faker.location.state()
        },
        phone: faker.phone.number()
    }
}

describe('Get all', () => {
    let veterinarians: any[] = []
    beforeAll(() => {
        veterinarians = faker.helpers.multiple(createRandomVeterinarian, {count: 10})
        veterinarianService.find = async (skip = 0, limit = 10) => {
            const results = veterinarians.slice(skip, skip + limit)
            const total = veterinarians.length
            const count = results.length
            return {
                pagination: {
                    skipped: skip,
                    total,
                    count: veterinarians.length,
                    hasNext: count + skip < total
                },
                results
            }
        }
    })
    it('returns 200 with veterinarians', async () => {
        const { data, status } = await api.veterinarians.get()
        
        expect(data.results).toStrictEqual(veterinarians)
        expect(status).toBe(200)
    })
    it('returns 200 with non skipped veterinarians', async () => {
        const skip = 5
        const { data, status } = await api.veterinarians.get({
            query: {skip}
        })
        
        expect(data.results).toStrictEqual(veterinarians.slice(skip))
        expect(status).toBe(200)
    })
    it('returns 200 with veterinarians respecting the limit', async () => {
        const limit = 5
        const { data, status } = await api.veterinarians.get({
            query: {limit}
        })
        
        expect(data.results).toStrictEqual(veterinarians.slice(0, limit))
        expect(status).toBe(200)
    })
    it('returns 200 with non skipped veterinarians respecting the limit', async () => {
        const skip = 2
        const limit = 5
        const { data, status } = await api.veterinarians.get({
            query: {skip, limit}
        })
        
        expect(data.results).toStrictEqual(veterinarians.slice(skip, skip + limit))
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
    it('returns 404 when veterinarian does not exists', async () => {
        const vet = createRandomVeterinarian()
        const body = {...vet, _id: undefined}
        veterinarianService.update = async (id, veterinarian) => null
        
        const { status } = await api.veterinarians[vet.id].put(body)
        expect(status).toBe(404)
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
describe('Patch', () => {
    it('returns 200 with updated veterinarian', async () => {
        const vet = createRandomVeterinarian()
        const body = {...vet, _id: undefined, email: undefined}
        veterinarianService.update = async (id, veterinarian) => vet

        const { data, status } = await api.veterinarians[vet.id].patch(body)
        expect(data).toStrictEqual(vet)
        expect(status).toBe(200)
    })
    it('returns 404 when veterinarian does not exists', async () => {
        const vet = createRandomVeterinarian()
        const body = {...vet, _id: undefined}
        veterinarianService.update = async (id, veterinarian) => null
        
        const { status } = await api.veterinarians[vet.id].patch(body)
        expect(status).toBe(404)
    })
    it('returns 422 when email is invalid', async () => {
        const vet = createRandomVeterinarian()
        const body = {...vet, id: undefined, email: "invalid"}

        const { status } = await api.veterinarians[vet.id].patch(body)
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