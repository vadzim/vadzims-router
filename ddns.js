import os from "os"
import { repeater, runUpdater, logInOut } from "./rt.js"
import { updateDynv6 } from "./dynv6.js"

const localIpAddresses = () =>
	Object.values(os.networkInterfaces())
		.flat()
		.filter(x => !x.internal)
		.filter(x => !x.scopeid)
		.map(x => x.address)

const updateZone6 = (zone, token) =>
	runUpdater(repeater(localIpAddresses), logInOut(() => updateDynv6(zone, token)))

updateZone6("zienki57.dynv6.net", "wSFSAWzTNVe3CmfsbX_yij_GogSWfc")
