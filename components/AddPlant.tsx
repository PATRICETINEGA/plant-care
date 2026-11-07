'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
export default function AddPlant() {
  const [name, setName] = useState('')
  const [species, setSpecies] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const r = useRouter()
  async function submit(e: any) {
    e.preventDefault()
    setLoading(true)
    await fetch('/api/plants', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, species, notes }) })
    setName(''); setSpecies(''); setNotes(''); setLoading(false); r.refresh()
  }
  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow mb-4 space-y-2">
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Plant name" className="w-full border p-2 rounded text-sm" required />
      <input value={species} onChange={e=>setSpecies(e.target.value)} placeholder="Species" className="w-full border p-2 rounded text-sm" />
      <input value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Notes" className="w-full border p-2 rounded text-sm" />
      <button type="submit" disabled={loading} className="bg-green-600 text-white px-4 py-1 rounded text-sm disabled:opacity-50">Add</button>
    </form>
  )
}
