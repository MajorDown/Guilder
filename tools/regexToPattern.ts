const regexToPattern = (regex: RegExp): string => {
    return regex.toString().replace(/^\/|\/$/g, '');
}

export default regexToPattern;