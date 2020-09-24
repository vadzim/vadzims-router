import fs from "fs"
import tls from "tls"
import net from "net"
import http from "http"
import { pipe } from "./pipeworkaround.js"

const key = fs.readFileSync("server.key")
const cert = fs.readFileSync("server.cert")
const passphrase = (() => { try { return String(fs.readFileSync("passphrase.txt")) } catch {} })()

tls.createServer({ key, cert, passphrase }, socket => {
	const dest = net.connect(80, "127.0.0.1")
	dest.pipe(socket)
	// socket.pipe(dest) doesn't work somehow......
	pipe(socket, dest)
})
	.on("error", e => console.error(e))
	.on("listening", () => console.log("Https proxy server is listening"))
	.listen({ ipv6Only: true, port: 443, host: "::" })

http.createServer((request, response) => {
	const url = new URL(request.url, `https://${request.headers.host}`).href
	console.log(`Redirecting to ${url}`)
	response.setHeader("Location", url)
	response.statusCode = 301
	response.end()
})
	.on("error", e => console.error(e))
	.on("listening", () => console.log("Http server is listening"))
	.listen({ ipv6Only: true, port: 80, host: "::" })
