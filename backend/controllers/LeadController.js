import Lead from "../models/LeadModel.js";

//  Create a new lead
export const createLead = async (req, res) => {
  try {
    const { name, email, phone, company, source, message } = req.body;

    if (!name || !email || !phone || !source) {
      return res
        .status(400)
        .json({ message: "Name, email, source and phone are required" });
    }

    // Prevent duplicate email
    const existing = await Lead.findOne({ email });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Lead with this email already exists" });
    }

    const lead = await Lead.create({
      name,
      email,
      phone,
      company,
      source,
      message,
    });
    res.status(201).json({
      success: true,
      data: lead,
      message: "Lead created successfully",
    });
  } catch (error) {
    console.log("Error to create lead: ", error);
    res.status(500).json({ success: false, message: "Server Error!" });
  }
};

// Get all leads with search and pagination
export const getLeads = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    // filter - case-insensitive
    const filter = search
      ? {
          $or: [
            { name: new RegExp(search, "i") },
            { email: new RegExp(search, "i") },
            { phone: new RegExp(search, "i") },
            { company: new RegExp(search, "i") },
          ],
        }
      : {};

    const total = await Lead.countDocuments(filter);
    // Fetching leads with pagination
    const leads = await Lead.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      data: leads,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.log("Error to get leads: ", error);
    res.status(500).json({ success: false, message: "Server Error!" });
  }
};

// Update a lead
export const updateLead = async (req, res) => {
  try {
    const id = req.params.id;
    if (req.body.email) {
      const existing = await Lead.findOne({
        email: req.body.email,
        _id: { $ne: id },
      });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: "Another lead with this email already exists",
        });
      }
    }

    const lead = await Lead.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!lead)
      return res
        .status(404)
        .json({ success: false, message: "Lead not found!" });
    res.json({
      success: true,
      data: lead,
      message: "Lead updated successfully",
    });
  } catch (error) {
    console.log("Error to update lead: ", error);
    res.status(500).json({ success: false, message: "Server Error!" });
  }
};

// Delete a lead
export const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead)
      return res
        .status(404)
        .json({ success: false, message: "Lead not found" });
    res.json({
      success: true,
      data: lead,
      message: "Lead deleted successfully",
    });
  } catch (error) {
    console.log("Error to delete lead: ", error);
    res.status(500).json({ success: false, message: "Server Error!" });
  }
};
