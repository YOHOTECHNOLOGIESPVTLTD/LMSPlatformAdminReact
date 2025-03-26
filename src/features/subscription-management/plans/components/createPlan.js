// ** React Imports
import { useState, Fragment } from "react";
// ** MUI Imports
import Dialog from "@mui/material/Dialog";
import { DialogContent, Grid, Typography, Box, IconButton, MenuItem } from "@mui/material";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import CustomTextField from "components/mui/text-field";
import { Controller, useForm } from "react-hook-form";
import { DialogActions } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import axios from "axios"; // For API calls

const CreatePlan = ({ handleDialogClose, open }) => {
  const [selectedImage, setSelectedImage] = useState("");
  const [imgSrc, setImgSrc] = useState("https://www.charitycomms.org.uk/wp-content/uploads/2019/02/placeholder-image-square.jpg");
  const [customFields, setCustomFields] = useState([]); 
  const [errorMessage, setErrorMessage] = useState("");

  const defaultValues = {
    plan_name: "",
    plan_description: "",
    plan_duration: "",
    plan_duration_type: "days",
    plan_price: "",
  };

  const { control, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues });

  const handleAddField = () => {
    setCustomFields([...customFields, { id: Date.now(), name: "", value: "" }]);
  };

  const handleRemoveField = (id) => {
    setCustomFields(customFields.filter((field) => field.id !== id));
  };

  const handleFieldChange = (id, key, value) => {
    setCustomFields(customFields.map((field) => (field.id === id ? { ...field, [key]: value } : field)));
  };

  const handleInputImageChange = (file) => {
    const reader = new FileReader();
    const { files } = file.target;
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result);
      setSelectedImage(files[0]);
      reader.readAsDataURL(files[0]);
    }
  };

  const onSubmit = async (data) => {
    setErrorMessage("");

    if (!data.plan_name || !data.plan_description || !data.plan_duration || !data.plan_price) {
      setErrorMessage("All required fields must be filled.");
      return;
    }

    const planData = {
      identity: data.plan_name,
      description: data.plan_description,
      duration: { value: data.plan_duration, unit: data.plan_duration_type },
      price: data.plan_price,
      image: selectedImage ? selectedImage.name : "",
      features: customFields.map((field) => ({
        name: field.name,
        count: field.value,
      })),
    };

    try {
      await axios.post("/api/plans", planData);
      alert("Plan created successfully!");
      reset();
      setCustomFields([]);
      handleDialogClose();
    } catch (error) {
      console.error("Error creating plan", error);
    }
  };

  return (
    <Fragment>
      <Dialog onClose={handleDialogClose} aria-labelledby="responsive-dialog-title" open={open} fullWidth maxWidth="sm">
        <DialogContent>
          {errorMessage && (
            <Box sx={{ color: "red", textAlign: "center", fontWeight: "bold", mb: 2 }}>{errorMessage}</Box>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <img src={imgSrc} alt="Profile Pic" style={{ width: 100, height: 100, borderRadius: 8, marginRight: 10 }} />
                <Button component="label" variant="contained">
                  Upload
                  <input hidden type="file" accept="image/png, image/jpeg" onChange={handleInputImageChange} />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="plan_name"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CustomTextField fullWidth label="Plan Name" {...field} error={!!errors.plan_name} helperText={errors.plan_name && "This field is required"} />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="plan_description"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CustomTextField fullWidth multiline rows={4} label="Plan Description" {...field} error={!!errors.plan_description} helperText={errors.plan_description && "This field is required"} />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="plan_duration"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CustomTextField fullWidth type="number" label="Duration" {...field} error={!!errors.plan_duration} helperText={errors.plan_duration && "This field is required"} />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="plan_duration_type"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CustomTextField fullWidth select label="Duration Type" {...field}>
                      <MenuItem value="days">Days</MenuItem>
                      <MenuItem value="months">Months</MenuItem>
                      <MenuItem value="year">Year</MenuItem>
                    </CustomTextField>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="plan_price"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CustomTextField fullWidth type="number" label="Price ($)" {...field} error={!!errors.plan_price} helperText={errors.plan_price && "This field is required"} />
                  )}
                />
              </Grid>
              {customFields.map((field) => (
                <Grid container item xs={12} spacing={2} key={field.id} alignItems="center">
                  <Grid item xs={5}>
                    <TextField fullWidth label="Feature Name" value={field.name} onChange={(e) => handleFieldChange(field.id, "name", e.target.value)} required />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField fullWidth label="Value" value={field.value} onChange={(e) => handleFieldChange(field.id, "value", e.target.value)} required />
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton color="error" onClick={() => handleRemoveField(field.id)}>
                      <RemoveCircleIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
              <Grid item xs={12}>
                <Button variant="outlined" startIcon={<AddCircleIcon />} onClick={handleAddField}>
                  Add Feature
                </Button>
              </Grid>
            </Grid>
            <DialogActions sx={{ justifyContent: "center", display: "flex" }}>
              <Button variant="tonal" color="error" onClick={handleDialogClose} sx={{ mx: 2 }}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit" sx={{ mx: 2 }}>
                Submit
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default CreatePlan;
