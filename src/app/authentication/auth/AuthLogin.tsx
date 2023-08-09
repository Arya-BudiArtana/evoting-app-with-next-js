import React from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
} from "@mui/material";
import Link from "next/link";
import { useState, useRef, FormEvent } from "react"
import { useRouter } from "next/navigation";
import { signIn } from 'next-auth/react';
import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";

const AuthLogin = () => {

  const UsernameRef = useRef("")
  const PasswordRef = useRef("")

  const router = useRouter();

  const onSubmit = async () => {
    const result = await signIn("credentials", {
      username: UsernameRef.current,
      password: PasswordRef.current,
      redirect: true,
      callbackUrl: "/"
    })
  }

  return (
    <>
      <Stack>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="username"
            mb="5px"
          >
            Username
          </Typography>
          <CustomTextField variant="outlined" fullWidth
            onChange={(e:any) => (UsernameRef.current = e.target.value)} />
        </Box>
        <Box mt="25px">
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
          >
            Password
          </Typography>
          <CustomTextField type="password" variant="outlined" fullWidth
          onChange={(e:any) => (PasswordRef.current = e.target.value)}/>
        </Box>
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          my={2}
        >
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Remeber this Device"
            />
          </FormGroup>
          <Typography
            component={Link}
            href="/"
            fontWeight="500"
            sx={{
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            Forgot Password ?
          </Typography>
        </Stack>
      </Stack>
      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
          onClick={onSubmit}
        >
          Sign In
        </Button>
      </Box>
    </>
  )
};

export default AuthLogin;
