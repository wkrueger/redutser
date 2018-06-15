"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var redutser_1 = require("./redutser");
exports.createRedutser = redutser_1.createRedutser;
exports.createRedutser2 = redutser_1.createRedutser2;
var subdomain_1 = require("./subdomain");
exports.subdomain = subdomain_1.subdomain;
exports.combineRedutsers = subdomain_1.combineRedutsers;
var combine_redutsers_1 = require("./combine-redutsers");
exports.liftRedutserState = combine_redutsers_1.liftRedutserState;
exports.liftDictState = combine_redutsers_1.liftDictState;
__export(require("./plug"));
//export * from "./create-effects"
