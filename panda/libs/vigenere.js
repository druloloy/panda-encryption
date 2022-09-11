class Vigenere{
    
    /**
     * Transforms the key to be used for cipher/decipher based on Vigenere cipher
     * @param {*} keyBuffer The key in a buffer form
     * @param {*} bufferSize The size of the buffer to be encrypted
     * @returns Transformed key
     */
    static generateKey = (keyBuffer, bufferSize) => {
        const initialKeyLength = keyBuffer.length;
        let index = 0;
        while(keyBuffer.length < bufferSize) {
            if(index >= initialKeyLength) 
                index = 0;
            const byte = Buffer.from([keyBuffer[index]], 'hex');
            keyBuffer = Buffer.concat([keyBuffer, byte]);
            index++;
        }
        return keyBuffer;
    }

    /**
     * Creating the cipher sequence
     * @param {*} buffer The buffer to be ciphered
     * @param {*} keyBuffer The key in a buffer form
     * @returns ciphered buffer sequence
     */
    static encrypt = (buffer, keyBuffer) => {    
        // encrpyt vigenere
        const FILE_BUFFER_LENGTH = buffer.length;
        const KEY_BUFFER_LENGTH = keyBuffer.length;
        
        let index = 0;
        let keyIndex = 0;
        let encryptedBuffer = Buffer.alloc(FILE_BUFFER_LENGTH);
        while(index < FILE_BUFFER_LENGTH) {
            const byte = buffer[index];
            const keyByte = keyBuffer[keyIndex];
            let encryptedByte = (byte + keyByte) % 256; 
            encryptedBuffer[index] = encryptedByte;
            index++;
            keyIndex++;
            if(keyIndex >= KEY_BUFFER_LENGTH)
                keyIndex = 0;
        }
        return encryptedBuffer;
    }

    /**
     * Creating the deciphered sequence
     * @param {*} buffer The buffer to be deciphered
     * @param {*} keyBuffer The key in a buffer form
     * @returns original buffer sequence
     */
    static decrypt = (buffer, keyBuffer)  => {
        // decrypt vigenere
        const FILE_BUFFER_LENGTH = buffer.length;
        const KEY_BUFFER_LENGTH = keyBuffer.length;
        let index = 0;
        let keyIndex = 0;
        let decryptedBuffer = Buffer.alloc(FILE_BUFFER_LENGTH);
        while(index < FILE_BUFFER_LENGTH) {
            const byte = buffer[index];
            const keyByte = keyBuffer[keyIndex];
            let decryptedByte = (byte - keyByte) % 256;
            decryptedBuffer[index] = decryptedByte;
            index++;
            keyIndex++;
            if(keyIndex >= KEY_BUFFER_LENGTH)
                keyIndex = 0;
        }
        return decryptedBuffer;
    }
};

module.exports = Vigenere;