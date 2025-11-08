import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
  const [q, setQ] = useState('')
  const [items, setItems] = useState([])

  useEffect(()=>{
    fetch('/api/podcasts').then(r=>r.json()).then(setItems)
  },[])

  const filtered = items.filter(p => p.title.toLowerCase().includes(q.toLowerCase()))

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search podcasts..." className="flex-1 p-2 border rounded" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(p=>(
          <div key={p.id} className="bg-white p-4 rounded shadow">
            <img src={p.coverUrl} alt="" className="w-full h-40 object-cover rounded"/>
            <h3 className="mt-2 font-semibold">{p.title}</h3>
            <p className="text-sm text-gray-600">{p.description}</p>
            <div className="mt-3">
              <Link to={'/podcast/'+p.id} className="text-blue-600">View</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
