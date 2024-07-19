import Elysia from "elysia";
import moment from "moment";
import { VeterinarianModel } from "../models/veterinarian.model";
import { postVeterinarianSchema, putVeterinarianSchema } from "../dto/veterinarian.dto";
import { getByIdSchema } from "../dto";

export const veterinarianController = new Elysia({prefix: "/veterinarians"})
    .get('/', async () =>
        await VeterinarianModel.find({deletedAt: undefined}).lean()
    )
    .get('/:id', async ({params, error}) =>
        await VeterinarianModel.findOne(
            {_id: params.id, deletedAt: undefined}
        ).lean() ?? error(404, {message: "Not Found"}),
        getByIdSchema
    )
    .post('/', async ({body}) =>
        (await VeterinarianModel.create(body)).toObject(),
        postVeterinarianSchema
    )
    .put('/:id', async ({params, body, error}) =>
        await VeterinarianModel.findOneAndUpdate(
            {_id: params.id, deletedAt: undefined}, body, {new: true}
        ).lean()
            ?? error(404, {message: "Not Found"}),
        putVeterinarianSchema
    )
    .delete('/:id', async ({params, error}) =>
        await VeterinarianModel.findOneAndUpdate(
            {_id: params.id, deletedAt: undefined},
            {deletedAt: moment().format()}
        ).lean() ?? error(404, {message: "Not Found"}),
        getByIdSchema
    )