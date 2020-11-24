var uniqid = require('uniqid');

var id = uniqid();
let counter = '0';

module.exports = {
    getID: function uniqueID () {
        counter++;
        return id + counter;
    }
}