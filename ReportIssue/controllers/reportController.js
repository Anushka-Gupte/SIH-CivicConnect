exports.createReport = async (req, res) => {
    try {
      const { category, location, description, language } = req.body;
      const imageBuffer = req.file ? req.file.buffer : null;
  
      const report = new Report({
        title: category,
        description,
        location: { lat: 0, lng: 0 }, // Replace with actual GPS logic
        language,
        image: imageBuffer
      });
  
      await report.save();
      res.status(201).json(report);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  