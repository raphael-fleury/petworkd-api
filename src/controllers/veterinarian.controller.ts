import Elysia from "elysia";
import { VeterinarianModel } from "../models/veterinarian.model";
import { postVeterinarianSchema, putVeterinarianSchema } from "../dto/veterinarian.dto";
import { getByIdSchema } from "../dto";

export const veterinarianController = new Elysia({prefix: "/veterinarians"})
    .get('/', async () =>
        await VeterinarianModel.find().lean()
    )
    .get('/:id', async ({params, error}) =>
        await VeterinarianModel.findById(params.id).lean() ?? error(404, {message: "Not Found"}),
        getByIdSchema
    )
    .post('/', async ({body}) =>
        (await VeterinarianModel.create(body)).toObject(),
        postVeterinarianSchema
    )
    .put('/:id', async ({params, body, error}) =>
        await VeterinarianModel.findByIdAndUpdate(params.id, body, {new: true}).lean()
            ?? error(404, {message: "Not Found"}),
        putVeterinarianSchema
    )