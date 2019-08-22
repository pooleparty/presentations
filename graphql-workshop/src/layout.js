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

const Footer = styled.footer`
  font-size: 14px;
  color: white;
  padding: 30px 100px;
  text-align: right;
  width: 100vw;
  border-top: 1px solid #ff7f11;
  display: flex;
  justify-content: space-between;
`;

const Link = styled.a`
  color: #fff;
`;

const Layout = ({ children }) => (
  <Fragment>
    <Wrapper>{children}</Wrapper>
    <Footer>
      <span>
        <Link href="https://poole.haus" target="_blank">
          poole.haus
        </Link>
      </span>
      <span>
        <Link href="https://www.github.com/pooleparty" target="_blank">
          pooleparty
        </Link>
      </span>
    </Footer>
  </Fragment>
);

export default Layout;
