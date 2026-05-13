import React, { useState } from "react";
import axios from "axios";
import * as S from "../styles/FavoriteTestStyle";

const BASE_URL = "http://localhost:8111";
const getToken = () => localStorage.getItem("token"); // 토큰이 필요한 경우 대비

const FavoriteTest = () => {
  const [userId, setUserId] = useState(1); // 기본값 1로 설정해서 테스트 용이하게
  const [cafeId, setCafeId] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [result, setResult] = useState(null); // 에러 메시지 확인용

  const API_URL = `${BASE_URL}/api/favorites`;

  // 1. 내 즐겨찾기 목록 조회
  const fetchFavorites = async () => {
    if (!userId) return alert("UserId를 입력하세요");
    try {
      const res = await axios.get(`${API_URL}/${userId}`, {
        headers: { Authorization: `Bearer ${getToken()}` }, // 토큰 추가!
      });
      setFavorites(res.data);
      console.log("목록 조회 성공:", res.data);
    } catch (err) {
      console.error("조회 실패", err);
    }
  };

  // 2. 즐겨찾기 추가 (POST)
  const addFavorite = async () => {
    try {
      const res = await axios.post(
        API_URL,
        {
          userId: parseInt(userId),
          cafeId: parseInt(cafeId),
        },
        {
          headers: { Authorization: `Bearer ${getToken()}` }, // 토큰 추가!
        },
      );
      alert("추가 성공!");
      fetchFavorites();
    } catch (err) {
      console.error("추가 실패 상세:", err.response);
      alert("추가 실패 (403): 권한이 없거나 토큰이 없습니다.");
    }
  };

  // 3. 즐겨찾기 해제 (DELETE)
  const removeFavorite = async (cId) => {
    try {
      const res = await axios.delete(`${API_URL}/${userId}/${cId}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      alert("삭제 성공");
      fetchFavorites();
    } catch (err) {
      alert("해제 실패");
    }
  };

  return (
    <S.Container>
      <h2>즐겨찾기 기능 테스트</h2>

      {/* 에러 디버깅 영역 추가 */}
      {result && typeof result === "object" && (
        <pre style={{ background: "#fee", padding: "10px", color: "red" }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}

      <S.Section>
        <h4>유저 설정</h4>
        <S.InputGroup>
          <S.Input
            type="number"
            placeholder="User ID 입력"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <S.Button onClick={fetchFavorites} color="#2ecc71">
            내 목록 불러오기
          </S.Button>
        </S.InputGroup>
      </S.Section>

      <S.Section>
        <h4>즐겨찾기 추가</h4>
        <S.InputGroup>
          <S.Input
            type="number"
            placeholder="Cafe ID 입력"
            value={cafeId}
            onChange={(e) => setCafeId(e.target.value)}
          />
          <S.Button onClick={addFavorite}>추가하기</S.Button>
        </S.InputGroup>
      </S.Section>

      <S.Section>
        <h4>즐겨찾기 목록</h4>
        <S.List>
          {favorites && favorites.length > 0 ? (
            favorites.map((fav) => (
              <S.ListItem key={fav.cafeId}>
                카페 번호: {fav.cafeId}
                <S.Button
                  color="#e74c3c"
                  onClick={() => removeFavorite(fav.cafeId)}
                >
                  삭제
                </S.Button>
              </S.ListItem>
            ))
          ) : (
            <p>목록이 비어있습니다.</p>
          )}
        </S.List>
      </S.Section>
    </S.Container>
  );
};

export default FavoriteTest;
