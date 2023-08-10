import { useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

interface VoteData {
  voteData: {
    data?: {
      name: String,
      deskripsi: String
    }
  }
}

const Description = ({voteData}: VoteData) => {
  const title = voteData.data?.name ? `${voteData.data.name} - Quick Count` : 'Quick Count';
  return (
    <DashboardCard
      title={title}
    >
      <>
        <Typography variant="subtitle1" fontWeight="500" mt="10px">
        The following is the result of a quick count of the candidates who took part in the election for the "{voteData.data?.name}"
        </Typography>
      </>
    </DashboardCard>
  );
};

export default Description;
