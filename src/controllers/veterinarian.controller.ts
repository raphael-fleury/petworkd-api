import Elysia from "elysia";
import veterinarianService from "../services/veterinarian.service";
import { deleteVeterinarianByIdSchema, getAllVeterinariansSchema, getVeterinarianByIdSchema, postVeterinarianSchema, putVeterinarianSchema } from "../schemas/veterinarian.schemas";

export const veterinarianController = new Elysia({prefix: "/veterinarians"})
    .decorate('service', veterinarianService)
    .get('/', async ({service}) =>
        await service.findAll(),
        getAllVeterinariansSchema
    )
    .post('/', async ({service, body, set}) => {
        set.status = 201
        return await service.create(body)
    }, postVeterinarianSchema)
    .get('/:id', async ({service, params, error}) =>
        await service.findById(params.id) ?? error(404, {message: "Not found"}),
        getVeterinarianByIdSchema
    )
    .put('/:id', async ({service, params, body, error}) =>
        await service.update(params.id, body) ?? error(404, {message: "Not found"}),
        putVeterinarianSchema
    )
    .delete('/:id', async ({service, params, error}) =>
        await service.delete(params.id) ?? error(404, {message: "Not found"}),
        deleteVeterinarianByIdSchema
    )