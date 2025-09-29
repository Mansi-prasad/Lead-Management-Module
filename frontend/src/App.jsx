import { useEffect, useState } from "react";
import "./App.css";
import LeadForm from "./components/LeadForm";
import LeadList from "./components/LeadList";
import { getLeads, createLead, deleteLead } from "./api/leadAPI.js";
import { Toaster } from "react-hot-toast";

function App() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try {
      const res = await getLeads();
      if (res.success) {
        setLeads(res.data);
      } else {
        console.error("Failed to load leads:", res.message);
      }
    } catch (err) {
      console.error("Error fetching leads:", err);
    }
  };

  // Saving new lead
  const handleSaveLead = async (form) => {
    const res = await createLead(form);
    if (!res.success) throw new Error(res.message || "Failed to save lead");

    // Prepend new lead to the list
    setLeads((prev) => [res.data || res.lead, ...prev]);
    return res;
  };

  // Deleting lead
  const handleDeleteLead = async (id) => {
    const res = await deleteLead(id);
    if (!res.success) throw new Error(res.message || "Failed to delete lead");

    // Remove lead from state
    setLeads((prev) => prev.filter((lead) => lead._id !== id));
    return res;
  };

  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-8 space-y-10 md:space-y-12  bg-gradient-to-r from-purple-200 to-pink-300">
        {/* Heading */}
        <div className="text-center space-y-3 md:space-y-4 max-w-2xl">
          <h1 className="text-3xl md:text-4xl pb-8 font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Lead Management Module
          </h1>
          <p className="text-gray-600 md:text-lg">
            Manage all your leads efficiently in one place. Add, track, and
            update leads seamlessly.
          </p>
        </div>

        {/* Lead form section */}
        <div className="w-full max-w-3xl bg-white shadow-md rounded-2xl p-6 md:p-8 transition-transform duration-300 hover:scale-[1.02]">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Add New Lead
          </h2>
          <p className="text-gray-500 mb-6">
            Fill in the details below to add a new lead. All information is
            securely stored.
          </p>
          <LeadForm onSaved={handleSaveLead} />
        </div>

        {/* Lead list section */}
        <div className="w-full max-w-3xl bg-white shadow-md rounded-2xl p-6 md:p-8 transition-transform duration-300 hover:scale-[1.02]">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Your Leads
          </h2>
          <p className="text-gray-500 mb-6">
            Here's the list of all your leads. Edit or delete leads as
            necessary.
          </p>
          <LeadList leads={leads} onDelete={handleDeleteLead} />
        </div>
      </div>
    </>
  );
}

export default App;
