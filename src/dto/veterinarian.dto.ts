import { t } from "elysia"
import { addressDto, notFoundDto } from "."

export const veterinarianDto = t.Object({
    name: t.String(),
    email: t.String({format: "email"}),
    address: addressDto,
    phone: t.String()
})

export const veterinarianArrayDto = t.Array(veterinarianDto)

export const veterinarianWithIdDto = t.Composite([
    veterinarianDto,
    t.Object({id: t.String()})
])

export const getVeterinariansResponseDto = {
    200: veterinarianArrayDto
}

export const getVeterinarianByIdResponseDto = {
    200: veterinarianWithIdDto,
    404: notFoundDto
}

export const postVeterinarianResponseDto = {
    201: veterinarianWithIdDto,
    // 422:
}

export const putVeterinarianResponseDto = {
    201: veterinarianWithIdDto,
    404: notFoundDto,
    // 422:
}