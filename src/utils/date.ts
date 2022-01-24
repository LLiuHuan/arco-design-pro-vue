/**
 * 时间工具类
 */
export class DateUtil {
  /**
   * 格式化时间
   * 调用formatDate(strDate, 'yyyy-MM-dd');
   * @param strDate（中国标准时间、时间戳等）
   * @param strFormat（返回格式）
   */
  public formatDate(strDate: any, strFormat?: any) {
    if (!strDate) {
      strDate = new Date();
    }
    if (!strFormat) {
      strFormat = 'yyyy-MM-dd';
    }
    switch (typeof strDate) {
      case 'string':
        strDate = new Date(strDate.replace(/-/, '/'));
        break;
      case 'number':
        strDate = new Date(strDate);
        break;
    }

    if (!(strDate instanceof Date)) return strDate;

    const year = `${strDate.getFullYear()}`;
    let month = `${strDate.getMonth() + 1}`;
    if (month.length === 1) {
      month = `0${month}`;
    }
    let day = `${strDate.getDate()}`;
    if (day.length === 1) {
      day = `0${day}`;
    }

    let hours = `${strDate.getHours()}`;
    if (hours.length === 1) {
      hours = `0${hours}`;
    }
    let minutes = `${strDate.getMinutes()}`;
    if (minutes.length === 1) {
      minutes = `0${minutes}`;
    }
    let seconds = `${strDate.getSeconds()}`;
    if (seconds.length === 1) {
      seconds = `0${seconds}`;
    }

    return (strFormat || 'yyyy-MM-dd hh:mm:ss')
      .replace(/yyyy/g, year)
      .replace(/MM/g, month)
      .replace(/dd/g, day)

      .replace(/hh/g, hours)
      .replace(/mm/g, minutes)
      .replace(/ss/g, seconds);
  }
}
