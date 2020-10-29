import queryString from 'query-string'
import mapValues from 'lodash/mapValues'

/**
 * Helper for creating parametrized type-safe (key-wise) template strings, useful for eg. API urls
 * @example
 * const fetchUser = withParams`/api/user/${'userId'}`
 * fetchUser({ userId: 123 } => "/api/user/123"
 * fetchUser({ otherKey: "asd" } => TS Error: userId key is missing
 * @param strings
 * @param keys
 */
export function withParams<T extends string | number>(strings: TemplateStringsArray, ...keys: T[]) {
  return function (values: { [P in T]: string | number }): string {
    const result: Array<string> = [strings[0]]
    keys.forEach(function (key, i) {
      result.push(String(values[key]), strings[i + 1])
    })
    return result.join('')
  }
}

const insertEncodedPart = function <T, Q, P>(value: any, key: string | number) {
  return String(key).startsWith('...')
    ? String(value)
        .split('/')
        .map((value) => encodeURIComponent(value))
        .join('/')
    : encodeURIComponent(String(value))
}
/**
 * Extends withParams with ability to create type-safe query strings, useful for eg. API urls containing both parameters and query string
 * @example see withParams.spec.ts
 * const fetchUserWithFilters = withParamsAndQuery<{ sort: 'asc' | 'desc' }>`/api/user/${'userId'}`
 * @TODO needs refactoring
 */
export const withParamsAndQuery = <Q extends { [name: string]: any }>(
  serializers: Partial<
    {
      [P in keyof Q]:
        | string
        | number
        | ((value: Q[P]) => string | number | undefined | { [name: string]: string | number })
    }
  > = {},
  additionalValues?: { [name: string]: string | number },
) => <T extends string | number>(strings: TemplateStringsArray, ...keys: T[]) => {
  return function (
    values: { [P in T]: string | number | undefined } & { [P in keyof Q]: Q[P] },
  ): string {
    const result: Array<string> = [strings[0]]
    keys.forEach(function (key, i) {
      const value = values[key]
      result.push(insertEncodedPart(value, key), strings[i + 1])
      delete values[key]
    })
    const querystring = queryString.stringify(
      Object.keys(serializers).reduce((o, key) => {
        const resultValue: unknown =
          typeof serializers[key] === 'function'
            ? (serializers[key] as any)(values[key])
            : values[key] ?? serializers[key]
        if (resultValue) {
          delete o[key]
          if (typeof resultValue === 'object') {
            for (const outkey in resultValue) {
              const v = (resultValue as any)[outkey]
              const stringValue = String(v)
              o[outkey as keyof Q] = insertEncodedPart(stringValue, outkey)
            }
          } else {
            const stringValue = String(resultValue)
            const hasName = stringValue.match(/(.*?)=(.*)/)
            if (hasName) {
              const [, name, value] = hasName
              o[(name as any) as keyof Q] = value
            } else {
              o[key as keyof Q] = stringValue
            }
          }
        }
        return o
      }, mapValues({ ...values, ...additionalValues }, insertEncodedPart) as { [P in keyof Q]: any }),
      {
        encode: false,
      },
    )
    return result.join('') + (querystring ? `?${querystring}` : '')
  }
}
