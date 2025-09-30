const BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

// Get all leads with pagination
export const getLeads = async ({ page = 1, limit = 10 } = {}) => {
  const query = new URLSearchParams({ page, limit }).toString();
  const res = await fetch(`${BASE_URL}/leads?${query}`);
  if (!res.ok) throw new Error(`Failed to fetch leads: ${res.status}`);
  return res.json();
};

// Create a new lead
export const createLead = async (data) => {
  const res = await fetch(`${BASE_URL}/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed to create lead: ${res.status}`);
  return res.json();
};

// Update a lead
export const updateLead = async (id, data) => {
  const res = await fetch(`${BASE_URL}/leads/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Failed to update lead: ${res.status}`);
  return res.json();
};

// Delete lead
export const deleteLead = async (id) => {
  const res = await fetch(`${BASE_URL}/leads/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Failed to delete lead: ${res.status}`);
  return res.json();
};

// Search leads with optional pagination
export const searchLeads = async ({
  query = "",
  page = 1,
  limit = 10,
} = {}) => {
  const params = new URLSearchParams({ query, page, limit }).toString();
  const res = await fetch(`${BASE_URL}/leads/search?${params}`);
  if (!res.ok) throw new Error(`Failed to search leads: ${res.status}`);
  return res.json();
};
