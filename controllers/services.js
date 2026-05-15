import Service from '../models/Service.js'; // your schema

// ================= GET ALL =================
export const getAllCategories = async (req, res) => {
  try {
    
    const services = await Service.find({ status: { $ne: 'deleted' } }); // skip deleted    
    console.log("services",services);

    res.status(200).json(services);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while fetching categories' });
  }
};

// ================= GET SINGLE =================
export const getSingleCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);
    if (!service || service.status === 'deleted') {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(service);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while fetching category' });
  }
};
export const createCategory = async (req, res) => {
  try {
    const { title, slug, texts } = req.body;
    console.log("req.body", req.body);

    // Validation
    if (!title || !slug || !texts) {
      return res.status(400).json({ message: "Title, slug, and texts are required" });
    }

    // Ensure texts structure matches the schema
    const validatedTexts = {
      title: texts.title || "",
      textCard: texts.textCard || "",
      textGallery: Array.isArray(texts.textGallery) ? texts.textGallery : [""],
    };

    const newService = await Service.create({
      title,
      slug,
      texts: validatedTexts,
      status: "pending", // Optional field in your schema
    });

    res.status(201).json({
      msg: "Category created successfully",
      category: newService,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while creating category" });
  }
};
// ================= UPDATE =================
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, texts, status } = req.body;

    const updatedService = await Service.findByIdAndUpdate(
      id,
      { title, texts, status },
      { new: true, runValidators: true }
    );

    if (!updatedService) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(updatedService);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while updating category' });
  }
};

// ================= DELETE =================
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Soft delete: mark as deleted
    const deletedService = await Service.findByIdAndUpdate(
      id,
      { status: 'deleted' },
      { new: true }
    );

    if (!deletedService) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted', category: deletedService });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while deleting category' });
  }
};