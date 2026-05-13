import styled from "styled-components";

const colorMap = {
  success: { bg: "#4caf50", hover: "#388e3c" },
  primary: { bg: "#2196f3", hover: "#1565c0" },
  danger: { bg: "#f44336", hover: "#c62828" },
};

export const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 30px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
  color: #333;
`;

export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;

  label {
    font-size: 14px;
    color: #555;
    white-space: nowrap;
  }
`;

export const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  width: ${({ $small }) => ($small ? "80px" : "120px")};
`;

export const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  width: 120px;
`;

export const CheckLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: #333;
  cursor: pointer;

  input[type="checkbox"] {
    cursor: pointer;
    width: 16px;
    height: 16px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 24px;
`;

export const Button = styled.button`
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  color: ${({ $color }) => ($color ? "white" : "#333")};
  background: ${({ $color }) => ($color ? colorMap[$color].bg : "#e0e0e0")};
  transition: background 0.2s;

  &:hover {
    background: ${({ $color }) =>
      $color ? colorMap[$color].hover : "#bdbdbd"};
  }
`;

export const ResultBox = styled.div`
  background: #f9f9f9;
  border-radius: 8px;
  padding: 16px;

  h3 {
    font-size: 16px;
    margin-bottom: 10px;
    color: #333;
  }
`;

export const Pre = styled.pre`
  background: #f5f5f5;
  padding: 12px;
  border-radius: 6px;
  overflow: auto;
  font-size: 13px;
  color: #333;
  max-height: 400px;
`;
