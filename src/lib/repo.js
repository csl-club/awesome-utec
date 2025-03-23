"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseRepoInfo = exports.repoStringToUrl = exports.isValidRepoType = void 0;
var isValidRepoType = function (type) {
    return ['github', 'gitlab'].includes(type);
};
exports.isValidRepoType = isValidRepoType;
var repoStringToUrl = function (repoString) {
    var repoInfo = (0, exports.parseRepoInfo)(repoString);
    if (repoInfo === null) {
        return repoString;
    }
    var owner = repoInfo.owner, repo = repoInfo.repo;
    switch (repoInfo.type) {
        case 'github':
            return "https://github.com/".concat(owner, "/").concat(repo);
        case 'gitlab':
            return "https://gitlab.com/".concat(owner, "/").concat(repo);
    }
};
exports.repoStringToUrl = repoStringToUrl;
var parseRepoInfo = function (repoString) {
    var sepIndex = repoString.indexOf(':');
    if (sepIndex === -1) {
        // Just a URL.
        return null;
    }
    var type = repoString.substring(0, sepIndex).toLowerCase();
    var _a = repoString.substring(sepIndex + 1).split('/'), owner = _a[0], repo = _a[1];
    if (!(0, exports.isValidRepoType)(type)) {
        // Whatever it is, not valid.
        return null;
    }
    return { type: type, owner: owner, repo: repo };
};
exports.parseRepoInfo = parseRepoInfo;
