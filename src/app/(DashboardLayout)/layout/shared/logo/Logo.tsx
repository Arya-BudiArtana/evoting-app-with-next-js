import Link from "next/link";
import { styled, Typography } from "@mui/material";
import Image from "next/image";

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  return (
    <Typography mt="20px" mx={"10px"} variant="h2">E-Voting</Typography>
  );
};

export default Logo;
