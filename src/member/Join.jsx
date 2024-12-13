import styled from "@emotion/styled";
import * as yup from "yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
export const ErrorDiv = styled.div`
  width: 100%;
  color: red;
  font-size: 10px;
`;
/*
Yup 적용
- npm i yup @hookform/resolvers
*/

//1. schema 설정
const schema = yup.object({
  name: yup
    .string()
    .min(2, "최소 2글자 이상 입력해주세요.")
    .required("이름을 입력해주세요"),
  email: yup
    .string()
    .email("잘못된 이메일 형식이에요.")
    .required("이메일을 입력해주세요."),
  password: yup
    .string()
    .required("최소 8자 이상 입력해주세요")
    .min(8, "대/소문자+숫자+특수 문자(!?@$~^) 조합 8자 이상 입력해 주세요.")
    .max(16, "최대 16글자 이하로 입력해주세요")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
      "대/소문자+숫자+특수 문자(!?@$~^) 조합 8자 이상 입력해 주세요.",
    ),
  pwconfirm: yup
    .string()
    .oneOf([yup.ref("password")], "비밀번호를 다시 확인해 주세요.")
    .required("비밀번호를 다시 확인해 주세요."),
  policy: yup.boolean().oneOf([true]).required("이용약관에 동의해주세요."),
});

const formatPhoneNumber = value => {
  if (!value) return value;
  const phoneNumber = value.replace(/[^\d]/g, "");
  const phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 8) {
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
  }
  return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
};

