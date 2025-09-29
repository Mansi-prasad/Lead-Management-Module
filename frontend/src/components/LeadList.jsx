import React from "react";
import LeadCard from "./LeadCard";

export default function LeadList({ leads = [], onDelete }) {
  if (!leads.length) {
    return <div className="text-gray-600">No leads found</div>;
  }

  return (
    <div className="space-y-3">
      {leads.map((lead) => (
        <LeadCard
          key={lead._id}
          lead={lead}
          onDelete={() => onDelete(lead._id)}
        />
      ))}
    </div>
  );
}