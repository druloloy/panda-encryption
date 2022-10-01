

/**
 * Generates an array of random numbers
 * @param {*} seed A seed for the random number generator
 * @param {*} size The length of the random numbers to be generated
 * @returns Array of random numbers
 */
exports.create = (seed, size) => {
    // generate all possible random numbers for the given size
    const isaac = require('./isaac.js');
    isaac.seed(seed)
    const randomTable = [];
    
    let index = 0;
    while(++index <= size)
        randomTable.push(isaac.random()); 
    return randomTable;
}
