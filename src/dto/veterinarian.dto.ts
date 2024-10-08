import { Static, t } from "elysia"
import { addressDto, notFoundDto, paginationDto, validationErrorDto } from "."

export const veterinarianDto = t.Object({
    name: t.String(),
    email: t.String({format: "email"}),
    address: addressDto,
    phone: t.String()
})

export const partialVeterinarianDto = t.Partial(
    t.Composite([
        t.Omit(veterinarianDto, ['address']),
        t.Object({address: t.Partial(addressDto)})
    ])
)

export type PartialVeterinarian = Static<typeof partialVeterinarianDto>

export const veterinarianWithIdDto = t.Composite([
    veterinarianDto,
    t.Object({id: t.String()})
])

export const veterinarianArrayDto = t.Array(veterinarianDto)

export const veterinariansPageDto = t.Object({
    pagination: paginationDto,
    results: t.Array(veterinarianWithIdDto)
})

export const getVeterinariansResponseDto = {
    200: veterinariansPageDto
}

export const getVeterinarianByIdResponseDto = {
    200: veterinarianWithIdDto,
    404: notFoundDto
}

export const postVeterinarianResponseDto = {
    201: veterinarianWithIdDto,
    422: validationErrorDto
}

export const putVeterinarianResponseDto = {
    201: veterinarianWithIdDto,
    404: notFoundDto,
    422: validationErrorDto
}