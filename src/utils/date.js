Date.prototype.format = function (fmt) {
  let format = fmt || 'yyyy-MM-dd HH:mm:ss';
  let date = {
    y: this.getFullYear(),
    M: this.getMonth() + 1,
    d: this.getDate(),
    H: this.getHours(),
    m: this.getMinutes(),
    s: this.getSeconds(),
    S: this.getMilliseconds(),
  };
  for (let j in date) {
    format = format.replace(new RegExp(j + '+', 'g'), (m) => {
      let obj = String(date[j]);
      for (let i = 0, len = obj.length; i < m.length - len; i++) obj = '0' + date[j];
      return m.length === 1 ? date[j] : obj.substr(obj.length - m.length);
    });
  }
  return format;
};

function toDate(dateStr) {
  return new Date(dateStr) || new Date();
}

function getSlashYMD(dateStr) {
  const date = toDate(dateStr);
  return date.format('yyyy/MM/dd');
}

function getSlashYMDHMS(dateStr) {
  const date = toDate(dateStr);
  return date.format('yyyy/MM/dd HH:mm:ss');
}
function getDotYMD(dateStr) {
  const date = toDate(dateStr);
  return date.format('yyyy.MM.dd');
}

function getDotYMDHMS(dateStr) {
  const date = toDate(dateStr);
  return date.format('yyyy.MM.dd HH:mm:ss');
}
function getBarYMD(dateStr) {
  const date = toDate(dateStr);
  return date.format('yyyy-MM-dd');
}

function getBarYMDHMS(dateStr) {
  const date = toDate(dateStr);
  return date.format('yyyy-MM-dd HH:mm:ss');
}

export { toDate, getSlashYMD, getSlashYMDHMS, getDotYMD, getDotYMDHMS, getBarYMD, getBarYMDHMS };
