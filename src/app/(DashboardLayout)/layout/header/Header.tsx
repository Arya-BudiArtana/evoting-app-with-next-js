import React from 'react';
import { Box, AppBar, Toolbar, styled, Stack, IconButton, Badge, Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useSession } from "next-auth/react"
// components
import { useEffect, useState } from "react"
import Profile from './Profile';
import { IconBellRinging, IconMenu } from '@tabler/icons-react';
import { redirect, useRouter } from "next/navigation";

interface ItemType {
  toggleMobileSidebar: (event: React.MouseEvent<HTMLElement>) => void;
}

const Header = ({ toggleMobileSidebar }: ItemType) => {

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/authentication/login')
    }
  })

  const router = useRouter()
  const [profil, setProfil] = useState()

  const handleFetchProfile = async () => {
    if (!session) {
      return;
    }
    try {
      const res = await fetch('https://api-evoting.befind.id/api/profil', {
        method: 'GET',
        headers: {
          authorization: `Bearer ${session.user.data}`
        }
      });

      const response = await res.json();

      if (response.success) {
        setProfil(response.data.name);
      } else {
        router.push('/authentication/login');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  if (session?.user.success === false) {
    router.push('/authentication/login');
  } else {
    handleFetchProfile();
  }

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: '70px',
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline",
            },
          }}>

          <IconMenu width="20" height="20" />
        </IconButton>
        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          <Typography variant="h6">Hy, {profil}</Typography>
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
