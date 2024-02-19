// ** React Imports
// ** MUI Imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// ** Icon Imports
import Icon from 'components/icon';
// ** Third Party Imports
import Grid from '@mui/material/Grid';

const CoursePdfInput = ({ pdfUrl }) => {
  const renderMedia = () => {
    if (pdfUrl) {
      return <iframe title="PDF Viewer" src={pdfUrl} width="100%" height="500px" />;
    }

    return (
      <Box
        sx={{
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          border: 'dashed',
          p: 2,
          borderWidth: 0.5,
          my: 3
        }}
      >
        <Box
          sx={{
            mb: 5.75,
            width: 48,
            height: 48,
            display: 'flex',
            borderRadius: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: (theme) => theme.palette.primary.main,
            color: '#fff'
          }}
        >
          <Icon icon="tabler:upload" fontSize="1.75rem" />
        </Box>
        <Typography variant="h4" sx={{ mb: 2.5 }}>
          Drop files here or click to upload.
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>(This is just a demo drop zone. Selected files are not actually uploaded.)</Typography>
      </Box>
    );
  };

  return (
    <Grid>
      <Box sx={{ minHeight: 150 }}>{renderMedia()}</Box>
    </Grid>
  );
};

export default CoursePdfInput;
