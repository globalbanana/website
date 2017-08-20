
export const dateMDY = (_date) => {

    _date = (typeof _date === 'string')
            ? (new Date(_date)) 
            : _date

    const mm = _date.getMonth() + 1;
    const dd = _date.getDate();
    const yyyy = _date.getFullYear();
    const date = mm + '/' + dd + '/' + yyyy;
    return date
}