import React from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
export default function LeadCard({ lead, onEdit, onDelete }) {
  return (
    <div className="border border-gray-100 shadow-sm rounded-2xl p-3 flex flex-col gap-2 transition-transform duration-300 hover:scale-102 bg-pink-50">
      <div className="space-y-1">
        <div className="font-semibold">
          <span className="text-xl text-pink-700">{lead.name} </span>
          <span className="text-gray-500 text-sm">({lead.source})</span>
        </div>
        <div className="text-sm text-gray-600">
          <span className="text-gray-700 font-semibold">Email:</span>
          {lead.email}
        </div>
        <div className="text-sm text-gray-600">
          <span>Phone:</span> {lead.phone}
        </div>
        {lead.company && (
          <div className="text-sm text-gray-600">
            <span>Company:</span> {lead.company}
          </div>
        )}
        {lead.message && (
          <div className="mt-2 text-sm text-gray-700">{lead.message}</div>
        )}
      </div>
      <div className="flex items-start gap-2">
        <button
          onClick={() => onEdit(lead)}
          className="text-indigo-600 underline text-lg p-1 rounded hover:bg-gray-100 hover:cursor-pointer"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => onDelete(lead._id)}
          className="text-red-600 underline text-lg p-1 rounded hover:bg-gray-100 hover:cursor-pointer"
        >
          <RiDeleteBin6Fill />
        </button>
      </div>
    </div>
  );
}
