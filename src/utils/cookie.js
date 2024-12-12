/*
cookie관리 유틸리티 함수
*/
//Get : 쿠키값 읽기

import { useCookies } from "react-cookie";

export const uesCookieUtil = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
};

//@param{string}name
export const getCookie = name => {
  const { cookies } = useCookies([name]);
  return cookies[name];
};

// Set : 쿠키값 쓰기
//@param{string}name - 이름
//@param{any}value - 저장데이터
//@param{string}path - 저장경로 (기본 '/')
//@param{number}maxAge - 유효시간 (기본 1시간)
export const setCookie = (name, value, path = "/", maxAge = 1) => {};

// Remove : 쿠키값 지우기
export const removeCookie = name => {
  useCookies();
};
