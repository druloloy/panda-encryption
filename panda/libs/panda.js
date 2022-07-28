const { create } = require('./sequence');
const { shuffle, unshuffle, shuffleSync, unshuffleSync } = require('./shuffler');
const { encrypt, decrypt } = require('./vigenere');;

const defaultOption = {
    key: 'supercalifragilisticexpialidocious',
    seed: 'default' 
}

class Panda{
    static stringToBuffer(str) {
        return Buffer.from(str, 'utf8');
    }
    static hexToBuffer(hex) {
        return Buffer.from(hex, 'hex');
    }
    static base64ToBuffer(base64) {
        return Buffer.from(base64, 'base64');
    }
    static bufferToHex(buffer) {
        return buffer.toString('hex');
    }
    static bufferToBase64(buffer) {
        return buffer.toString('base64');
    }
    static bufferToUtf8(buffer) {
        return buffer.toString('utf8');
    }

    static encrypt(buffer, option = defaultOption) {
        return new Promise(async (resolve, reject) => {
            let { key, seed } = option;

            if(!seed) seed = Panda.bufferToHex(key);
            if(typeof seed !== 'string') seed = Panda.bufferToHex(seed);
            if(typeof key === 'string') key = Panda.stringToBuffer(key);

            const sequence = Panda.#createSequence(seed, buffer.length); // generating sequence
            const encryptedBuffer = encrypt(buffer, key); // applying vigenere cipher
            
            await shuffle(encryptedBuffer, sequence)
                        .then(shuffled => {
                            resolve(Buffer.from(shuffled));
                        })
        })
    }

    static encryptSync(buffer, option = defaultOption) {
        let { key, seed } = option;

        if(!seed) seed = Panda.bufferToHex(key);
        if(typeof seed !== 'string') seed = Panda.bufferToHex(seed);
        if(typeof key === 'string') key = Panda.stringToBuffer(key);

        const sequence = Panda.#createSequence(seed, buffer.length); // generating sequence
        const encryptedBuffer = encrypt(buffer, key); // applying vigenere cipher
        return Buffer.from(shuffleSync(encryptedBuffer, sequence));
    }

    static decrypt(buffer, option = defaultOption) {
        return new Promise(async (resolve, reject) => {
            let { key, seed } = option;

            if(!seed) seed = Panda.bufferToHex(key);
            if(typeof seed !== 'string') seed = Panda.bufferToHex(seed);
            if(typeof key === 'string') key = Panda.stringToBuffer(key);
        
            // unshuffle buffer
            const sequence = Panda.#createSequence(seed, buffer.length);
            await unshuffle(buffer, sequence)
                        .then(unshuffled => {
                            resolve(decrypt(unshuffled, key));
                        });
        })
    }

    static decryptSync(buffer, option = defaultOption) {
        let { key, seed } = option;

         if(!seed) seed = Panda.bufferToHex(key);
        if(typeof seed !== 'string') seed = Panda.bufferToHex(seed);
        if(typeof key === 'string') key = Panda.stringToBuffer(key);

        // unshuffle buffer
        const sequence = Panda.#createSequence(seed, buffer.length);
        const unshuffled = unshuffleSync(buffer, sequence);
        return decrypt(unshuffled, key);
    }

    static #createSequence(seed, bufferSize) {
        return create(seed, bufferSize);
    }


}
module.exports = Panda;