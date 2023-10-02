import path_ from "path";

export const path = __dirname.indexOf("/") ? path_.win32 : path_.posix;