/*form을 state로 작동시키면, 
많은 양의 리랜더링이 발생하여 글자를 한 개만 적어도 리랜더링이 일어난다.
작성내용은 항목이 많은 경우 성능이슈 또한 발생 할 가능성이 높아진다.
** npm install react-hook-form **
*/
function Join() {
  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  // });
  // //set 리랜더링 발생
  // const handleChange = e => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };
  // const handleSubmit = e => {
  //   e.preventDefault();
  // };

  /*
  react-hook-form
  register : 입력창을 Hook form에 등록
  handleSubmit : form 전송 실행 처리
  getValues : 입력 값 추출
  defaultValues : form 요소 초기값 세팅
  reset : form 요소 값 리셋
  
  mode : 원하는 시점
  - onChange : 유효성 검사 즉시 실행
  - onBlur: 폼 외부를 클릭했을 시 검사 실행 
  - onSubmit 실행 시 폼 유효성 검사실행
  - all :  onChange 와 onBlur 모두 포함
  - trigger : 초기 화면 출력 시 폼 유효성 검사실행하기
  - setValue : form의 value값을 강제로 대입
  
  */
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    trigger,
    formState: { errors }, // form의 error 상태를 확인 후 유효성 검사 적용
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      pwconfirm: "",
      birthday: "",
      gender: "",
      phone: "",
      address: {
        postcode: "",
        basic: "",
        detail: "",
      },
      policy: false,
    },
    mode: "all",
    //2. schema 에 hookfrom을 연결한다.
    resolver: yupResolver(schema),
  });
  //전송용 데이터
  const onSubmit = data => {
    console.log("전송시 데이터 ", data);
    const sendData = { ...data, phone: data.phone.replaceAll("-", "") };
    console.log("전송시 데이터 sendData ", sendData);
  };

  useEffect(() => {
    trigger();
  }, [trigger]);

  //Daum Postcode
  //npm i react-daum-postcode

  /*
  1. 외부 자바스크립트를 불러오기
  */
  useEffect(() => {
    // Daum 우편번호 스크립트 로드
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);

    // 컴포넌트 언마운트 시 스크립트 제거
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  //2. 선택 시 주소 창 출력
  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: data => {
        // 우편번호와 기본주소 입력
        setValue("address.postcode", data.zonecode);
        setValue("address.basic", data.address);

        // 상세주소 입력 필드로 포커스 이동
        document.querySelector('input[name="address.detail"]').focus();
      },
    }).open();
  };

  return (
    <div style={{ margin: "auto", textAlign: "center" }}>
      <h1>회원가입</h1>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="">
            이름
            <input type="text" {...register("name")} />
          </label>
          {/* name이 없을 경우 에러 내용을 출력 */}
          {errors.name && <ErrorDiv>{errors.name.message}</ErrorDiv>}
        </div>
        <div>
          <label htmlFor="">
            이메일
            <input type="email" {...register("email")} />
          </label>
          {errors.email && <ErrorDiv>{errors.email.message}</ErrorDiv>}
          <div>
            <label htmlFor="">
              비밀번호
              <input type="password" {...register("password")} />
            </label>
            {errors.password && <ErrorDiv>{errors.password.message}</ErrorDiv>}
          </div>
          <div>
            <label htmlFor="">
              비밀번호 재확인
              <input type="password" {...register("pwconfirm")} />
            </label>
            {errors.pwconfirm && (
              <ErrorDiv>{errors.pwconfirm.message}</ErrorDiv>
            )}
          </div>
        </div>
        <label htmlFor="">
          생년월일
          <input type="date" {...register("birthday")} />
        </label>
        {errors.birthday && <ErrorDiv>{errors.birthday.message}</ErrorDiv>}

        <div>
          <label htmlFor="">
            성별
            <select {...register("gender")}>
              <option value="{male}">남성</option>
              <option value="{female}">여성</option>
              <option value="{other}">기타</option>
            </select>
          </label>
          <div>
            <label htmlFor="">
              연락처
              <input
                type="tel"
                {...register("phone")}
                onChange={e => {
                  const tempPhone = formatPhoneNumber(e.target.value);
                  setValue("phone", tempPhone); // 강제로 값을 대입시킴
                }}
              />
            </label>
            {errors.phone && <ErrorDiv>{errors.phone.message}</ErrorDiv>}
          </div>
          <div>
            <label htmlFor="">
              우편번호
              <input
                type="text"
                {...register("address.postcode")}
                placeholder="우편번호를 입력해주세요"
              />
              <button
                onClick={() => {
                  handleAddressSearch();
                }}
              >
                주소 검색
              </button>
            </label>
          </div>
          <div>
            <label htmlFor="">
              주소
              <input
                type="text"
                {...register("address.basic")}
                placeholder="주소"
              />
            </label>
          </div>
          <div>
            <label htmlFor="">
              상세주소
              <input
                type="text"
                {...register("address.detail")}
                placeholder="상세주소"
              />
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              {...register("policy", {
                required: "이용약관에 동의해주세요.",
              })}
            />
            <label htmlFor="">이용약관에 동의합니다</label>
            {errors.policy && <ErrorDiv>{errors.policy.message}</ErrorDiv>}
            <textarea
              style={{
                width: "500px ",
                height: "300px",
                overflowY: "auto",
                resize: "none",
              }}
            >
              약관내용 Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Aut id maxime minus saepe odio ab. Consectetur id necessitatibus
              fuga laboriosam illo rerum veniam, sed quos, atque suscipit
              temporibus ea dignissimos. Obcaecati voluptates dolore, quasi
              voluptas neque autem illo, provident aperiam soluta quod id esse
              amet animi tempore inventore quos eaque voluptatibus fugiat ad
              aut, eum est culpa fuga! Aliquid, accusamus. Harum, provident
              earum cupiditate ducimus non magnam cum, adipisci libero voluptas
              laudantium tenetur quaerat voluptatibus incidunt corrupti! Fuga a
              distinctio facilis similique totam earum incidunt illum. Saepe
              eligendi accusamus est. Repudiandae ex beatae veritatis aspernatur
              quod deleniti atque qui aliquid, illum laborum, magni sunt nihil
              laboriosam molestiae sequi temporibus libero excepturi commodi
              error quam consequuntur! Sunt quia deserunt eum unde. Adipisci
              debitis aliquam animi exercitationem soluta quos. In corrupti
              consequatur itaque laborum inventore quidem exercitationem
              voluptatum vitae dolore soluta atque, cupiditate neque hic
              quibusdam unde esse eveniet expedita eaque? Dicta. Deserunt cumque
              asperiores sapiente! Mollitia, earum eum? Sint at consequatur
              officia quidem eos. Ad aliquam vitae id quibusdam quia aliquid
              debitis dolore fugiat laborum? Officia pariatur tempore maxime
              natus nam? Dolores dolore cumque iure esse similique. Nesciunt,
              reiciendis consequatur. Assumenda tempore illum fuga omnis
              dignissimos dolor dolores labore veritatis laboriosam, ad
              repudiandae excepturi ullam, harum, minus autem commodi temporibus
              accusantium. Temporibus corrupti vel quibusdam quis autem expedita
              aliquid ipsum sint inventore perspiciatis sit eius excepturi
              maiores provident harum exercitationem accusantium tempore cum
              ratione et at cumque eaque, maxime sunt. Doloribus? Corrupti vel
              illo hic blanditiis ea amet quam illum saepe ipsum cum aspernatur
              totam nulla perspiciatis nemo, consequuntur quasi facilis eos,
              minus temporibus quae. Sunt iure sit soluta quod porro?
              Repudiandae temporibus distinctio cumque sequi minus quae
              perspiciatis facere quod consequatur libero, maxime excepturi et
              doloribus optio at voluptates alias mollitia accusamus recusandae
              amet, exercitationem quibusdam saepe accusantium aut?
              Voluptatibus?
            </textarea>
          </div>
          <div>
            <button
              type="button"
              onClick={() => reset()}
              value="Custom Reset Field Values & Errors"
            />
            <button type="submit">제출</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Join;
