// https://gist.github.com/AmrSaber/578c4c1b9d9c1f0a6ce5dd23bf9c3b4c


const crypto = require('crypto')

const randomFloat = function() {
  // Generate 7 random bytes
  const bytes = crypto.randomBytes(7);

  // Shift 5 bits from first bytes by 5 to the right
  let randomValue = (bytes[0] % (2 ** 5)) / (2 ** 5);

  // For each of the following 6 bytes, add its value and shift it 8 bits to the right
  bytes.slice(1).forEach(byte => { randomValue = (randomValue + byte) / (2 ** 8); });

  // randomValue now has a floating point number that is 53 bits long
  return randomValue;
}

module.exports = randomFloat;
