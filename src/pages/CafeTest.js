import { useState } from "react";
import axios from "axios";
import * as S from "../styles/CafeTestStyle";

const BASE_URL = "http://localhost:8111";
const getToken = () => localStorage.getItem("token");

const PET_TYPES = ["소형견", "중형견", "대형견", "고양이"];

function CafeTest() {
  const [result, setResult] = useState(null);
  const [regionId, setRegionId] = useState(1);
  const [cafeId, setCafeId] = useState(1);
  const [selectedPetTypes, setSelectedPetTypes] = useState([]);
  const [maxWeight, setMaxWeight] = useState("");

  const togglePetType = (type) => {
    setSelectedPetTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const getCafesByRegion = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/cafes`, {
        params: { regionId },
      });
      setResult(res.data);
    } catch (err) {
      setResult({ error: err.message });
    }
  };

  const searchCafes = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/cafes/search`, {
        params: {
          regionId,
          petTypes: selectedPetTypes.length > 0 ? selectedPetTypes : undefined,
          maxWeight: maxWeight || undefined,
        },
        paramsSerializer: (params) => {
          const searchParams = new URLSearchParams();
          Object.entries(params).forEach(([key, value]) => {
            if (Array.isArray(value)) {
              value.forEach((v) => searchParams.append(key, v));
            } else if (value !== undefined) {
              searchParams.append(key, value);
            }
          });
          return searchParams.toString();
        },
      });
      setResult(res.data);
    } catch (err) {
      setResult({ error: err.message });
    }
  };

  const getCafeDetail = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/cafes/${cafeId}`);
      setResult(res.data);
    } catch (err) {
      setResult({ error: err.message });
    }
  };

  const createCafe = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/cafes`,
        {
          regionId: 1,
          cafeName: "테스트 애견카페",
          address: "서울 강남구 테헤란로 123",
          phone: "02-1234-5678",
          description: "테스트용 카페입니다.",
          allowedPetTypes: "소형견,중형견",
          maxWeight: 15.0,
          latitude: 37.5065,
          longitude: 127.0536,
          naverMapUrl: "https://naver.me/test",
          imageUrls: [],
        },
        { headers: { Authorization: `Bearer ${getToken()}` } },
      );
      setResult(res.data);
    } catch (err) {
      setResult({ error: err.message });
    }
  };

  const updateCafe = async () => {
    try {
      const res = await axios.put(
        `${BASE_URL}/api/cafes/${cafeId}`,
        {
          cafeName: "테스트 애견카페",
          address: "서울 강남구 수정로 456",
          phone: "02-9999-9999",
          description: "수정된 카페입니다.",
          allowedPetTypes: "소형견,중형견,대형견",
          maxWeight: 20.0,
          naverMapUrl: "https://naver.me/updated",
        },
        { headers: { Authorization: `Bearer ${getToken()}` } },
      );
      setResult(res.data);
    } catch (err) {
      setResult({ error: err.message });
    }
  };

  const deleteCafe = async () => {
    try {
      const res = await axios.delete(`${BASE_URL}/api/cafes/${cafeId}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setResult(res.data);
    } catch (err) {
      setResult({ error: err.message });
    }
  };

  return (
    <S.Container>
      <S.Title>카페 API 테스트</S.Title>

      <S.InputGroup>
        <label>지역 ID</label>
        <S.Input
          type="number"
          value={regionId}
          onChange={(e) => setRegionId(e.target.value)}
        />
        <label>카페 ID</label>
        <S.Input
          type="number"
          value={cafeId}
          onChange={(e) => setCafeId(e.target.value)}
        />
      </S.InputGroup>

      <S.InputGroup>
        <label>반려동물 종류 (복수 선택)</label>
        {PET_TYPES.map((type) => (
          <S.CheckLabel key={type}>
            <input
              type="checkbox"
              checked={selectedPetTypes.includes(type)}
              onChange={() => togglePetType(type)}
            />
            {type}
          </S.CheckLabel>
        ))}
      </S.InputGroup>

      <S.InputGroup>
        <label>최대 몸무게 (kg)</label>
        <S.Input
          type="number"
          value={maxWeight}
          onChange={(e) => setMaxWeight(e.target.value)}
          placeholder="kg"
          $small
        />
      </S.InputGroup>

      <S.ButtonGroup>
        <S.Button onClick={getCafesByRegion}>지역별 카페 목록</S.Button>
        <S.Button onClick={searchCafes}>필터링 검색</S.Button>
        <S.Button onClick={getCafeDetail}>카페 상세 조회</S.Button>
        <S.Button $color="success" onClick={createCafe}>
          카페 등록 (ADMIN)
        </S.Button>
        <S.Button $color="primary" onClick={updateCafe}>
          카페 수정 (ADMIN)
        </S.Button>
        <S.Button $color="danger" onClick={deleteCafe}>
          카페 삭제 (ADMIN)
        </S.Button>
      </S.ButtonGroup>

      <S.ResultBox>
        <h3>결과</h3>
        <S.Pre>{JSON.stringify(result, null, 2)}</S.Pre>
      </S.ResultBox>
    </S.Container>
  );
}

export default CafeTest;
