const moment = require('moment');

module.exports = {
  formatDate: function (date, format) {
    return moment(date).format(format);
  },
  truncate: function (str, length) {
    if (str.length > length) {
      let newStr = (str + ' ').slice(0, length);
      newStr = newStr.slice(0, newStr.lastIndexOf(' '));
      return (newStr ? newStr : str.slice(0, length)) + '...';
    }
    return str;
  },
  stripTags: function (input) {
    return input.replace(/<(?:.|\n)*?>/gm, '');
  },
};