let io = { listener: {} };

async function ioInit(listener, ioListener) {
    io.listener = ioListener;

    io.listener.on("connection", (socket) => {
        console.log("socket-io new client connected")

        //Client disconnected:
        socket.on("disconnect", async () => {
            console.log("socket-io client disconnected")
        });
    });
}

//Socket.io
module.exports = {
    ioInit,
    io
}