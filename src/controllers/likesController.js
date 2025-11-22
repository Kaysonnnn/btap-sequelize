const { LikeRestaurant, User, Restaurant } = require("../models");

exports.like = async (req, res) => {
  try {
    const { user_id, res_id } = req.body;
    if (!user_id || !res_id)
      return res.status(400).json({ message: "user_id và res_id required" });

    const [instance, created] = await LikeRestaurant.findOrCreate({
      where: { user_id, res_id },
      defaults: { date_like: new Date() },
    });

    if (!created)
      return res.json({ message: "Đã like trước đó", like: instance });
    res.status(201).json({ message: "Liked", like: instance });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.unlike = async (req, res) => {
  try {
    const { user_id, res_id } = req.body;
    if (!user_id || !res_id)
      return res.status(400).json({ message: "user_id và res_id required" });

    const deleted = await LikeRestaurant.destroy({
      where: { user_id, res_id },
    });
    if (deleted) return res.json({ message: "Unliked" });
    res.status(404).json({ message: "Không tìm thấy like để xóa" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getLikesByUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const likes = await LikeRestaurant.findAll({
      where: { user_id },
      include: [{ model: Restaurant }],
    });
    res.json(likes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLikesByRes = async (req, res) => {
  try {
    const { res_id } = req.params;
    const likes = await LikeRestaurant.findAll({
      where: { res_id },
      include: [{ model: User, attributes: ["user_id", "full_name", "email"] }],
    });
    res.json(likes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
