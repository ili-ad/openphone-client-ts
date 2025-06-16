import { paths } from './sdk'

const BASE = process.env.OPENPHONE_BASE_URL || 'https://api.openphone.com'
const KEY  = process.env.OPENPHONE_API_KEY as string

function headers() {
  return { 'X-API-KEY': KEY, 'Content-Type': 'application/json' }
}

export async function sendSms(to: string, text: string) {
  const res = await fetch(`${BASE}/messages`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ phoneNumber: to, text })
  })
  if (!res.ok) throw new Error(`OpenPhone ${res.status}`)
  return res.json() as Promise<paths['/messages']['post']['responses']['200']['content']['application/json']>
}