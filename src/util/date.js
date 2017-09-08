
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

const _processGetFormattedTimeInfo = (timestamp) => {
    const SECS_IN_MINUTE = 60
    const SECS_IN_HOUR = 60 * 60
    const SECS_IN_DAY = 60 * 60 * 24
    const SECS_IN_MONTH = 60 * 60 * 24 * 30
    const nowInSec = Math.floor(Date.now() / 1000)
    const timeAdv = nowInSec - timestamp < 0 ? '後' : '前'
    const diff = Math.abs(nowInSec - timestamp)
  
    if (diff < SECS_IN_MINUTE) {
      // within one minute => xx 秒 (前 | 後)
      return `${diff} 秒${timeAdv}`
    } else if (diff < SECS_IN_HOUR) {
      // within one hour => xx 分鐘 (前 | 後)
      return `${Math.floor(diff / SECS_IN_MINUTE)} 分鐘${timeAdv}`
    } else if (diff < SECS_IN_DAY) {
      // within one day => xx 小時 (前 | 後)
      return `${Math.floor(diff / SECS_IN_HOUR)} 小時${timeAdv}`
    } else if (diff < SECS_IN_MONTH) {
      // within one month => xx 天 (前 | 後)
      return `${Math.floor(diff / SECS_IN_DAY)} 天${timeAdv}`
    } else {
      const dateObj = new Date(timestamp * 1000)
      const month = dateObj.getMonth() + 1
      const monthStr = month < 10 ? `0${month}` : month
      const date = dateObj.getDate()
      const dateStr = date < 10 ? `0${date}` : date
  
      return `${monthStr}-${dateStr}`
    }
  }
  
  /**
  * Get normalized time information.
  * @param timestamp or Date() Object
  *   time that wants to convert to formatted time string (in second)
   * @return {String} '秒前' or '分鐘前' or '小時前' or '天前' or 'n-n'
  */
  export const getFormattedTimeInfo = (_timestamp) => {
    let timestamp
  
    if (typeof _timestamp === 'number') {        
      timestamp = _timestamp
    } else if (_timestamp instanceof Date) {        
      timestamp = _timestamp.getTime() / 1000
    } else {        
      throw new Error('only timestamp of Date() Object are accepted.')
    }
  
    return _processGetFormattedTimeInfo(timestamp)
  }