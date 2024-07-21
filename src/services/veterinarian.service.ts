import moment from "moment";
import { Veterinarian, VeterinarianModel, VeterinarianWithId } from "../models/veterinarian.model";
import { isObjectIdOrHexString, Types } from "mongoose";

function sanitize<T extends {_id: Types.ObjectId}>(obj: T | null) {
    if (obj == null) { return null }
    const {_id, ...props} = obj
    return {...props, id: obj._id.toString()}
}

export class VeterinarianService {
    async findAll() {
        const vets = await VeterinarianModel.find({deletedAt: undefined}).lean()
        return vets.map(sanitize) as VeterinarianWithId[]
    }

    async findById(id: string) {
        if (!isObjectIdOrHexString(id)) { return null }
        const vet = await VeterinarianModel.findOne({_id: id, deletedAt: undefined}).lean()
        return vet as VeterinarianWithId | null
    }

    async create(veterinarian: Veterinarian) {
        const vet = (await VeterinarianModel.create(veterinarian)).toObject()
        return sanitize(vet) as VeterinarianWithId | null
    }

    async update(id: string, veterinarian: Veterinarian) {
        if (!isObjectIdOrHexString(id)) { return null }
        const vet = await VeterinarianModel.findOneAndUpdate(
            {_id: id, deletedAt: undefined}, veterinarian, {new: true}
        ).lean()
        return sanitize(vet) as VeterinarianWithId | null
    }

    async delete(id: string) {
        if (!isObjectIdOrHexString(id)) { return null }
        return await VeterinarianModel.findOneAndUpdate(
            {_id: id, deletedAt: undefined}, {deletedAt: moment().format()}
        ).lean() as VeterinarianWithId | null
    }
}

export default new VeterinarianService()