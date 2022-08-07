import styled from "styled-components";

export const Wrapper = styled.div`
  .table {
    display: grid;
    width: 50%;
    margin: 10px auto;
    grid-template-columns: auto;
    grid-gap: 5px;
  }
  .row {
    display: grid;
    grid-template-columns: 50% 50%;
    color: black;
    background-color: white;
    border-radius: 5px;
    opacity: 0.7;
    :hover {
      opacity: 0.9;
    }
  }
  .column {
    border: 1px solid black;
    padding: 5px;
    text-align: center;
  }
  .header {
    font-weight: bold;
    font-size: 1.2em;
  }
`;
