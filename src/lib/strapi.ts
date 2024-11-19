interface Props {
  endpoint: string
  method: string
  querys?: Record<string, string>
}

/**
 * Fetches data from the Strapi API
 * @param endpoint - The endpoint to fetch from
 * @param method - The method to fetch to
 * @returns
 */
export default async function fetchApi<T>({ endpoint, method, querys }: Props) {
  if (endpoint.startsWith('/')) {
    endpoint = endpoint.slice(1)
  }

  const url = new URL(`${import.meta.env.STRAPI_URL}/api/${endpoint}`)

  if (querys) {
    Object.entries(querys).forEach(([key, value]) => {
      url.searchParams.append(key, value)
    })
  }

  const headers = new Headers({})
  headers.append('Authorization', 'Bearer ' + `${import.meta.env.STRAPI_TOKEN}`)
  headers.append('Content-Type', 'application/json')
  const options = { method, headers }

  const res = await fetch(url.toString(), options)

  let data = await res.json()

  return data as T
}
