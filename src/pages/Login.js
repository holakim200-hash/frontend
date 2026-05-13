import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as S from "../styles/AuthStyle";

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8111/api/auth/login",
        loginData,
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("nickname", res.data.nickname);

      console.log("로그인 성공! 토큰:", res.data.token);
      alert("로그인 성공!");
      navigate("/home");
    } catch (err) {
      alert("로그인 실패!");
    }
  };

  return (
    <S.AuthContainer>
      <S.AuthBox>
        <h2>로그인</h2>
        <S.StyledForm onSubmit={handleLogin}>
          <S.StyledInput
            name="email"
            placeholder="이메일"
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
            required
          />
          <S.StyledInput
            name="password"
            type="password"
            placeholder="비밀번호"
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
            required
          />
          <S.StyledButton type="submit">로그인</S.StyledButton>
          <S.StyledButton
            type="button"
            color="#95a5a6"
            onClick={() => navigate("/signup")}
          >
            회원가입 이동
          </S.StyledButton>
        </S.StyledForm>
      </S.AuthBox>
    </S.AuthContainer>
  );
};

export default Login;
