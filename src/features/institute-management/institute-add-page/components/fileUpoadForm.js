import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Grid, Typography, Box, Button, styled } from '@mui/material';
// Styled components
const DropzoneStyled = styled(Box)(({ theme }) => ({
  border: `2px dashed ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  textAlign: 'center',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const ImgStyled = styled('img')({
  width: 100,
  height: 100,
  borderRadius: '50%',
  objectFit: 'cover',
  marginRight: 16,
});

const ButtonStyled = styled(Button)({
  marginRight: 16,
});

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  color: theme.palette.error.main,
}));

export default function FileUploadForm({
  handleGallerySubmit,
  onSubmit,
  Gallery,
  logo,
  getImageUrl,
  handleInputImageChange,
  handleInputImageReset,
  instituteImage,
  handleInstituteImageChange,
  handleInstituteImageReset,
  setGalleryImages,
  galleryImages,
  handleBack,
}) {
  // Dropzone settings for the logo upload
  const { getRootProps: getLogoRootProps, getInputProps: getLogoInputProps } = useDropzone({
    accept: 'image/png, image/jpeg',
    maxSize: 800 * 1024, // 800KB
    onDrop: (acceptedFiles) => {
      handleInputImageChange(acceptedFiles);
    },
  });

  // Dropzone settings for the institute image upload
  const { getRootProps: getInstituteRootProps, getInputProps: getInstituteInputProps } = useDropzone({
    accept: 'image/png, image/jpeg',
    maxSize: 800 * 1024, // 800KB
    onDrop: (acceptedFiles) => {
      handleInstituteImageChange(acceptedFiles);
    },
  });

  return (
    <form key={2} onSubmit={handleGallerySubmit(onSubmit)}>
      <Grid container spacing={5}>
        {/* Logo Upload */}
        <Grid item xs={12} sm={6}>
          <Typography color="dark" sx={{ fontWeight: 600 }}>
            Upload Institute Logo
          </Typography>
          <Typography color="dark" sx={{ fontSize: 12, mb: 4 }}>
            Upload logo here
          </Typography>
          <DropzoneStyled {...getLogoRootProps()}>
            <input {...getLogoInputProps()} />
            {logo ? (
              <ImgStyled src={getImageUrl(logo)} alt="Logo" />
            ) : (
              <Typography>Drag & drop your logo here, or click to select files</Typography>
            )}
          </DropzoneStyled>
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
            <ButtonStyled variant="contained">Upload your Logo</ButtonStyled>
            <ResetButtonStyled variant="outlined" onClick={handleInputImageReset}>
              Reset
            </ResetButtonStyled>
          </Box>
          <Typography sx={{ mt: 1, color: 'text.disabled' }}>Allowed PNG or JPEG. Max size of 800K.</Typography>
        </Grid>

        {/* Institute Image Upload */}
        <Grid item xs={12} sm={6}>
          <Typography color="dark" sx={{ fontWeight: 600 }}>
            Upload Institute Image
          </Typography>
          <Typography color="dark" sx={{ fontSize: 12, mb: 4 }}>
            Upload Image here
          </Typography>
          <DropzoneStyled {...getInstituteRootProps()}>
            <input {...getInstituteInputProps()} />
            {instituteImage ? (
              <ImgStyled src={getImageUrl(instituteImage)} alt="Institute Image" />
            ) : (
              <Typography>Drag & drop your image here, or click to select files</Typography>
            )}
          </DropzoneStyled>
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
            <ButtonStyled variant="contained">Upload your Image</ButtonStyled>
            <ResetButtonStyled variant="outlined" onClick={handleInstituteImageReset}>
              Reset
            </ResetButtonStyled>
          </Box>
          <Typography sx={{ mt: 1, color: 'text.disabled' }}>Allowed PNG or JPEG. Max size of 800K.</Typography>
        </Grid>

        {/* Gallery Upload */}
        <Grid item xs={12}>
          <Typography color="dark" sx={{ fontWeight: 600 }}>
            Upload Gallery
          </Typography>
          <Typography color="dark" sx={{ fontSize: 12, mb: 4 }}>
            Upload Your Gallery
          </Typography>
          <Gallery setGalleryImages={setGalleryImages} galleryImages={galleryImages} />
        </Grid>

        {/* Form Actions */}
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outlined" color="secondary" onClick={handleBack}>
            Back
          </Button>
          <Button type="submit" variant="contained">
            Next
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
