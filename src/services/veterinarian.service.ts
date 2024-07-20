import moment from "moment";
import { Veterinarian, VeterinarianModel } from "../models/veterinarian.model";
import { isObjectIdOrHexString } from "mongoose";

export class VeterinarianService {
    async findAll() {
        return await VeterinarianModel.find({deletedAt: undefined}).lean()
    }

    async findById(id: string) {
        if (!isObjectIdOrHexString(id)) { return null }
        return await VeterinarianModel.findOne({_id: id, deletedAt: undefined}).lean()
    }

    async create(veterinarian: Veterinarian) {
        return (await VeterinarianModel.create(veterinarian)).toObject()
    }

    async update(id: string, veterinarian: Veterinarian) {
        if (!isObjectIdOrHexString(id)) { return null }
        return await VeterinarianModel.findOneAndUpdate(
            {_id: id, deletedAt: undefined}, veterinarian, {new: true}
        ).lean()
    }

    async delete(id: string) {
        if (!isObjectIdOrHexString(id)) { return null }
        return await VeterinarianModel.findOneAndUpdate(
            {_id: id, deletedAt: undefined}, {deletedAt: moment().format()}
        ).lean()
    }
}

export default new VeterinarianService()