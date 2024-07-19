import { t } from "elysia"
import { paramsWithIdDto } from "."

export const veterinarianDto = t.Object({
    name: t.String(),
    email: t.String({format: "email"}),
    address: t.String(),
    phone: t.String()
})

export const postVeterinarianSchema = {
    body: veterinarianDto
}

export const putVeterinarianSchema = {
    body: veterinarianDto, params: paramsWithIdDto
}