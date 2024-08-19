import { t } from "elysia"

export const paramsWithIdDto = t.Object({ id: t.String() })

export const pageQueryDto = t.Object({
    skip: t.Optional(t.Numeric({minimum: 0})),
    limit: t.Optional(t.Numeric({minimum: 1, maximum: 20}))
})

export const paginationDto = t.Object({
    skipped: t.Integer({minimum: 0}),
    count: t.Integer({minimum: 0}),
    total: t.Integer({minimum: 0}),
    hasNext: t.Boolean()
})

export const notFoundDto = t.Object({
    message: t.Literal("Not found")
})

export const validationErrorDto = t.Object({
    type: t.String(),
    on: t.String(),
    summary: t.String(),
    property: t.String(),
    message: t.String(),
    expected: t.Object({
        type: t.String(),
        message: t.String(),
        error: t.Object({
            schema: t.Object({
                format: t.String(),
                type: t.String()
            })
        })
    }),
    found: t.Any(),
    errors: t.Array(t.Object({
        type: t.Integer(),
        schema: t.Object({
            format: t.String(),
            type: t.String()
        }),
        path: t.String(),
        value: t.Any(),
        message: t.String(),
        summary: t.String()
    }))
})

export const addressDto = t.Object({
    country: t.String(),
    postalCode: t.String(),
    street: t.String(),
    number: t.Optional(t.Number()),
    city: t.String(),
    state: t.String()
})