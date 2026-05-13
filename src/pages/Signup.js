import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as S from "../styles/AuthStyle";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nickname: "",
    phone: "",
  });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8111/api/auth/signup",
        formData,
      );
      console.log("성공 응답:", response.data);
      alert("회원가입 완료!");
      navigate("/");
    } catch (err) {
      // 이 부분을 추가해야 에러 이유가 Console에 뜹니다!
      console.error("에러 발생:", err);
      if (err.response) {
        // 서버가 응답을 보냈으나 4xx, 5xx 에러인 경우
        console.error("에러 상태:", err.response.status);
        console.error("에러 데이터:", err.response.data);
      }
      alert("가입 실패!");
    }
  };

  return (
    <S.AuthContainer>
      <S.AuthBox>
        <h2>회원가입</h2>
        <S.StyledForm onSubmit={handleSignup}>
          <S.StyledInput
            name="email"
            placeholder="이메일"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <S.StyledInput
            name="password"
            type="password"
            placeholder="비밀번호"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          <S.StyledInput
            name="nickname"
            placeholder="닉네임"
            onChange={(e) =>
              setFormData({ ...formData, nickname: e.target.value })
            }
            required
          />
          <S.StyledInput
            name="phone"
            placeholder="전화번호"
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            required
          />
          <S.StyledButton type="submit" color="#2ecc71">
            가입하기
          </S.StyledButton>
          <S.StyledButton
            type="button"
            color="#95a5a6"
            onClick={() => navigate("/")}
          >
            로그인 이동
          </S.StyledButton>
        </S.StyledForm>
      </S.AuthBox>
    </S.AuthContainer>
  );
};

export default Signup;
