import { Box, Typography, Input, styled } from '@mui/material';

// Styled component for the dashed border container
const FileContainer = styled('label')(({ theme }) => ({
  border: '2px dashed',
  borderColor: theme.palette.divider,
  borderRadius: '10px',
  aspectRatio: '4/1.5',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  padding: theme.spacing(2),
  textAlign: 'center',
  '&:hover': {
    borderColor: theme.palette.primary.main,
  },
}));

const LogoUpload = ({ onFileChange }) => {
  return (
    <Box >
      <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
        Thumbnail (400x250)
      </Typography>
      
      <FileContainer htmlFor="thumbnail">
        <Input
          type="file"
          id="thumbnail"
          hidden
          onChange={onFileChange}
        />
        <Box className="upload-placeholder" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <img src="/assets/images/icons/upload-file.svg" alt="file-icon" style={{ width: '32px', height: '32px' }} />
          <Typography variant="body2" sx={{ mt: 2 }}>
            Choose file
          </Typography>
        </Box>
      </FileContainer>
    </Box>
  );
};

export default LogoUpload;
