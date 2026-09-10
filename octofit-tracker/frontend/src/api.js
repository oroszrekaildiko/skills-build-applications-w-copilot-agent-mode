import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export async function fetchCollection(component, signal) {
  const response = await fetch(`${apiBaseUrl}/${component}/`, { signal })

  if (!response.ok) {
    throw new Error(`Unable to load ${component} (${response.status})`)
  }

  const payload = await response.json()

  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.items)) return payload.items

  return []
}

export function useCollection(component) {
  const [state, setState] = useState({ data: [], loading: true, error: '' })

  useEffect(() => {
    const controller = new AbortController()

    fetchCollection(component, controller.signal)
      .then((data) => setState({ data, loading: false, error: '' }))
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setState({ data: [], loading: false, error: error.message })
        }
      })

    return () => controller.abort()
  }, [component])

  return state
}
