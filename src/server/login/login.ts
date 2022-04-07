import { Account, LoginInfo } from "./type";
import WBRequest from "../index";
export function accoutRequest(account: Account) {
  return WBRequest.post<LoginInfo>({
    url: "/login",
    data: account
  });
}
