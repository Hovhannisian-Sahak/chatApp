const messageModel = require("../models/messageModel");

module.exports.addMessage = async (req, res, next) => {
  try {
    console.log(req.body);
    const { from, to, message } = req.body;
    const data = await messageModel.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (data) return res.json({ msg: "Message added successfully" });
    return res.json({ msg: "Failed to add message to database" });
  } catch (error) {
    next(error);
  }
};
module.exports.getAllMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await messageModel
      .find({
        users: {
          $all: [from, to],
        },
      })
      .sort({ updatedAt: 1 });
    console.log("messages----------------", messages);
    const projectMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    console.log("projectMessages----------------", projectMessages);
    res.json(projectMessages);
  } catch (error) {
    next(error);
  }
};