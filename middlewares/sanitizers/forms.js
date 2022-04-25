exports.date = function (value) {
    if (typeof value === 'string' && value.trim().match(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/)) {
        const [year, month, day] = value.split('-');
        return new Date(year, month, day);
    }
    return undefined;
}