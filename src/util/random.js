
const _randomInt = (min = 0, max = 5) => { 
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const _randomString = (max = 5) => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < max; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

export const randomInt = _randomInt
export const randomString = _randomString