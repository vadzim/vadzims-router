import fetch from "isomorphic-fetch"

export const updateDynv6 = async (zone, token) =>
	await (await fetch(`https://ipv6.dynv6.com/api/update?${new URLSearchParams([
		["ipv6", "auto"],
		["zone", zone],
		["token", token],
	])}`)).text()
