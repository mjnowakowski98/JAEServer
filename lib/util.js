class Util {
     static randomBetween(low, high, decMult = 100) {
        let diff = (high + 1) - low;
		return low + Math.round(decMult * Math.random()) % diff;
    }
}

module.exports = Util;