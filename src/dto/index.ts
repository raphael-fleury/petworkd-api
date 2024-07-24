import { t } from "elysia"

export const paramsWithIdDto = t.Object({ id: t.String() })

export const notFoundDto = t.Object({
    message: t.Literal("Not found")
})

export const addressDto = t.Object({
    country: t.String(),
    postalCode: t.String(),
    street: t.String(),
    number: t.Optional(t.Number()),
    city: t.String(),
    state: t.String()
})