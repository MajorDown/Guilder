const stringToPattern = (str: string): string => {
    const escapedStr = str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    return '^' + escapedStr + '$';
}

export default stringToPattern;