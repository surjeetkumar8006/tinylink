import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createLink } from '../features/links/linksSlice'
import { LinkIcon, TagIcon } from '@heroicons/react/24/outline'

export default function AddLinkForm() {
  const dispatch = useDispatch()
  const createStatus = useSelector(s => s.links.createStatus)
  const createError = useSelector(s => s.links.createError)

  const [target, setTarget] = useState('')
  const [code, setCode] = useState('')

  useEffect(() => {
    if (createStatus === 'succeeded') {
      setTarget('')
      setCode('')
    }
  }, [createStatus])

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(createLink({ target: target.trim(), code: code.trim() || undefined }))
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full bg-white border rounded-xl p-6 shadow-sm space-y-5"
    >
      <h2 className="text-lg font-semibold text-gray-800">Create a Short Link</h2>

      {/* URL Input */}
      <div className="relative">
        <LinkIcon className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
        <input
          className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
          placeholder="https://example.com/your-long-url"
          value={target}
          onChange={e => setTarget(e.target.value)}
          required
        />
      </div>

      {/* Custom Code input */}
      <div className="relative">
        <TagIcon className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
        <input
          className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
          placeholder="Custom code (optional, 6–8 chars)"
          value={code}
          onChange={e => setCode(e.target.value)}
        />
      </div>

      {/* Submit button */}
      <button
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg shadow transition disabled:opacity-60"
        disabled={createStatus === 'loading'}
      >
        {createStatus === 'loading' ? 'Creating...' : 'Create Short Link'}
      </button>

      {/* Error message */}
      {createError && (
        <div className="text-sm text-red-600 bg-red-50 p-2 rounded border border-red-200">
          {createError}
        </div>
      )}
    </form>
  )
}
