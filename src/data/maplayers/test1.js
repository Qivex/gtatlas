import { marker, line, circle, group } from "../../maptools.js"

export default function(size) {
	let p1 = [5000, 5000]
	let p2 = [5200, 5600]
	let m1 = marker(p1, "warehouse-crates", size)
	let m2 = marker(p2, "supplies-crate", size)
	return group([m1, m2, line([p1, p2]), circle(p1, 128, "#F0C850", 0.5)])
}