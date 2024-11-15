export function trimStringValues<T extends { [key: string]: any; }>(obj: T): T {
    const trimmedObj = {} as T;

    for (const key in obj) {
        if (typeof obj[key] === 'string') {
            trimmedObj[key] = obj[key].trim();
        } else {
            trimmedObj[key] = obj[key];
        }
    }

    return trimmedObj;
}