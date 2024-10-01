import { Grid, Typography, Box, Button, Paper } from "@mui/material";
import { getImageUrl } from "themes/imageUtlis";
import { imagePlaceholder } from "lib/placeholders";

const FormStep2GalleryInfo = (props) => {
  const {
    steps, handleGallerySubmit, onSubmit, ImgStyled, ButtonStyled, ResetButtonStyled,
    handleBack, logo, handleInputImageChange, handleInputImageReset, instituteImage,
    handleInstituteImageChange, handleInstituteImageReset, galleryImages, setGalleryImages, Gallery
  } = props;

  const renderUploadSection = (image, handleImageChange, handleImageReset, label, id, dimensions, maxSize) => (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: "black" }}>{label}</Typography>
      <Typography variant="caption" sx={{ color: "black", mb: 2 }}>
        Image size should be {dimensions}. Max size {maxSize}.
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {!image ? (
          <ButtonStyled component="label" variant="contained" htmlFor={id}>
            Upload
            <input
              hidden
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleImageChange}
              id={id}
            />
          </ButtonStyled>
        ) : (
          <>
            <ImgStyled src={image ? getImageUrl(image) : imagePlaceholder} alt={label} sx={{ width: 200, height: 200, objectFit: 'cover', borderRadius: 4 }} />
            <Box>
              <ButtonStyled component="label" variant="contained" htmlFor={id} sx={{ mr: 2 }}>
                Change
                <input
                  hidden
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleImageChange}
                  id={id}
                />
              </ButtonStyled>
              <ResetButtonStyled color="secondary" variant="outlined" onClick={handleImageReset}>
                Reset
              </ResetButtonStyled>
            </Box>
          </>
        )}
      </Box>
    </Paper>
  );

  return (
    <form key={2} onSubmit={handleGallerySubmit(onSubmit)}>
      <Grid container spacing={4}>
        {/* Step Title */}
        <Grid item xs={12}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary', mb: 2 }}>
            {steps[1].title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
            {steps[1].subtitle}
          </Typography>
        </Grid>

        {/* Institute Logo Upload */}
        <Grid item xs={12} sm={6}>
          {renderUploadSection(logo, handleInputImageChange, handleInputImageReset, "Upload Institute Logo", "upload-logo", "200x200px", "800KB")}
        </Grid>

        {/* Institute Image Upload */}
        <Grid item xs={12} sm={6}>
          {renderUploadSection(instituteImage, handleInstituteImageChange, handleInstituteImageReset, "Upload Institute Image", "1280x720px", "1MB")}
        </Grid>

        {/* Gallery Upload */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>Upload Gallery</Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', mb: 2 }}>
              Upload three images. Each image max size 1MB.
            </Typography>
            <Gallery setGalleryImages={setGalleryImages} galleryImages={galleryImages} maxImages={3} />
          </Paper>
        </Grid>

        {/* Buttons */}
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
};

export default FormStep2GalleryInfo;
