import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Home = () => {
  const navigate = useNavigate();
  const nickname = localStorage.getItem("nickname");

  const handleLogout = () => {
    localStorage.clear(); // 전체 삭제
    navigate("/");
  };

  return (
    <Container>
      <h1>에브리휴먼타임 테스트 센터</h1>
      <WelcomeBox>
        <p>
          <strong>{nickname}</strong>님, 환영합니다!
        </p>
        <LogoutBtn onClick={handleLogout}>로그아웃</LogoutBtn>
      </WelcomeBox>

      <MenuGrid>
        <MenuCard onClick={() => navigate("/cafetest")}>
          <h3>☕ 카페 테스트</h3>
          <p>카페 목록 조회 및 상세 정보 확인</p>
        </MenuCard>

        <MenuCard onClick={() => navigate("/posttest")}>
          <h3>📝 게시글 테스트</h3>
          <p>커뮤니티 게시글 작성 및 댓글 확인</p>
        </MenuCard>

        <MenuCard onClick={() => navigate("/favoritetest")}>
          <h3>⭐ 즐겨찾기 테스트</h3>
          <p>카페 즐겨찾기 추가/삭제 기능</p>
        </MenuCard>
      </MenuGrid>
    </Container>
  );
};

export default Home;

// --- 간단한 스타일링 ---
const Container = styled.div`
  padding: 50px;
  text-align: center;
  font-family: "Malgun Gothic", sans-serif;
`;

const WelcomeBox = styled.div`
  margin-bottom: 30px;
  background: #f1f3f5;
  padding: 10px;
  border-radius: 8px;
  display: inline-block;
`;

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 900px;
  margin: 0 auto;
`;

const MenuCard = styled.div`
  padding: 30px;
  background: white;
  border: 2px solid #3498db;
  border-radius: 15px;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background: #3498db;
    color: white;
    transform: translateY(-5px);
  }
`;

const LogoutBtn = styled.button`
  margin-left: 10px;
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
`;
