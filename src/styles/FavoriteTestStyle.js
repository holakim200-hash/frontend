import styled from "styled-components";

export const Container = styled.div`
  padding: 40px;
  max-width: 600px;
  margin: 0 auto;
  font-family: "Malgun Gothic", sans-serif;
`;

export const Section = styled.div`
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
`;

export const InputGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

export const Input = styled.input`
  padding: 8px;
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Button = styled.button`
  padding: 10px 15px;
  background-color: ${(props) => props.color || "#3498db"};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
`;

export const ListItem = styled.li`
  background: white;
  padding: 10px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
