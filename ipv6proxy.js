import net from "net"

net.createServer({ ipv6only: true })
	.on("error", e => console.error(e))
	.on("connection", socket => socket.pipe(net.connect(80, "127.0.0.1")).pipe(socket))
	.listen(80, "::")
