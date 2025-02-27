import { Grid, Typography, Box, Button, Paper, IconButton } from "@mui/material";
import { useDropzone } from "react-dropzone"; // Import react-dropzone
import { getImageUrl } from "themes/imageUtlis";
import { Upload, Delete, ArrowBack, ArrowForward } from "@mui/icons-material";

const FormStep2GalleryInfo = (props) => {
  const {
    steps,
    handleGallerySubmit,
    onSubmit,
    handleBack,
    logo,
    handleInputImageChange,
    handleInputImageReset,
    instituteImage,
    handleInstituteImageChange,
    handleInstituteImageReset,
    galleryImages,
    setGalleryImages,
    Gallery,
  } = props;

  const {
    getRootProps: getLogoRootProps,
    getInputProps: getLogoInputProps,
  } = useDropzone({
    accept: "image/png, image/jpeg",
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        handleInputImageChange({ target: { files: acceptedFiles } });
      }
    },
  });

  const {
    getRootProps: getInstituteImageRootProps,
    getInputProps: getInstituteImageInputProps,
  } = useDropzone({
    accept: "image/png, image/jpeg",
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        handleInstituteImageChange({ target: { files: acceptedFiles } });
      }
    },
  });

  const renderUploadCard = (
    image,
    getRootProps,
    getInputProps,
    handleImageReset,
    label,
    id,
    dimensions,
    maxSize
  ) => {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
        <Box
          {...getRootProps()}
          sx={{
            width: 300,
            height: 200,
            border: "2px dashed #ccc",
            borderRadius: "16px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            cursor: "pointer",
            backgroundColor: "#f9f9f9",
            "&:hover": {
              borderColor: "#3f51b5",
            },
          }}
        >
          <input {...getInputProps()} id={id} />
          {image ? (
            <Box
              component="img"
              src={getImageUrl(image)}
              alt={label}
              sx={{ width: "100%", height: "100%", borderRadius: "16px", objectFit: "cover" }}
            />
          ) : (
            <>
              <Upload fontSize="large" sx={{ color: "#3f51b5", mb: 1 }} />
              <Typography variant="body2" sx={{ color: "#3f51b5" }}>
                Drag & drop or click to upload
              </Typography>
              <Typography variant="caption" sx={{ color: "#6b6b6b" }}>
                Image size: {dimensions}, Max: {maxSize}
              </Typography>
            </>
          )}
        </Box>

      
        {image && (
          <Box display="flex" gap={2}>
            <Button
              component="label"
              variant="contained"
              startIcon={<Upload />}
              htmlFor={id}
              onClick={(e) => e.stopPropagation()} 
            >
              Change
            </Button>
            <IconButton color="error" onClick={handleImageReset}>
              <Delete />
            </IconButton>
          </Box>
        )}
      </Box>
    );
  };

  return (
    <form key={2} onSubmit={handleGallerySubmit(onSubmit)}>
      <Grid container spacing={6}>
        {/* Step Title */}
        <Grid item xs={12} textAlign="center">
          <Typography variant="h3" sx={{ fontWeight: 800, color: "text.primary", mb: 3 }}>
            {steps[1].title}
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", mb: 5 }}>
            {steps[1].subtitle}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={4} sx={{ p: 4, borderRadius: 4, mb: 4 }}>
            <Grid container spacing={4} alignItems="center">
              
              <Grid item xs={12} md={4}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  Institute Logo
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  Upload your institute logo. Image size: 200x200px, Max: 800KB.
                </Typography>
              </Grid>

              <Grid item xs={12} md={8} display="flex" justifyContent="flex-end">
                {renderUploadCard(
                  logo,
                  getLogoRootProps,
                  getLogoInputProps,
                  handleInputImageReset,
                  "Institute Logo",
                  "upload-logo",
                  "200x200px",
                  "800KB"
                )}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={4} sx={{ p: 4, borderRadius: 4, mb: 4 }}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={4}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  Institute Image
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  Upload your institute image. Image size: 1280x720px, Max: 1MB.
                </Typography>
              </Grid>

              <Grid item xs={12} md={8} display="flex" justifyContent="flex-end">
                {renderUploadCard(
                  instituteImage,
                  getInstituteImageRootProps,
                  getInstituteImageInputProps,
                  handleInstituteImageReset,
                  "Institute Image",
                  "upload-institute",
                  "1280x720px",
                  "1MB"
                )}
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Group 3: Gallery Upload */}
        <Grid item xs={12}>
          <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={4}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  Gallery Upload
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  Upload up to three images, max size: 1MB each.
                </Typography>
              </Grid>

             
              <Grid item xs={12} md={8} display="flex" justifyContent="flex-end">
                <Gallery setGalleryImages={setGalleryImages} galleryImages={galleryImages} maxImages={3} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Navigation Buttons */}
        <Grid item xs={12} display="flex" justifyContent="space-between" mt={4}>
          <Button variant="outlined" color="secondary" startIcon={<ArrowBack />} onClick={handleBack}>
            Back
          </Button>
          <Button type="submit" variant="contained" endIcon={<ArrowForward />}>
            Next
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default FormStep2GalleryInfo;