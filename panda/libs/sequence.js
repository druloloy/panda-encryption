const seedrandom = require('./seedrandom');

/**
 * Generates an array of random numbers
 * @param {*} seed A seed for the random number generator
 * @param {*} size The length of the random numbers to be generated
 * @returns Array of random numbers
 */
exports.create = (seed, size) => {
    // generate all possible random numbers for the given size
    const randomTable = [];
    const random = seedrandom(seed);
    let index = 0;
    while(++index <= size)
        randomTable.push(random());
    return randomTable;
}
