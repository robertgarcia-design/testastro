import { useState } from 'react'
import type { FormEvent } from 'react'

export default function Form() {
  const [responseMessage, setResponseMessage] = useState('')

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const response = await fetch('/api/strapi', {
      method: 'POST',
      body: formData,
    })
    const data = await response.json()
    if (data.message) {
      setResponseMessage(data.message)
    }
  }
  return (
    <>
      <h1>Registro</h1>
      <form onSubmit={submit}>
        <label htmlFor='email'>
          Email
          <input
            type='email'
            id='email'
            name='email'
            autoComplete='email'
            required
          />
        </label>
        <button type='submit'>Send</button>
        {responseMessage && <p>{responseMessage}</p>}
      </form>
    </>
  )
}
