import type { APIRoute } from 'astro'

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData()

  console.log(data)

  return new Response(
    JSON.stringify({
      message: 'Success!',
    }),
    { status: 200 }
  )
}
