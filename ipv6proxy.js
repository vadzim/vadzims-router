import net from "net"

net.createServer()
	.on("error", e => console.error(e))
	.on("listening", () => console.log("Proxy server is listening"))
	.on("connection", socket => socket.pipe(net.connect(80, "127.0.0.1")).pipe(socket))
	.listen({ ipv6Only: true, port: 80, host: "::" })
