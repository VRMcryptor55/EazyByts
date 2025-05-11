import Contact from "../models/Contact.mjs";

// Add or Update Contact Information
export const updateContact = async (req, res) => {
  const { email, address } = req.body;
  const userId = req.user.id;

  try {
    let contact = await Contact.findOne({ user: userId });

    if (contact) {
      contact.email = email;
      contact.address = address;
      await contact.save();
      return res.json({ message: "Contact information updated", contact });
    } else {
      contact = new Contact({ user: userId, email, address });
      await contact.save();
      return res.status(201).json({ message: "Contact information added", contact });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Get Contact Information by User ID
export const getContactByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const contact = await Contact.findOne({ user: userId });
    if (!contact) {
      return res.status(404).json({ message: "Contact information not found" });
    }
    res.json(contact);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
