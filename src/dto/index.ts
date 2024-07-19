import { t } from "elysia"

export const paramsWithIdDto = t.Object({ id: t.String() })

export const getByIdSchema = {
    params: paramsWithIdDto
}