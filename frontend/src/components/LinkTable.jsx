import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteLink } from '../features/links/linksSlice'

function formatDate(s) {
  if (!s) return '-'
  return new Date(s).toLocaleString()
}

export default function LinkTable({ rows }) {
  const dispatch = useDispatch()

  if (!rows || rows.length === 0) {
    return <div className="bg-white p-4 rounded shadow-sm text-gray-500">No links yet.</div>
  }

  return (
    <div className="bg-white rounded shadow-sm overflow-x-auto">
      <table className="w-full">
        <thead className="text-sm text-gray-500 border-b">
          <tr>
            <th className="p-3 text-left">Code</th>
            <th className="p-3 text-left">Target</th>
            <th className="p-3">Clicks</th>
            <th className="p-3">Last clicked</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.code} className="border-b hover:bg-gray-50">
              <td className="p-3 font-mono">
                <a className="text-primary" href={`${import.meta.env.VITE_BASE_URL}/${r.code}`} target="_blank" rel="noreferrer">
                  {r.code}
                </a>
              </td>
              <td className="p-3 truncate max-w-xl">
                <a href={r.target} target="_blank" rel="noreferrer" className="text-indigo-600">
                  {r.target}
                </a>
              </td>
              <td className="p-3 text-center">{r.clicks ?? 0}</td>
              <td className="p-3 text-center">{formatDate(r.last_clicked)}</td>
              <td className="p-3 flex gap-2 justify-center">
                <button
                  onClick={() => navigator.clipboard.writeText(`${import.meta.env.VITE_BASE_URL}/${r.code}`)}
                  className="px-2 py-1 bg-gray-100 rounded text-sm"
                >Copy</button>
                <Link to={`/code/${r.code}`} className="px-2 py-1 bg-gray-100 rounded text-sm">Stats</Link>
                <button onClick={() => {
                  if (!confirm(`Delete ${r.code}?`)) return;
                  dispatch(deleteLink(r.code));
                }} className="px-2 py-1 text-red-600 rounded bg-red-50 text-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
