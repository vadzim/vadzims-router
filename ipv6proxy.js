import fs from "fs"
import tls from "tls"
import net from "net"
import { pipe } from "./pipeworkaround.js"

const key = fs.readFileSync("key.pem")
const cert = fs.readFileSync("cert.pem")
const passphrase = (() => { try { return String(fs.readFileSync("passphrase.txt")) } catch {} })()

tls.createServer({ key, cert, passphrase }, socket => {
	const dest = net.connect(80, "127.0.0.1")
	dest.pipe(socket)
	// socket.pipe(dest) doesn't work somehow......
	pipe(socket, dest)
})
	.on("error", e => console.error(e))
	.on("listening", () => console.log("Proxy server is listening"))
	.listen({ ipv6Only: true, port: 443, host: "::" })
