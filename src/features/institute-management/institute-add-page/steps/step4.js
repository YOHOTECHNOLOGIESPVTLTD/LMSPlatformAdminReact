import { Grid, Typography, Button, InputAdornment, Box } from '@mui/material';
import { Controller } from 'react-hook-form';
import { IconTax, IconId, IconCertificate } from '@tabler/icons-react';
import IconUpload from '@mui/icons-material/Upload';
import { PDFViewer } from 'react-view-pdf';
import { useEffect, useState } from 'react';
import { getImageUrl } from 'themes/imageUtlis';

const FormStep4DocumentsInfo = (props) => {
  const { steps, handleBack, onSubmit, hanldeDocSubmit, docControl, docsErrors, CustomTextField, hanldeDocsUpload, docReset,docs} = props;
  const [formData, setFormData] = useState({});
  // const [docs, setDocs] = useState({ gst: '', pan: '', licence: '' });

  useEffect(() => {
    const savedData = localStorage.getItem('docs_form');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);
      docReset(parsedData);
    }
  }, [docReset]);

  const handleFormChange = (name, value) => {
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };
      localStorage.setItem('docs_form', JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const handleFileUpload = (type, e) => {
    const file = e.target.files[0];
    if (file) {
      hanldeDocsUpload(type, e); 
      // setDocs((prev) => ({ ...prev, [type]: fileUrl }));
    }
  };
  console.log("Uploaded docs",docs)

  return (
    <form key={3} onSubmit={hanldeDocSubmit(onSubmit)}>
      <Grid container spacing={5}>
        <Grid item xs={12} textAlign="center">
          <Typography variant="h3" sx={{ fontWeight: 800, color: 'text.primary', mb: 2 }}>
            {steps[3].title}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 5 }} component="p">
            {steps[3].subtitle}
          </Typography>
        </Grid>

        {/* Group 1: GST Number and Document Upload */}
        <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
            GST Information
          </Typography>
          <Controller
            name="gst_number"
            control={docControl}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value || formData.gst_number}
                label="GST Number"
                onChange={(e) => {
                  onChange(e);
                  handleFormChange('gst_number', e.target.value);
                }}
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
            render={({ field: { onChange } }) => (
              <label>
                <input
                  type="file"
                  onChange={(e) => {
                    onChange(e.target.files[0]);
                    handleFileUpload('gst', e);
                  }}
                  accept=".pdf"
                  style={{ display: 'none' }}
                />
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<IconUpload />}
                  sx={{ textTransform: 'none', fontWeight: 500, width: '100%', height: 40, borderRadius: 2 }}
                >
                  Upload GST Document
                </Button>
              </label>
            )}
          />
          {docs.gst && (
            <Box sx={{ mt: 1 }}>
              <PDFViewer url={getImageUrl(docs.gst)
              } width="100%" height="400px" />
            </Box>
          )}
        </Grid>

        {/* Group 2: PAN Number and Document Upload */}
        <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
            PAN Information
          </Typography>
          <Controller
            name="pan_number"
            control={docControl}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value || formData.pan_number}
                label="PAN Number"
                onChange={(e) => {
                  onChange(e);
                  handleFormChange('pan_number', e.target.value);
                }}
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
                  onChange={(e) => {
                    onChange(e.target.files[0]);
                    handleFileUpload('pan', e);
                  }}
                  accept=".pdf"
                  style={{ display: 'none' }}
                />
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<IconUpload />}
                  sx={{ textTransform: 'none', fontWeight: 500, width: '100%', height: 40, borderRadius: 2 }}
                >
                  Upload PAN Document
                </Button>
              </label>
            )}
          />
          {docs.pan && (
            <Box sx={{ mt: 1 }}>
            <PDFViewer url={getImageUrl(docs.pan)
              } width="100%" height="400px" />
            </Box>
          )}
        </Grid>

        {/* Group 3: License Number and Document Upload */}
        <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
            License Information
          </Typography>
          <Controller
            name="licence_number"
            control={docControl}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value || formData.licence_number}
                label="License Number"
                onChange={(e) => {
                  onChange(e);
                  handleFormChange('licence_number', e.target.value);
                }}
                placeholder="Enter your License number"
                error={Boolean(docsErrors.licence_number)}
                helperText={docsErrors.licence_number?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconCertificate color="#3B4056" />
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
                  onChange={(e) => {
                    onChange(e.target.files[0]);
                    handleFileUpload('licence', e);
                  }}
                  accept=".pdf"
                  style={{ display: 'none' }}
                />
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<IconUpload />}
                  sx={{ textTransform: 'none', fontWeight: 500, width: '100%', height: 40, borderRadius: 2 }}
                >
                  Upload License Document
                </Button>
              </label>
            )}
          />
          {docs.licence && (
            <Box sx={{ mt: 1 }}>
            <PDFViewer url={getImageUrl(docs.license)
              } width="100%" height="400px" />
            </Box>
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