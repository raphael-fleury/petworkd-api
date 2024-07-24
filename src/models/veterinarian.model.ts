import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose"
import { Address } from "./address.model"

@modelOptions({ schemaOptions: {
    versionKey: false
}})
export class Veterinarian {
    @prop({required: true})
    public name!: string

    @prop({required: true})
    public email!: string

    @prop({required: true})
    public address!: Address

    @prop({required: true})
    public phone!: string

    @prop()
    public deletedAt?: string
}

export type VeterinarianWithId = Veterinarian & {id: string}

export const VeterinarianModel = getModelForClass(Veterinarian)