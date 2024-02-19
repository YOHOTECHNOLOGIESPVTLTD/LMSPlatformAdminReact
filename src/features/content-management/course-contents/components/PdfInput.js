// ** React Imports
import { useState } from 'react';
// ** MUI Imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// ** Icon Imports
import Icon from 'components/icon';
// ** Third Party Imports
import Grid from '@mui/material/Grid';
import { useDropzone } from 'react-dropzone';

const CoursePdfInput = ({ setCourseNotePdf }) => {
  // ** State
  const [files, setFiles] = useState([]);
  // ** Hooks
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'file/*': ['.pdf']
    },
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles.map((file) => Object.assign(file)));
      setCourseNotePdf(acceptedFiles[0]);
    }
  });

  const renderMedia = () => {
    if (files.length) {
      return files.map((file) => <iframe title={file.name} key={file.name} src={URL.createObjectURL(file)} width="100%" height="500px" />);
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
      <Box {...getRootProps({ className: 'dropzone' })} sx={files.length ? { minHeight: 150 } : {}}>
        <input {...getInputProps()} />
        {renderMedia()}
      </Box>
    </Grid>
  );
};

export default CoursePdfInput;
