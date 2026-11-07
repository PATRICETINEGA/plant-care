import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import AddPlant from '@/components/AddPlant'
export default async function Dash() {
  const s = await getSession()
  if (!s) redirect('/login')
  const uid = (s.user as any).id
  const plants = await prisma.plant.findMany({ where: { ownerId: uid }, orderBy: { name: 'asc' } })
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Plants</h1>
        <Link href="/api/auth/signout" className="text-sm text-red-600">Sign out</Link>
      </div>
      <AddPlant />
      <div className="space-y-2">
        {plants.map((p: any) => (
          <div key={p.id} className="bg-white p-3 rounded shadow text-sm">
            <p className="font-medium">{p.name}</p>
            {p.species && <p className="text-gray-500 text-xs">{p.species}</p>}
            {p.lastWatered && <p className="text-xs text-gray-400 mt-1">Last watered: {p.lastWatered}</p>}
            {p.notes && <p className="text-xs text-gray-400 mt-1">{p.notes}</p>}
          </div>
        ))}
        {plants.length === 0 && <p className="text-gray-500">No plants yet</p>}
      </div>
    </div>
  )
}
