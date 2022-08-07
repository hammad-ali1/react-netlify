import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;

  gap: 5px;
  color: var(--white);
  background: var(--darkGrey);
  border-radius: 20px;
  text-align: center;
  h3 {
    margin: 10px 0 0 0;
  }
  p {
    margin: 5px 0 0 0;
  }

  .image {
    height: 70%;
  }
  .details {
    padding: 10px;
    margin-bottom: 10px;
    height: 30%;
    text-overflow: ellipsis;
  }
`;

export const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  /* object-fit: contain; */
  margin: 0;
  border-radius: 20px 20px 0 0;
`;
