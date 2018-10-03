class Util {
    static randomBetween(low, high, decMult = 100) {
        let diff = (high + 1) - low;
		tmp.push(low + Math.round(decMult * Math.random()) % diff);
    }
}