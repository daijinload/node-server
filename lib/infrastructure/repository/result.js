/**
 * @fileoverview Result用リポジトリー
 */
var util = require('util');
var Repository = require('../core/repository').Repository;

function Result() {
    Repository.call(this, this.constructor.name);
}
module.exports = Result;

util.inherits(Result, Repository);

// 取得
Result.prototype.listLimitByNotResponded = function(serviceId, limit, callback) {
    var query = {serviceId: serviceId, responded: false};
    this.listLimit(query, limit, callback);
};
