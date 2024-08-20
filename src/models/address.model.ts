import { prop } from "@typegoose/typegoose"

export class Address {
    @prop({required: true})
    country!: string

    @prop({required: true})
    postalCode!: string

    @prop({required: true})
    street!: string

    @prop()
    number!: number | null

    @prop({required: true})
    city!: string

    @prop({required: true})
    state!: string
}