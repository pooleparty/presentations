import React, { Fragment } from 'react';
import styled from 'styled-components';

const Wrapper = styled.main`
  /* width: 100vw; */
  max-width: 1200px;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  position: relative;
`;

const Layout = ({ children }) => (
  <Fragment>
    <Wrapper>{children}</Wrapper>
  </Fragment>
);

export default Layout;
