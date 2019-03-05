import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;

  > div {
    height: 100% !important;
    width: 100% !important;

    > div {
      height: 100% !important;
      width: 100% !important;
    }
  }
`;

const CodeSurferSplit = ({ children, title, ...props }) => {
  return (
    <div {...props}>
      {title && title()}
      <Container>{children}</Container>
    </div>
  );
};

export default styled(CodeSurferSplit)`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
