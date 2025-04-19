// app/dashboard/blog/[id]/page.js
import { notFound } from 'next/navigation'
 
async function fetchUser(id: any) {
  const res = await fetch('https://...')
  if (!res.ok) return undefined
  return res.json()
}
 
export default async function Page({ params }: any) {
  const user = await fetchUser(params.id)
 
  if (!user) {
    notFound()
  }
 
  return <></>
}
