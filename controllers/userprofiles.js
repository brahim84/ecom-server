const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET current user profile
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // populated by verifyToken
    const profile = await prisma.userprofile.findUnique({
      where: { userId },
      select: {
        firstName: true,
        lastName: true,
        phone: true,
        user: { select: { email: true } }, 
      },
    });

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json({
      firstName: profile.firstName,
      lastName: profile.lastName,
      phone: profile.phone,
      email: profile.user.email,
    });
  } catch (err) {
    console.error("Error fetching profile", err);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};

// Update or create user profile
exports.upsertProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { firstName, lastName, phone } = req.body;

    const updated = await prisma.userprofile.upsert({
      where: { userId },
      update: { firstName, lastName, phone },
      create: { userId, firstName, lastName, phone },
    });

    res.json(updated);
  } catch (err) {
    console.error("Error saving profile", err);
    res.status(500).json({ error: "Failed to save profile" });
  }
};
