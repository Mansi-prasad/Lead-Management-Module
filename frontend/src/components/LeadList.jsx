import React from "react";
import LeadCard from "./LeadCard";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
export default function LeadList({
  leads = [],
  onDelete,
  onEdit,
  page,
  totalPages,
  onPageChange,
  searchQuery,
  onSearch,
  setSearchQuery,
  loading,
}) {
  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="loader border-4 border-purple-200 border-t-purple-500 rounded-full w-12 h-12 mx-auto animate-spin"></div>
        <p className="text-gray-600 mt-2">Loading leads...</p>
      </div>
    );
  }

  if (!leads.length) {
    return <div className="text-gray-600">No leads found</div>;
  }

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-4 space-y-2 md:space-y-0">
        {/* Search input */}
        <div className="flex w-full md:w-auto space-x-2">
          <input
            type="text"
            placeholder="Search leads by name, email or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSearch();
            }}
            className="px-4 py-2 border border-gray-300 rounded-md w-full md:w-86 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            type="button"
            onClick={onSearch}
            className="ml-2 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition"
          >
            Search
          </button>
        </div>
        {/* Pagination */}
        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className="px-3 py-1 rounded-md border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50"
          >
            <MdOutlineKeyboardDoubleArrowLeft />
          </button>
          <span className="px-3 py-1 rounded-md border border-gray-300 bg-gray-50">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            className="px-3 py-1 rounded-md border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50"
          >
            <MdOutlineKeyboardDoubleArrowRight />
          </button>
        </div>
      </div>

      {/* Table for desktop */}
      <div className="hidden md:block overflow-x-auto">
        {leads.length === 0 ? (
          <div className="text-gray-600">
            No {searchQuery ? `results for "${searchQuery}"` : "leads"} found
          </div>
        ) : (
          <table className="w-full border border-gray-200 shadow-sm rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Company</th>
                <th className="px-4 py-3 text-left">Source</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leads.map((lead) => (
                <tr
                  key={lead._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {lead.name}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{lead.email}</td>
                  <td className="px-4 py-3 text-gray-600">{lead.phone}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {lead.company || "-"}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-700">
                      {lead.source}
                    </span>
                  </td>
                  <td className="p-3">
                    <span
                      className={`p-1 text-xs rounded-full ${
                        lead.status === "Converted"
                          ? "bg-green-100 text-green-700"
                          : lead.status === "In Progress"
                          ? "bg-yellow-100 text-yellow-700"
                          : lead.status === "Lost"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="flex gap-1.5 px-4 py-3 text-center">
                    <button
                      onClick={() => onDelete(lead._id)}
                      className="p-1.5 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 hover:cursor-pointer transition"
                    >
                      <RiDeleteBin6Fill />
                    </button>
                    <button
                      onClick={() => onEdit(lead)}
                      className="p-1.5 text-sm bg-green-500 text-white rounded-md hover:bg-green-600 hover:cursor-pointer transition"
                    >
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Card layout for mobile */}
      <div className="block md:hidden space-y-3">
        {leads.length === 0 ? (
          <div className="text-gray-600">
            No {searchQuery ? `results for "${searchQuery}"` : "leads"} found
          </div>
        ) : (
          leads.map((lead) => (
            <LeadCard
              key={lead._id}
              lead={lead}
              onDelete={() => onDelete(lead._id)}
              onEdit={() => onEdit(lead)}
            />
          ))
        )}
      </div>
    </div>
  );
}
