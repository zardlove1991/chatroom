let namespace = 'chatroom';

export function saveItem(key, value) {
    let storage = window.localStorage.getItem(namespace)
    if(!storage) {
        storage = {};
    } else {
        storage = JSON.parse(storage)
    }
    storage[key] = value;
    window.localStorage.setItem(namespace, JSON.stringify(storage))
}

export function loadItem(key, def) {
    let storage = window.localStorage.getItem(namespace)
    if(!storage) {
        return def
    }
    storage = JSON.parse(storage)
    let result = storage[key]
    return  result || def
}