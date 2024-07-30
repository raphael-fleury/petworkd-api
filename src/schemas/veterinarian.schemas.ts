import { pageQueryDto, paramsWithIdDto } from "../dto"
import { getVeterinarianByIdResponseDto, getVeterinariansResponseDto, partialVeterinarianDto, postVeterinarianResponseDto, putVeterinarianResponseDto, veterinarianDto } from "../dto/veterinarian.dto"

export const getAllVeterinariansSchema = {
    query: pageQueryDto,
    response: getVeterinariansResponseDto
}

export const getVeterinarianByIdSchema = {
    params: paramsWithIdDto,
    response: getVeterinarianByIdResponseDto
}

export const postVeterinarianSchema = {
    body: veterinarianDto,
    response: postVeterinarianResponseDto
}

export const putVeterinarianSchema = {
    params: paramsWithIdDto,
    body: veterinarianDto,
    response: putVeterinarianResponseDto
}

export const patchVeterinarianSchema = {
    params: paramsWithIdDto,
    body: partialVeterinarianDto,
    response: putVeterinarianResponseDto
}

export const deleteVeterinarianByIdSchema = getVeterinarianByIdSchema