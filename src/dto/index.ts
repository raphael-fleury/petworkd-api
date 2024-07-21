import { t } from "elysia"

export const paramsWithIdDto = t.Object({ id: t.String() })

export const notFoundDto = t.Object({
    message: t.Literal("Not found")
})