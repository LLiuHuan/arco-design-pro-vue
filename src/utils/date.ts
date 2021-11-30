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
      return;
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
    if (strDate instanceof Date) {
      const dict: any = {
        yyyy: strDate.getFullYear(),
        M: strDate.getMonth() + 1,
        d: strDate.getDate(),
        H: strDate.getHours(),
        m: strDate.getMinutes(),
        s: strDate.getSeconds(),
        MM: ('' + (strDate.getMonth() + 101)).substr(1),
        dd: ('' + (strDate.getDate() + 100)).substr(1),
        HH: ('' + (strDate.getHours() + 101)).substr(1),
        mm: ('' + (strDate.getMinutes() + 101)).substr(1),
        ss: ('' + (strDate.getSeconds() + 101)).substr(1),
      };
      return strFormat.replace(/(yyyy|MM?|dd?|HH?|mm?|ss?)/g, function () {
        return dict[arguments[0]];
      });
    }
  }
}
