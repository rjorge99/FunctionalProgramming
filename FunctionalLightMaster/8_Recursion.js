function isVowel(char) {
    return ['a', 'e', 'i', 'o', 'u'].includes(char);
}

function countVowels(str) {
    if (str.length === 0) return 0;
    let first = isVowel(str[0]) ? 1 : 0;
    return first + countVowels(str.slice(1));
}

// Base condition location (Only executes one if the sting has only one character)
function countVowels(str) {
    let first = isVowel(str[0]) ? 1 : 0;
    if (str.length === 0) return first;
    return first + countVowels(str.slice(1));
}

// Exercise
function isPalidrome(str = '') {
    if (str.length <= 1) return true;
    let isCurrentPalidrome = str[0] === str[str.length - 1];
    return isCurrentPalidrome && isPalidrome(str.substring(1));
}
