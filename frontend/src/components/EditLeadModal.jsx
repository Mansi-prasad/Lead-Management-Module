import React from "react";
import LeadForm from "./LeadForm";
import { RxCross2 } from "react-icons/rx";

export default function EditLeadModal({ lead, onClose, onUpdate }) {
  if (!lead) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded p-4 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-medium">Edit Lead</h3>
          <button className="text-gray-600" onClick={onClose}>
            <RxCross2 size={24} className="hover:cursor-pointer" />
          </button>
        </div>
        <LeadForm
          initialData={lead}
          onSaved={async (data) => {
            await onUpdate(lead._id, data);
            onClose();
          }}
        />
      </div>
    </div>
  );
}
