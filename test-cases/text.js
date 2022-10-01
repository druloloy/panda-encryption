const { Panda } = require('../panda');

const plaintext =
    'Aliquip amet sunt consequat laborum dolore pariatur occaecat est. Elit eiusmod commodo ex aliquip adipisicing ea qui ea ex pariatur velit.Do ea enim voluptate ea quis deserunt est sunt.' +
    'Aliquip amet sunt consequat laborum dolore pariatur occaecat est. Elit eiusmod commodo ex aliquip adipisicing ea qui ea ex pariatur velit.Do ea enim voluptate ea quis deserunt est sunt.' +
    'Aliquip amet sunt consequat laborum dolore pariatur occaecat est. Elit eiusmod commodo ex aliquip adipisicing ea qui ea ex pariatur velit.Do ea enim voluptate ea quis deserunt est sunt.' +
    'Aliquip amet sunt consequat laborum dolore pariatur occaecat est. Elit eiusmod commodo ex aliquip adipisicing ea qui ea ex pariatur velit.Do ea enim voluptate ea quis deserunt est sunt.' +
    'Aliquip amet sunt consequat laborum dolore pariatur occaecat est. Elit eiusmod commodo ex aliquip adipisicing ea qui ea ex pariatur velit.Do ea enim voluptate ea quis deserunt est sunt.';
const key = 'OGEntHOrTYpoTEBumEDONTurVALRYMorTionInAUteRYWaYeAl';
const seed = 'pjTC4@xl@1R@%6HUxDCvenDvf1zZo9MfVi0ZaKK8qI731BtR88';

console.time('= encryption time taken');
const encrypted = Panda.encryptSync(plaintext, { key, seed });
console.log('> ENCRYPTED: ' + Panda.bufferToBase64(encrypted));
console.timeEnd('= encryption time taken');
console.log();
console.time('= decryption time taken');
const decrypted = Panda.decryptSync(encrypted, { key, seed });
console.log('> DECRYPTED: ' + Panda.bufferToUtf8(decrypted));
console.timeEnd('= decryption time taken');
console.log();
