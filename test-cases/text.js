const { Panda } = require('../panda');

const plaintext = 'Dolore voluptate magna minim veniam cupidatat id laboris.';
const key = 'OGEntHOrTYpoTEBumEDONTurVALRYMorTionInAUteRYWaYeAl';
const seed = 'pjTC4@xl@1R@%6HUxDCvenDvf1zZo9MfVi0ZaKK8qI731BtR88';
const plaintextBuffer = Panda.stringToBuffer(plaintext);

console.time('encrypt');
const encrypted = Panda.encryptSync(plaintextBuffer, { key, seed });
console.log('ENCRYPTED: ' + Panda.bufferToBase64(encrypted));
console.timeEnd('encrypt');

console.time('decrypt');
const decrypted = Panda.decryptSync(encrypted, { key, seed });
console.log('DECRYPTED: ' + Panda.bufferToUtf8(decrypted));
console.timeEnd('decrypt');
