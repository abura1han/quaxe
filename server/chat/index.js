const Message = require("../models/Message");

function chatEngine(io) {
  io.on("connection", async (socket) => {
    console.log("----Socket connected-----");

    // Join room
    socket.on("join_room", async ({ userId }) => {
      socket.join(userId);
      console.log(`----User joind, room: ${userId}-----`);
    });

    // Recive message
    socket.on("send_message", async ({ sentBy, sentTo, message }) => {
      try {
        const createMessage = await Message.create({
          sentBy,
          sentTo,
          message,
        });

        await createMessage.save();

        io.to(sentBy)
          .to(sentTo)
          .emit("recive_message", { sentBy, sentTo, message });
        console.log({ sentBy, sentTo, message });
      } catch (error) {
        console.error(error);
      }
    });

    // Disconnect
    socket.on("disconnect", (socket) => {
      console.log(`----Socket disconnected------`);
    });
  });
}

module.exports = chatEngine;
