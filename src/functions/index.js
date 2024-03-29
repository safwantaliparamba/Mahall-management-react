const isValidUrl = (urlString) => {
    var urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator
    return !!urlPattern.test(urlString);
}

export const getLocalStorageItem = (key, json=false) => {
    let item = localStorage.getItem(key);

    if (item !== undefined || item !== null) {

        if (item === "true") {
            return true;

        } else if (item === "false") {
            return false;
        }else if (json){
            return JSON.parse(item);
        }
         else {
            return item
        }
    } else {
        return null
    }
}

export default isValidUrl