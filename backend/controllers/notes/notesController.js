const { Notes, NotesImages, NotesCategory } = require("../../model");

exports.createNotes = async (req, res) => {
  try {
    const { title, subject, categoryId } = req.body;
    console.log("ads", categoryId);
    const description = req.body.description || "";
    // const imagePath = req.files.fileName || null;
    console.log("rr0", req.files);
    const notes = await Notes.create({
      title,
      subject,
      notesCategoryId: categoryId,
      // image: `http://localhost:3000/${imagePath}`,
      description,
      userId: req.userId,
    });
    for (var i = 0; i < req.files.length; i++) {
      console.log(req.files[i].filename);
      var imagePath = req.files[i].filename;
      const Images = NotesImages.create({
        image: `http://localhost:3000/${imagePath}`,
        noteId: notes.id,
      });
      console.log(Images);
    }

    res.status(201).json({
      status: "success",
      message: "Notes Created",
      data: notes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
exports.getNotes = async (req, res) => {
  try {
    const notes = await Notes.findAll(
      {
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: NotesImages,
          },
          {
            model: NotesCategory,
          },
        ],
      }
      // {
      //   attributes: ["id", "title", "subject", "description"],
      // }
    );

    res.status(200).json({
      status: 200,
      message: "Notes Found",
      data: notes,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const notes = await Notes.destroy({
      where: {
        id,
      },
    });
    res.status(200).json({
      status: "success",
      message: "Notes Deleted",
      data: notes,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getSingleNote = async (req, res) => {
  try {
    const { id } = req.params;
    const notes = await Notes.findOne({
      where: {
        userId: req.userId,
        id,
      },
      include: [
        {
          model: NotesImages,
        },
      ],
    });

    res.status(200).json({
      status: 200,
      message: "Notes Found",
      data: notes,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
exports.getNotesByCategoryId = async (req, res) => {
  const notes = await Notes.findAll(
    {
      where: {
        userId: req.userId,
        notesCategoryId: req.params.id,
      },
      include: [
        {
          model: NotesImages,
        },
        {
          model: NotesCategory,
        },
      ],
    }
    // {
    //   attributes: ["id", "title", "subject", "description"],
    // }
  );
  console.log(notes);
  return res.status(200).json({
    status: 200,
    message: "Notes Found",
    data: notes,
  });
};

exports.updateData = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.files);

    let updateFields = {
      title: req.body.title,
      subject: req.body.subject,
      description: req.body.description,
    };

    if (req.files) {
      for (var i = 0; i < req.files.length; i++) {
        console.log(req.files[i].filename);
        var imagePath = req.files[i].filename;
        const Images = NotesImages.create({
          image: `http://localhost:3000/${imagePath}`,
          noteId: id,
        });
      }
    }

    const file = await Notes.update(updateFields, {
      where: {
        id,
      },
    });

    res.status(200).json({
      status: "success",
      message: "Updated",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
