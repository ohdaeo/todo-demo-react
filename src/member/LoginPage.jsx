import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { ErrorDiv } from "./Join";

const schema = yup.object({
  email: yup.string().required("이메일 입력해주세요"),
  password: yup.string().required("비밀번호를 입력해주세요"),
});

function LoginPage() {
  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors }, // form의 error 상태를 확인 후 유효성 검사 적용
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    console.log("전송시 데이터 ", data);
  };

  useEffect(() => {
    trigger();
  }, [trigger]);

  return (
    <div style={{ margin: "auto", textAlign: "center" }}>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>
            이메일
            <input type="text" {...register("email")} />
          </label>
          {errors.email && <ErrorDiv>{errors.email.message}</ErrorDiv>}
        </div>
        <div>
          <label>
            비밀번호
            <input type="password" {...register("password")} />
          </label>
          {errors.password && <ErrorDiv>{errors.password.message}</ErrorDiv>}
        </div>
        <button type="submit">로그인</button>

        <div>
          <Link to="">비밀번호 찾기</Link>
          <Link to="">아이디 찾기</Link>
          <Link to="/login">회원가입</Link>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
