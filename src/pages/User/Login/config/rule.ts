import { MATCH_PASSWORD, MATCH_USERNAME } from "./constant";
const validateUser = (rule: any, value: any, callback: any): any => {
  if (value == "") {
    callback(new Error("您的账户名不能为空"));
  } else {
    if (!value.match(MATCH_USERNAME)) {
      callback(new Error("账户名支持中文，英文，数字，长度2-20"));
    } else {
      callback();
    }
  }
};
const validatePassword = (rule: any, value: any, callback: any): any => {
  if (value == "") {
    callback(new Error("您的密码不能为空"));
  } else {
    if (!value.match(MATCH_PASSWORD)) {
      callback(new Error("密码至少包含 数字和英文，长度6-20"));
    } else {
      callback();
    }
  }
};
export { validatePassword, validateUser };
