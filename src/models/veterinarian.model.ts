import { getModelForClass, prop } from "@typegoose/typegoose"

export default class Veterinarian {
    @prop({required: true})
    public name!: string

    @prop({required: true})
    public email!: string

    @prop({required: true})
    public address!: string

    @prop({required: true})
    public phone!: string
}

export const VeterinarianModel = getModelForClass(Veterinarian)