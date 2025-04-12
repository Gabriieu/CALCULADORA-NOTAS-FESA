import styled from "styled-components";

export const HeaderStyle = styled.header`
  align-items: center;
  padding: 1rem;
  box-shadow: 0 0 12px black;
  border-bottom-left-radius: 9px;
  border-bottom-right-radius: 9px;
  margin-bottom: 20px;
  background-color: rgb(233, 232, 232);

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  img {
    width: 50px;
  }
`;
