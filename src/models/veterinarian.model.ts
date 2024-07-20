import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose"

@modelOptions({ schemaOptions: {
    versionKey: false
}})
export class Veterinarian {
    @prop({required: true})
    public name!: string

    @prop({required: true})
    public email!: string

    @prop({required: true})
    public address!: string

    @prop({required: true})
    public phone!: string

    @prop()
    public deletedAt?: string
}

export const VeterinarianModel = getModelForClass(Veterinarian)