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
  editIcon: function (entryUser, loggedUser, entryId, floating = true) {
    if (entryUser._id.toString() === loggedUser._id.toString()) {
      if (floating) {
        return `<a href="/entries/edit/${entryId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`;
      } else {
        return `<a href="/entries/edit/${entryId}"><i class="fas fa-edit"></i></a>`;
      }
    } else {
      return '';
    }
  },
  select: function (selected, options) {
    return options
      .fn(this)
      .replace(
        new RegExp(' value="' + selected + '"'),
        '$& selected="selected"'
      )
      .replace(
        new RegExp('>' + selected + '</option'),
        ' selected="selected"$&'
      );
  },
};