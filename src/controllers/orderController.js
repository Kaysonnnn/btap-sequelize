const { OrderFood, User, Food } = require("../models");

exports.createOrder = async (req, res) => {
  try {
    let { user_id, food_id, amount, code, arr_sub_id } = req.body;
    if (!user_id || !food_id || !amount)
      return res
        .status(400)
        .json({ message: "user_id, food_id, amount required" });

    if (Array.isArray(arr_sub_id)) arr_sub_id = JSON.stringify(arr_sub_id);
    const order = await OrderFood.create({
      user_id,
      food_id,
      amount,
      code,
      arr_sub_id,
    });
    res.status(201).json({ message: "Order created", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOrdersByUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const orders = await OrderFood.findAll({
      where: { user_id },
      include: [{ model: Food }],
    });
    const parsed = orders.map((o) => {
      const plain = o.toJSON();
      try {
        plain.arr_sub_id = JSON.parse(plain.arr_sub_id);
      } catch (e) {}
      return plain;
    });
    res.json(parsed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOrdersByFood = async (req, res) => {
  try {
    const { food_id } = req.params;
    const orders = await OrderFood.findAll({
      where: { food_id },
      include: [{ model: User }],
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
