exports.shuffleSync = (arr, sequence) => {
    // fisher-yates algorithm
    let index = arr.length-1;
    while(index >= 0) {
        const randomNumber = sequence[(arr.length-index)-1]; // get random number from sequence starting from 0
        const randIndex = Math.floor(randomNumber * index);
        [arr[randIndex], arr[index]] = [arr[index], arr[randIndex]]; // swap random index with current index
        index--;
    }
    return arr;
}   

exports.unshuffleSync = (arr, sequence) => {
    // reverse fisher-yates algorithm
    let index = 0;
    while(index < arr.length) {
        const randomNumber = sequence[((arr.length - index)-1)]; // get random number from sequence starting from end
        const randIndex = Math.floor(randomNumber * index);
        [arr[index], arr[randIndex]] = [arr[randIndex], arr[index]]; // swap random index with current index
        index++;
    }
    return arr;
}

exports.shuffle = (arr, sequence) => {
    // fisher-yates algorithm
    return Promise.resolve(this.shuffleSync(arr, sequence));
}   

exports.unshuffle = (arr, sequence) => {
    // reverse fisher-yates algorithm
    return Promise.resolve(this.unshuffleSync(arr, sequence));
}
