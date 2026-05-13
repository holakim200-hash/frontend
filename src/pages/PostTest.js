import { useState } from "react";
import axios from "axios";
import * as S from "../styles/PostTestStyle";

const BASE_URL = "http://localhost:8111";
const getToken = () => localStorage.getItem("token");

const CLOUD_NAME = "dysywlkhr";
const UPLOAD_PRESET = "GGORI_IMAGE"; // Unsigned 모드여야 함

function PostTest() {
  const [result, setResult] = useState(null);
  const [postId, setPostId] = useState(1);
  const [commentId, setCommentId] = useState(1);
  const [userId, setUserId] = useState(1);
  const [title, setTitle] = useState("테스트 제목");
  const [content, setContent] = useState("테스트 내용입니다.");
  const [commentContent, setCommentContent] = useState("테스트 댓글입니다.");
  const [imageFiles, setImageFiles] = useState([]); // 배열로 초기화

  // 1. 게시글 목록 조회 (토큰 불필요)
  const getPostList = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/posts`);
      setResult(res.data);
    } catch (err) {
      setResult({ error: err.message });
    }
  };

  // 2. 게시글 상세 조회 (토큰 불필요)
  const getPostDetail = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/posts/${postId}`);
      setResult(res.data);
    } catch (err) {
      setResult({ error: err.message });
    }
  };

  // 추가: Cloudinary 업로드용 보조 함수
  const uploadToCloudinary = async () => {
    if (imageFiles.length === 0) return [];

    // 각 파일에 대해 업로드 요청을 생성
    const uploadPromises = imageFiles.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData,
      );
      return res.data.secure_url; // 각 업로드 결과 URL
    });

    // 모든 업로드가 완료될 때까지 기다림
    const urls = await Promise.all(uploadPromises);
    return urls; // ["url1", "url2", "url3"...] 형태의 배열 반환
  };

  // 3. 게시글 작성 (토큰 필요)
  const writePost = async () => {
    try {
      const urls = await uploadToCloudinary(); // 1. 이미지 먼저 올리고
      const res = await axios.post(
        `${BASE_URL}/api/posts`,
        {
          userId,
          title,
          content,
          imageUrls: urls, // 2. 받은 URL을 넣어서 백엔드 전송
        },
        { headers: { Authorization: `Bearer ${getToken()}` } },
      );
      setResult(res.data);
    } catch (err) {
      setResult({ error: err.message });
    }
  };

  // 4. 게시글 수정 (토큰 필요)
  const updatePost = async () => {
    try {
      const res = await axios.put(
        `${BASE_URL}/api/posts/${postId}`,
        {
          title: title + " (수정됨)",
          content: content + " (수정된 내용)",
          imageUrls: [],
        },
        { headers: { Authorization: `Bearer ${getToken()}` } },
      );
      setResult(res.data);
    } catch (err) {
      setResult({ error: err.message });
    }
  };

  // 5. 게시글 삭제 (토큰 필요)
  const deletePost = async () => {
    try {
      const res = await axios.delete(`${BASE_URL}/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setResult(res.data);
    } catch (err) {
      setResult({ error: err.message });
    }
  };

  // 6. 댓글 목록 조회 (토큰 불필요)
  const getComments = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/posts/${postId}/comments`);
      setResult(res.data);
    } catch (err) {
      setResult({ error: err.message });
    }
  };

  // 7. 댓글 작성 (토큰 필요)
  const writeComment = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/posts/${postId}/comments`,
        {
          userId,
          content: commentContent,
        },
        { headers: { Authorization: `Bearer ${getToken()}` } },
      );
      setResult(res.data);
    } catch (err) {
      setResult({ error: err.message });
    }
  };

  // 8. 댓글 삭제 (토큰 필요)
  const deleteComment = async () => {
    try {
      const res = await axios.delete(
        `${BASE_URL}/api/posts/${postId}/comments/${commentId}`,
        { headers: { Authorization: `Bearer ${getToken()}` } },
      );
      setResult(res.data);
    } catch (err) {
      setResult({ error: err.message });
    }
  };

  return (
    <S.Container>
      <S.Title>자유게시판 API 테스트</S.Title>

      <S.InputGroup>
        <label>유저 ID</label>
        <S.Input
          type="number"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          $small
        />
        <label>게시글 ID</label>
        <S.Input
          type="number"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
          $small
        />
        <label>댓글 ID</label>
        <S.Input
          type="number"
          value={commentId}
          onChange={(e) => setCommentId(e.target.value)}
          $small
        />
      </S.InputGroup>

      <S.InputGroup>
        <label>이미지 선택 (여러 장 가능)</label>
        <input
          type="file"
          multiple // 여러 개 선택 가능하게 함
          onChange={(e) => setImageFiles(Array.from(e.target.files))} // FileList를 배열로 변환
          accept="image/*"
        />
      </S.InputGroup>

      <S.InputGroup>
        <label>제목</label>
        <S.Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </S.InputGroup>

      <S.InputGroup>
        <label>내용</label>
        <S.Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </S.InputGroup>

      <S.InputGroup>
        <label>댓글 내용</label>
        <S.Input
          type="text"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
        />
      </S.InputGroup>

      <S.ButtonGroup>
        <S.Button onClick={getPostList}>게시글 목록</S.Button>
        <S.Button onClick={getPostDetail}>게시글 상세</S.Button>
        <S.Button $color="success" onClick={writePost}>
          게시글 작성
        </S.Button>
        <S.Button $color="primary" onClick={updatePost}>
          게시글 수정
        </S.Button>
        <S.Button $color="danger" onClick={deletePost}>
          게시글 삭제
        </S.Button>
      </S.ButtonGroup>

      <S.ButtonGroup>
        <S.Button onClick={getComments}>댓글 목록</S.Button>
        <S.Button $color="success" onClick={writeComment}>
          댓글 작성
        </S.Button>
        <S.Button $color="danger" onClick={deleteComment}>
          댓글 삭제
        </S.Button>
      </S.ButtonGroup>

      {result && result.post && (
        <S.InputGroup>
          <h3>🖼️ 게시글 이미지 ({result.post.imageUrls?.length || 0}개)</h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            {/* 백엔드 서비스에서 post.setImageUrls(images)로 담아주고 있음 */}
            {result.post.imageUrls && result.post.imageUrls.length > 0 ? (
              result.post.imageUrls.map((url, index) => (
                <div key={index}>
                  <img
                    src={url}
                    alt="첨부이미지"
                    style={{
                      width: "250px",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                    }}
                  />
                </div>
              ))
            ) : (
              <p>첨부된 이미지가 없습니다.</p>
            )}
          </div>
        </S.InputGroup>
      )}

      <S.ResultBox>
        <h3>결과</h3>
        <S.Pre>{JSON.stringify(result, null, 2)}</S.Pre>
      </S.ResultBox>
    </S.Container>
  );
}

export default PostTest;
