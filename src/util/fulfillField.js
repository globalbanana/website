const fulfillField = (obj = {})=> {
    const _o = {}
    Object.keys(obj).forEach( key => {
        if(obj[key] && obj[key]!=='') {
            _o[key] = obj[key]
        }
    })
    return JSON.stringify(_o)
}
export default fulfillField