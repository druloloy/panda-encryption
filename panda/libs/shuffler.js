/**
 * Shuffles array in place using Fisher-Yates Algorithm.
 * @param {*} arr Array of elements to be shuffled
 * @param {*} sequence Sequence of random numbers
 * @returns Shuffled array
 */
function shuffleSync(arr, sequence) {
    let index = arr.length - 1;
    while (index >= 0) {
        const randomNumber = sequence[arr.length - index - 1]; // get random number from sequence starting from 0
        const randIndex = Math.floor(randomNumber * index);

        [arr[randIndex], arr[index]] = [arr[index], arr[randIndex]]; // swap random index with current index
        index--;
    }

    return arr;
}

/**
 * Unshuffles array using Fisher-Yates Algorithm.
 * @param {*} arr Shuffled array elements to be unshuffled
 * @param {*} sequence Sequence of random numbers
 * @returns Original array
 */
function unshuffleSync(arr, sequence) {
    let index = 0;
    while (index < arr.length) {
        const randomNumber = sequence[arr.length - index - 1]; // get random number from sequence starting from end
        const randIndex = Math.floor(randomNumber * index);
        [arr[index], arr[randIndex]] = [arr[randIndex], arr[index]]; // swap random index with current index
        index++;
    }
    return arr;
}

/**
 * asynchronously shuffles array in place using Fisher-Yates Algorithm.
 * @param {*} arr Array of elements to be shuffled
 * @param {*} sequence Sequence of random numbers
 * @returns Shuffled array
 */
function shuffle(arr, sequence) {
    return Promise.resolve(shuffleSync(arr, sequence));
}

/**
 * Asynchronously unshuffles array using Fisher-Yates Algorithm.
 * @param {*} arr Shuffled array elements to be unshuffled
 * @param {*} sequence Sequence of random numbers
 * @returns Original array
 */
function unshuffle(arr, sequence) {
    return Promise.resolve(unshuffleSync(arr, sequence));
}

module.exports = {
    shuffle,
    unshuffle,
    shuffleSync,
    unshuffleSync,
};
