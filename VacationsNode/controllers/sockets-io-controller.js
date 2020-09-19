const io = require('socket.io')(3002);



//Socket.io
module.exports = {
    ioInit: () => {
        io.on("connection", (socket) => {
            console.log("socket-io new client connected")

            //Client disconnected:
            socket.on("disconnect", async () => {
                console.log("socket-io client disconnected")
            });
        });
    },
    io
}