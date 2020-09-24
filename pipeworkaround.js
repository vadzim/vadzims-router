export const pipe = (source, dest) => {
	const onDestDrain = () => source.resume()
	const onSourceData = data => {
		if (!dest.write(data)) {
			source.pause()
			dest.once("drain", onDestDrain)
		}
	}
	const onSourceError = error => {
		off()
		dest.emit("error", error).end()
	}
	const onDestError = error => {
		off()
		source.emit("error", error)
	}
	const onSourceEnd = () => {
		off()
		dest.end()
	}
	const off = () => {
		source.off("data", onSourceData)
		source.off("end", onSourceEnd)
		source.off("error", onSourceError)
		dest.off("drain", onDestDrain)
		dest.off("error", onDestError)
	}
	source.on("data", onSourceData)
	source.on("end", onSourceEnd)
	source.on("error", onSourceError)
	dest.on("error", onDestError)
}
