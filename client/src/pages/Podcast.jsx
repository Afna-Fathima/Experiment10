import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'

export default function Podcast(){
  const { id } = useParams()
  const [pod, setPod] = useState(null)

  useEffect(()=>{
    fetch('/api/podcasts/'+id).then(r=>r.json()).then(setPod)
  },[id])

  if(!pod) return <div>Loading...</div>

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex flex-col md:flex-row gap-6">
        <img src={pod.coverUrl} alt="" className="w-full md:w-64 h-64 object-cover rounded" />
        <div>
          <h1 className="text-2xl font-bold">{pod.title}</h1>
          <p className="text-sm text-gray-600 mt-2">{pod.description}</p>
          <div className="mt-4">
            <h2 className="font-semibold">Episodes</h2>
            <ul className="mt-2 space-y-2">
              {pod.episodes.map(ep=>(
                <li key={ep.id} className="p-2 border rounded flex justify-between items-center">
                  <div>
                    <div className="font-medium">{ep.title}</div>
                    <div className="text-xs text-gray-500">{ep.duration} • {ep.publishedAt}</div>
                  </div>
                  <audio controls src={ep.audioUrl} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
