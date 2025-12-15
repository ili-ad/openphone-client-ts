import type { paths } from './sdk'
import { API_KEY, BASE } from './request'

function headers() {
  return { Authorization: API_KEY, 'Content-Type': 'application/json' }
}

type SendSmsResponse =
  paths['/v1/messages']['post']['responses']['202']['content']['application/json']

export async function sendSms(to: string, text: string) {
  const res = await fetch(`${BASE}/v1/messages`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ phoneNumber: to, text })
  })
  if (!res.ok) throw new Error(`OpenPhone ${res.status}`)
  return res.json() as Promise<SendSmsResponse>
}
