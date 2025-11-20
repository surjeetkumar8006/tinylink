import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Hero from "../components/Hero"
import AddLinkForm from "../components/AddLinkForm"
import LinkTable from "../components/LinkTable"
import { fetchLinks } from "../features/links/linksSlice"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"

export default function Dashboard() {
  const dispatch = useDispatch()
  const { list, status } = useSelector((s) => s.links)
  const [q, setQ] = useState("")

  useEffect(() => {
    dispatch(fetchLinks())
  }, [dispatch])

  const filtered = list.filter(
    (item) =>
      item.code.toLowerCase().includes(q.toLowerCase()) ||
      item.target.toLowerCase().includes(q.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 w-full pb-20">

      {/* HERO */}
      <div className="w-full px-6 py-10">
        <Hero />
      </div>

      {/* PAGE WRAPPER */}
      <div className="w-full px-6 lg:px-14 space-y-14">

        {/* QUICK CREATE SECTION */}
        <div
          className="w-full bg-white rounded-3xl shadow-md border border-gray-200 p-10 
          hover:shadow-lg transition-all duration-300"
        >
          <h2 className="text-3xl font-semibold text-gray-900 mb-2">
            Quick Create
          </h2>

          <p className="text-gray-600 mb-6">
            Create beautiful short links with analytics and tracking built in.
          </p>

          <AddLinkForm />
        </div>

        {/* SEARCH BAR */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:w-1/3">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search links by code or URL"
              className="w-full pl-10 p-3 rounded-2xl border border-gray-300 
              bg-white shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div className="pt-3 lg:pt-0 text-gray-600 text-sm font-medium">
            {status === "loading" ? "Loading..." : `${filtered.length} results`}
          </div>
        </div>

        {/* TABLE CARD */}
        <div
          className="w-full bg-white p-10 rounded-3xl border border-gray-200 
          shadow-md hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Your Links
            </h2>
          </div>

          <LinkTable rows={filtered} />
        </div>
      </div>
    </div>
  )
}
