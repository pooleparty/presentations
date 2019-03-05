import React from 'react';
import { CodeSurfer } from 'mdx-deck-code-surfer';
import styled from 'styled-components';

const CodeSurferCustom = ({ className, ...props }) => {
  return (
    <div className={className}>
      <CodeSurfer {...props} />
    </div>
  );
};

export default styled(CodeSurferCustom)`
  display: flex;
  justify-content: center;

  > div {
    height: 100% !important;
    width: 100% !important;

    > div {
      height: 100% !important;
      /* width: 100% !important; */
    }
  }
`;
