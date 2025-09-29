const BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

export const getLeads = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE_URL}/leads?${query}`);
  return res.json();
};

export const createLead = async (data) => {
  const res = await fetch(`${BASE_URL}/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateLead = async (id, data) => {
  const res = await fetch(`${BASE_URL}/leads/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteLead = async (id) => {
  const res = await fetch(`${BASE_URL}/leads/${id}`, { method: "DELETE" });
  return res.json();
};
