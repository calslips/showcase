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
  editIcon: function (storyUser, loggedUser, storyId, floating = true) {
    if (storyUser._id.toString() === loggedUser._id.toString()) {
      if (floating) {
        return `<a href="/entries/edit/${storyId}}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`;
      } else {
        return `<a href="/entries/edit/${storyId}"><i class="fas fa-edit"></i></a>`;
      }
    } else {
      return '';
    }
  },
};