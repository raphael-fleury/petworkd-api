import { prop } from "@typegoose/typegoose"

export class Address {
    @prop()
    country!: string

    @prop()
    postalCode!: string

    @prop()
    street!: string

    @prop()
    number?: number

    @prop()
    city!: string

    @prop()
    state!: string
}