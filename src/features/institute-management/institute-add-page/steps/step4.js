import { Grid, Typography, Button, InputAdornment, Box } from "@mui/material";
import { Controller } from "react-hook-form";
import { IconTax, IconId, IconCertificate } from '@tabler/icons-react';
import IconUpload from '@mui/icons-material/Upload';
import { PDFViewer } from "react-view-pdf";
import { getImageUrl } from "themes/imageUtlis";

const FormStep4DocumentsInfo = (props) => {
  const { steps, handleBack, onSubmit, hanldeDocSubmit, docControl, docsErrors, CustomTextField, hanldeDocsUpload, docs } = props;

  return (
    <form key={3} onSubmit={hanldeDocSubmit(onSubmit)}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
            {steps[3].title}
          </Typography>
          <Typography variant="body1" component={'p'} sx={{ mb: 2 }}>
            {steps[3].subtitle}
          </Typography>
        </Grid>

        {/* Group 1: GST Number and Document Upload */}
        <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>GST Information</Typography>
          <Controller
            name="gst_number"
            control={docControl}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                label="GST Number"
                onChange={onChange}
                placeholder="Enter your GST number"
                error={Boolean(docsErrors.gst_number)}
                helperText={docsErrors.gst_number?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconTax color="#3B4056" />
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
          <Controller
            name="gst_doc"
            control={docControl}
            rules={{ required: true }}
            render={({ field: { onChange } }) => (
              <label>
                <input
                  type="file"
                  onChange={(e) => { onChange(e.target.files); hanldeDocsUpload("gst", e); }}
                  accept=".pdf,.jpg,.png"
                  style={{ display: 'none' }}
                />
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<IconUpload />}
                  sx={{ textTransform: 'none', fontWeight: 500, width: "100%", height: 40, borderRadius: 2 }}
                >
                  Upload GST Document
                </Button>
              </label>
            )}
          />
          {docs.gst && (
            <Box sx={{ mt: 1 }}>
              <PDFViewer file={ getImageUrl(docs.gst)} width="100%" height="400px" /> 
            </Box>
          )}
          {docsErrors.gst_doc && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {docsErrors.gst_doc.message}
            </Typography>
          )}
        </Grid>

        {/* Group 2: PAN Number and Document Upload */}
        <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>PAN Information</Typography>
          <Controller
            name="pan_number"
            control={docControl}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                label="PAN Number"
                onChange={onChange}
                placeholder="Enter your PAN number"
                error={Boolean(docsErrors.pan_number)}
                helperText={docsErrors.pan_number?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconId color="#3B4056" />
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
          <Controller
            name="pan_doc"
            control={docControl}
            render={({ field: { onChange } }) => (
              <label>
                <input
                  type="file"
                  onChange={(e) => { onChange(e.target.files); hanldeDocsUpload("pan", e); }}
                  accept=".pdf,.jpg,.png"
                  style={{ display: 'none' }}
                />
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<IconUpload />}
                  sx={{ textTransform: 'none', fontWeight: 500, width: "100%", height: 40, borderRadius: 2 }}
                >
                  Upload PAN Document
                </Button>
              </label>
            )}
          />
          {docs.pan && (
            <Box sx={{ mt: 1 }}>
              <PDFViewer file={ getImageUrl(docs.pan)} width="100%" height="400px" /> {/* Preview PDF */}
            </Box>
          )}
          {docsErrors.pan_doc && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {docsErrors.pan_doc.message}
            </Typography>
          )}
        </Grid>

        {/* Group 3: License Number and Document Upload */}
        <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>License Information</Typography>
          <Controller
            name="licence_number"
            control={docControl}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                label="License Number"
                onChange={onChange}
                placeholder="Enter your License number"
                error={Boolean(docsErrors.licence_number)}
                helperText={docsErrors.licence_number?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconCertificate color='#3B4056' />
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
          <Controller
            name="licence_doc"
            control={docControl}
            render={({ field: { onChange } }) => (
              <label>
                <input
                  type="file"
                  onChange={(e) => { onChange(e.target.files); hanldeDocsUpload("licence", e); }}
                  accept=".pdf,.jpg,.png"
                  style={{ display: 'none' }}
                />
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<IconUpload />}
                  sx={{ textTransform: 'none', fontWeight: 500, width: "100%", height: 40, borderRadius: 2 }}
                >
                  Upload License Document
                </Button>
              </label>
            )}
          />
          {docs.licence && (
            <Box sx={{ mt: 1 }}>
              <PDFViewer file={ getImageUrl(docs.licence)} width="100%" height="400px" /> {/* Preview PDF */}
            </Box>
          )}
          {docsErrors.licence_doc && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {docsErrors.licence_doc.message}
            </Typography>
          )}
        </Grid>
      </Grid>

      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button variant="contained" color="secondary" onClick={handleBack} sx={{ height: 40 }}>
          Back
        </Button>
        <Button type="submit" variant="contained" sx={{ height: 40 }}>
          Next
        </Button>
      </Grid>
    </form>
  );
};

export default FormStep4DocumentsInfo;
