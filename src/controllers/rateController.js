const { RateRestaurant, User, Restaurant } = require("../models");

exports.addOrUpdateRating = async (req, res) => {
  try {
    const { user_id, res_id, amount } = req.body;
    if (!user_id || !res_id || typeof amount === "undefined")
      return res.status(400).json({ message: "Thiếu thông tin" });

    const exists = await RateRestaurant.findOne({ where: { user_id, res_id } });
    if (exists) {
      exists.amount = amount;
      exists.date_rate = new Date();
      await exists.save();
      return res.json({ message: "Cập nhật đánh giá", rating: exists });
    }

    const newRate = await RateRestaurant.create({
      user_id,
      res_id,
      amount,
      date_rate: new Date(),
    });
    res.status(201).json({ message: "Thêm đánh giá", rating: newRate });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRatingsByUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const rates = await RateRestaurant.findAll({
      where: { user_id },
      include: [{ model: Restaurant }],
    });
    res.json(rates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRatingsByRes = async (req, res) => {
  try {
    const { res_id } = req.params;
    const rates = await RateRestaurant.findAll({
      where: { res_id },
      include: [{ model: User, attributes: ["user_id", "full_name"] }],
    });
    res.json(rates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
