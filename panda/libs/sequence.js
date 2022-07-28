const seedrandom = require('./seedrandom');

exports.create = (seed, size) => {
    // generate all possible random numbers for the given size
    const randomTable = [];
    const random = seedrandom(seed);
    let index = 0;
    while(++index <= size)
        randomTable.push(random());
    return randomTable;
}
