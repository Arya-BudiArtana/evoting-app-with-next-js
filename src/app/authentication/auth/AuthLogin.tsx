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

import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";

interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {

  let Api = `http://127.0.0.1:8000/api/login`;

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [Error, setError] = useState(null)

  const UsernameRef = useRef<HTMLInputElement | null>(null)
  const PasswordRef = useRef<HTMLInputElement | null>(null)

  const router = useRouter();

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      username: UsernameRef.current?.value,
      password: PasswordRef.current?.value
    }
    fetch(Api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          console.log("Login successful!");
          router.push("/");
        } else {
          setError(response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <form onSubmit={handleFormSubmit}>
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
            value={username}
            inputRef={UsernameRef}
            onChange={(e:any) => setUsername(e.target.value)}
          />
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
            value={password}
            inputRef={PasswordRef}
            onChange={(e:any) => setPassword(e.target.value)} />
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
        >
          Sign In
        </Button>
      </Box>
    </form>
  )
};

export default AuthLogin;
