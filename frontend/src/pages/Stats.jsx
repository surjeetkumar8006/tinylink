import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchLink, clearCurrent } from "../features/links/linksSlice"

export default function Stats() {
  const { code } = useParams()
  const dispatch = useDispatch()
  const { current, currentStatus } = useSelector((s) => s.links)

  useEffect(() => {
    dispatch(fetchLink(code))
    return () => dispatch(clearCurrent())
  }, [dispatch, code])

  if (currentStatus === "loading")
    return (
      <div className="w-full p-6 bg-white rounded-2xl shadow animate-pulse">
        Loading...
      </div>
    )

  if (!current)
    return (
      <div className="w-full p-6 bg-white rounded-2xl shadow text-red-600">
        Link not found.
      </div>
    )

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-6 lg:px-14">

      {/* Header */}
      <div className="bg-white border shadow-sm rounded-3xl p-10 mb-10">
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">
          Analytics for <span className="text-indigo-600">{current.code}</span>
        </h1>

        <p className="text-gray-600 text-sm">
          Short URL:{" "}
          <a
            className="text-indigo-600 font-medium underline"
            href={`${import.meta.env.VITE_BASE_URL}/${current.code}`}
            target="_blank"
            rel="noreferrer"
          >
            {`${import.meta.env.VITE_BASE_URL}/${current.code}`}
          </a>
        </p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">

        {/* Clicks */}
        <div className="bg-white p-8 rounded-2xl border shadow-md hover:shadow-lg transition-all">
          <div className="text-sm text-gray-500 mb-1">Total Clicks</div>
          <div className="text-4xl font-bold text-gray-900">
            {current.clicks ?? 0}
          </div>
        </div>

        {/* Last Click */}
        <div className="bg-white p-8 rounded-2xl border shadow-md hover:shadow-lg transition-all">
          <div className="text-sm text-gray-500 mb-1">Last Clicked</div>
          <div className="text-lg font-medium text-gray-800">
            {current.last_clicked
              ? new Date(current.last_clicked).toLocaleString()
              : "No clicks yet"}
          </div>
        </div>

        {/* Created At */}
        <div className="bg-white p-8 rounded-2xl border shadow-md hover:shadow-lg transition-all">
          <div className="text-sm text-gray-500 mb-1">Created On</div>
          <div className="text-lg font-medium text-gray-800">
            {new Date(current.created_at).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Open Target Button */}
      <div className="flex">
        <a
          href={current.target}
          target="_blank"
          rel="noreferrer"
          className="px-6 py-3 text-white bg-indigo-600 rounded-xl shadow hover:bg-indigo-700 transition-all"
        >
          Open Original URL
        </a>
      </div>
    </div>
  )
}
