'use client'
import { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import { useSession } from "next-auth/react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import Candidate from "@/app/(DashboardLayout)/components/dashboard/Candidates";
import Description from "@/app/(DashboardLayout)/components/dashboard/Desc";

const Dashboard = () => {
  const { data: session } = useSession(); // Access session data using useSession
  const [profileData, setProfileData] = useState({});
  const [voteData, setVoteData] = useState<any>({});

  useEffect(() => {
    if (session) {
      fetch("your api", {
        headers: {
          authorization: `Bearer ${session.user.data}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setProfileData(data.data);
          fetch(`your api/${data.data.vote_id}`, {
            headers: {
              authorization: `Bearer ${session.user.data}`,
            },
          })
            .then((response) => response.json())
            .then((voteData) => {
              setVoteData(voteData);
            })
            .catch((error) => {
              console.error("Error fetching vote data:", error);
            });
        })
        .catch((error) => {
          console.error("Error fetching profile data:", error);
        });
    }
  }, [session]); // Re-run effect when session changes

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Description voteData={voteData}/>
          </Grid>
          <Grid item xs={12}>
            <Candidate />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
