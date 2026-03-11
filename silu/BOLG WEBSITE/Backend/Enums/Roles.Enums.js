import Actions from "./Actions.Enums.js";

export const Role = Object.freeze({
    USER: "USER",
    ADMIN: "ADMIN",
});

export const RolePermission = Object.freeze({
    USER: [
        Actions.CREATE_BLOG,
        Actions.EDIT_OWN_BLOG,
        Actions.VIEW_OWN_BLOG,
        Actions.DELETE_OWN_BLOG,
        Actions.VIEW_ALL_BLOGS
    ],
    ADMIN: [
        Actions.CREATE_BLOG,
        Actions.VIEW_OWN_BLOG,
        Actions.VIEW_ALL_BLOGS,
        Actions.EDIT_OWN_BLOG,
        Actions.EDIT_ANY_BLOG,
        Actions.DELETE_OWN_BLOG,
        Actions.DELETE_ANY_BLOG,
        Actions.VIEW_USERS,
    ],
});
