import { Box, Text } from "rebass";
import { css } from "@emotion/react";

export default function Footer() {
  const footerStyle = css`
    border-top: 1px solid grey;
    padding: 0.5rem 0;
    text-align: center;
  `;
  return (
    <Box css={footerStyle}>
      <Text
        css={`
          font-size: 1.5rem;
        `}
      >
        Footer
      </Text>
    </Box>
  );
}
