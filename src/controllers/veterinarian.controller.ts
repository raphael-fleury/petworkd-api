import Elysia from "elysia";
import veterinarianService from "../services/veterinarian.service";
import { postVeterinarianSchema, putVeterinarianSchema } from "../dto/veterinarian.dto";
import { getByIdSchema } from "../dto";

export const veterinarianController = new Elysia({prefix: "/veterinarians"})
    .decorate('service', veterinarianService)
    .get('/', async ({service}) => await service.findAll())
    .get('/:id', async ({service, params, error}) =>
        await service.findById(params.id) ?? error(404, {message: "Not Found"}),
        getByIdSchema
    )
    .post('/', async ({service, body, set}) => {
        set.status = 201
        return await service.create(body)
    }, postVeterinarianSchema)
    .put('/:id', async ({service, params, body, error}) =>
        await service.update(params.id, body) ?? error(404, {message: "Not Found"}),
        putVeterinarianSchema
    )
    .delete('/:id', async ({service, params, error}) =>
        await service.delete(params.id) ?? error(404, {message: "Not Found"}),
        getByIdSchema
    )