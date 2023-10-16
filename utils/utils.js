

export function titleCase(str) {
    return str.toLowerCase().replace(/[0-9]/g, '').split(' ').map(function (word) {
        return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
}