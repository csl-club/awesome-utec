"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAuthors = exports.getAllProjects = exports.getContent = exports.contentFile = void 0;
var node_path_1 = require("node:path");
var promises_1 = require("node:fs/promises");
var yaml_1 = require("yaml");
var rest_1 = require("@octokit/rest");
var rest_2 = require("@gitbeaker/rest");
var repo_1 = require("./repo");
var object_1 = require("./object");
exports.contentFile = node_path_1.default.join(process.cwd(), 'content.yml');
// TODO: content schema validation
var getContent = function () { return __awaiter(void 0, void 0, void 0, function () {
    var fileContents;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, promises_1.default.readFile(exports.contentFile, 'utf-8')];
            case 1:
                fileContents = _a.sent();
                return [2 /*return*/, yaml_1.default.parse(fileContents)];
        }
    });
}); };
exports.getContent = getContent;
var getAllProjects = function (token) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, projects, authors;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, (0, exports.getContent)()];
            case 1:
                _a = _b.sent(), projects = _a.projects, authors = _a.authors;
                console.log("called once");
                return [4 /*yield*/, Promise.all(projects.map(function (proj) { return completeProjectData(token, proj, authors); }))];
            case 2: return [2 /*return*/, _b.sent()];
        }
    });
}); };
exports.getAllProjects = getAllProjects;
var getAllAuthors = function () { return __awaiter(void 0, void 0, void 0, function () {
    var content;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.getContent)()];
            case 1:
                content = _a.sent();
                return [2 /*return*/, content.authors];
        }
    });
}); };
exports.getAllAuthors = getAllAuthors;
var completeProjectData = function (token, projectData, allAuthors) { return __awaiter(void 0, void 0, void 0, function () {
    var tags, authors, summary, lang, repoInfo, _a, octokit, repoData, projId, gitlab, langs, projectData_1;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                tags = (_c = (_b = projectData.tags) === null || _b === void 0 ? void 0 : _b.map(function (s) { return s.toLowerCase(); })) !== null && _c !== void 0 ? _c : [];
                authors = projectData.authors.map(function (authorId) { return allAuthors.find(function (author) { return author.id === authorId; }); });
                summary = projectData.summary, lang = projectData.lang;
                repoInfo = (0, repo_1.parseRepoInfo)(projectData.repo);
                if (!(repoInfo !== null)) return [3 /*break*/, 8];
                _a = repoInfo.type;
                switch (_a) {
                    case 'github': return [3 /*break*/, 1];
                    case 'gitlab': return [3 /*break*/, 3];
                }
                return [3 /*break*/, 8];
            case 1:
                if (!token) {
                    console.warn('GITHUB_TOKEN environment variable not found. Proceeding without authentication');
                }
                octokit = new rest_1.Octokit({ auth: token });
                return [4 /*yield*/, octokit.rest.repos.get(__assign({}, repoInfo))];
            case 2:
                repoData = (_d.sent()).data;
                if (repoData.language) {
                    lang !== null && lang !== void 0 ? lang : (lang = repoData.language);
                }
                if (repoData.description) {
                    summary !== null && summary !== void 0 ? summary : (summary = repoData.description);
                }
                return [3 /*break*/, 8];
            case 3:
                projId = "".concat(repoInfo.owner, "/").concat(repoInfo.repo);
                gitlab = new rest_2.Gitlab({});
                if (!!lang) return [3 /*break*/, 5];
                return [4 /*yield*/, gitlab.Projects.showLanguages(projId)];
            case 4:
                langs = _d.sent();
                if (!(0, object_1.isEmpty)(langs)) {
                    lang = (0, object_1.maxKeyByValue)(langs);
                }
                _d.label = 5;
            case 5:
                if (!!summary) return [3 /*break*/, 7];
                return [4 /*yield*/, gitlab.Projects.show(projId)];
            case 6:
                projectData_1 = _d.sent();
                if (projectData_1.description)
                    summary !== null && summary !== void 0 ? summary : (summary = projectData_1.description);
                _d.label = 7;
            case 7: return [3 /*break*/, 8];
            case 8:
                if (!summary) {
                    throw new Error("'".concat(projectData.name, "' does not have a description."));
                }
                return [2 /*return*/, __assign(__assign({}, projectData), { summary: summary, authors: authors, tags: tags, lang: lang })];
        }
    });
}); };
