import { useEffect, useState } from "react";
import "./App.css";
import LeadForm from "./components/LeadForm";
import LeadList from "./components/LeadList";
import {
  getLeads,
  createLead,
  deleteLead,
  updateLead,
  searchLeads,
} from "./api/leadAPI.js";
import toast, { Toaster } from "react-hot-toast";
import EditLeadModal from "./components/EditLeadModal.jsx";

function App() {
  const [leads, setLeads] = useState([]);
  const [editingLead, setEditingLead] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async (pageNumber = page) => {
    setLoading(true);
    try {
      const res = await getLeads({ page: pageNumber, limit });
      if (res.success) {
        setLeads(res.data);
        setTotalPages(res.pagination?.pages || 1);
        setPage(res.pagination?.page || 1);
      } else {
        toast.error(res.message || "Failed to load leads");
      }
    } catch (err) {
      console.error("Error fetching leads:", err);
      toast.error("Error fetching leads");
    } finally {
      setLoading(false);
    }
  };

  // Saving new lead
  const handleSaveLead = async (form) => {
    const res = await createLead(form);
    if (!res.success) throw new Error(res.message || "Failed to save lead");

    // Reload first page after adding new lead
    setPage(1);
    loadLeads(1);
    return res;
  };

  // Update Lead
  const handleUpdateLead = async (id, updatedData) => {
    const res = await updateLead(id, updatedData);
    if (!res.success) throw new Error(res.message || "Failed to update lead");

    // Update lead in state
    setLeads((prev) => prev.map((lead) => (lead._id === id ? res.data : lead)));
    return res;
  };

  // Deleting lead
  const handleDeleteLead = async (id) => {
    const res = await deleteLead(id);
    if (!res.success) throw new Error(res.message || "Failed to delete lead");

    loadLeads(page);
    return res;
  };

  // Open edit modal
  const handleEdit = (lead) => {
    setEditingLead(lead);
  };
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      loadLeads(newPage);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const res = await searchLeads({ query: searchQuery, page, limit });
      if (res.success) {
        setLeads(res.data);
        setPage(res.pagination?.page || 1);
        setTotalPages(res.pagination?.pages || 1);
      } else {
        toast.error(res.message || "Failed to search leads!");
      }
    } catch (err) {
      toast.error("Error searching leads!");
    }
  };
  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 flex flex-col items-center px-4 py-10 space-y-10">
        {/* Heading */}
        <div className="text-center space-y-2 max-w-3xl">
          <h1 className="text-4xl md:text-5xl pb-5 mb-0 font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Lead Management Module
          </h1>
          <p className="text-gray-700 md:text-lg max-w-2xl mx-auto leading-relaxed">
            Manage all your leads efficiently in one place. Add, track, and
            update leads seamlessly.
          </p>
          <div className="flex justify-center space-x-4 pt-4">
            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition transform duration-200">
              Get Started
            </button>
            <button className="px-6 py-3 rounded-xl border border-purple-400 text-purple-600 font-semibold hover:bg-purple-50 hover:scale-105 transition transform duration-200">
              Read More
            </button>
          </div>
        </div>

        {/* Lead form section */}
        <div className="w-full max-w-5xl bg-white shadow-md rounded-2xl p-6 md:p-8 transition-transform duration-300 hover:scale-[1.02]">
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
        <div className="w-full max-w-5xl bg-white shadow-md rounded-2xl p-6 md:p-8 transition-transform duration-300 hover:scale-[1.02]">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Your Leads
          </h2>
          <p className="text-gray-500 mb-6">
            Here's the list of all your leads. Edit or delete leads as
            necessary.
          </p>
          <LeadList
            leads={leads}
            onDelete={handleDeleteLead}
            onEdit={handleEdit}
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            searchQuery={searchQuery}
            onSearch={handleSearch}
            setSearchQuery={setSearchQuery}
            loading={loading}
          />
        </div>
      </div>
      {/* Edit modal */}
      {editingLead && (
        <EditLeadModal
          lead={editingLead}
          onClose={() => setEditingLead(null)}
          onUpdate={handleUpdateLead}
        />
      )}
    </>
  );
}

export default App;
