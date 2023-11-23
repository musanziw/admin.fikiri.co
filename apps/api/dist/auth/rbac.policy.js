"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RBAC_POLICY = void 0;
const nest_access_control_1 = require("nest-access-control");
const roles_1 = require("./enums/roles");
exports.RBAC_POLICY = new nest_access_control_1.RolesBuilder();
exports.RBAC_POLICY.grant(roles_1.Roles.ADMIN)
    .read('roles')
    .create('roles')
    .update('roles')
    .delete('roles')
    .read('users')
    .create('users')
    .update('users')
    .delete('users');
//# sourceMappingURL=rbac.policy.js.map