const { Categories, NotesCategory, Notes } = require("../../model");

exports.createCategory = async (req, res) => {
  try {
    console.log(req.userId);
    const { name } = req.body;
    if (req.body.cat === "Notes") {
      const notesCategory = await NotesCategory.create({
        name: req.body.name,
        userId: req.userId,
      });
      console.log(notesCategory);
      res.status(201).json({
        status: 200,
        message: "Category Created",
        data: notesCategory,
      });
      return;
    }
    // console.log(cat);

    const category = await Categories.create({
      name,
      userId: req.userId,
    });

    res.status(201).json({
      status: "success",
      message: "Category Created",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Categories.findAll({
      attributes: ["id", "name"],
      where: {
        userId: req.userId,
      },
    });
    const notesCategories = await NotesCategory.findAll({
      attributes: ["id", "name"],
      where: {
        userId: req.userId,
      },
    });

    console.log(categories);
    res.status(200).json({
      status: "success",
      message: "Categories Found",
      data: categories,
      notesCategories: notesCategories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Categories.destroy({
      where: {
        id,
      },
    });
    res.status(200).json({
      status: "success",
      message: "Category Deleted",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await Categories.update(
      {
        name,
      },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).json({
      status: "success",
      message: "Category Updated",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getIndividualCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Categories.findOne({
      where: {
        id,
      },
    });
    res.status(200).json({
      status: "success",
      message: "Category Found",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getAllNotesCategories = async (req, res) => {
  const categories = await NotesCategory.findAll({
    attributes: ["id", "name"],
  });
  console.log(categories);
  res.json({
    status: 200,
    message: "Fetched categories",
    categories: categories,
  });
};

exports.getAllTaskCategories = async (req, res) => {
  
};

exports.deleteNotesCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await NotesCategory.destroy({
      where: {
        userId: req.userId,
        id,
      },
    });
    res.status(200).json({
      status: "success",
      message: "Category Deleted",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }

};exports.getNotesByCategoryId = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await NotesCategory.findOne({
      where: { id, userId: req.userId },
    });
    if (!category) {
      return res.status(404).json({ status: "error", message: "Category not found" });
    }
    res.status(200).json({
      status: "success",
      message: "Category Found",
      data: category,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
exports.updateNotesCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    // Find the NotesCategory by id and userId
    const notesCategory = await NotesCategory.findOne({
      where: {
        id,
        userId: req.userId,
      },
    });

    // Check if the NotesCategory exists
    if (!notesCategory) {
      return res.status(404).json({
        status: "error",
        message: "Notes Category not found",
      });
    }

    // Update the NotesCategory
    const updatedCategory = await NotesCategory.update(
      { name },
      {
        where: {
          id,
          userId: req.userId,
        },
      }
    );

    res.status(200).json({
      status: "success",
      message: "Notes Category Updated",
      data: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

