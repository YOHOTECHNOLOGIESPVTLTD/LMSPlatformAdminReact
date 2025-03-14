import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Card, CardMedia, CardContent, Grid, Divider, Chip, Button, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "../../../../assets/images/subscription/check.png"; 

const ViewPlan = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const plan = location.state?.plans;

  console.log("Plan Data:", plan);

  if (!plan) {
    return <Typography variant="h6" textAlign="center" mt={5}>No plan details available.</Typography>;
  }

  const generatePlanDetails = () => {
    const maxUsers = plan?.max_users || "Unlimited";
    const billingCycle = plan?.billing_cycle || "Monthly";
    const price = plan?.price || "0";
    const featureCount = plan?.features ? Object.keys(plan.features).length : 0;
    const hasUnlimited = Object.values(plan?.features || {}).some((f) => f?.is_unlimited === "1");

    let description = `This subscription plan is designed for users looking for flexibility and efficiency. With a ${billingCycle} billing cycle, 
    it ensures predictable payments while providing scalable features.`;

    if (hasUnlimited) {
      description += ` This plan includes unlimited access to key resources, making it perfect for users needing 
      unrestricted access to ${featureCount > 5 ? "multiple advanced features" : "essential features"}.`;
    } else {
      description += ` The plan supports up to ${maxUsers} users, allowing for structured and efficient management.`;
    }

    if (parseFloat(price) > 0) {
      description += ` With a competitive price of $${price} per month, it offers great value for its features.`;
    } else {
      description += ` This plan is completely free, making it an excellent choice for those looking to explore the platform without financial commitment.`;
    }

    return description;
  };

  const featureList = plan?.features?.map((feature, index) => ({
    label: feature.feature?.identity || feature.feature || `Feature ${index + 1}`,
    count: feature.count || "Unlimited"
  })) || [];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden", 
        p: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box width="100%" sx={{ mb: 2, px: 2, display: "flex", justifyContent: "flex-start" }}>
        <Button
          startIcon={<ArrowBackIcon />}
          variant="outlined"
          color="primary"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </Box>

      <Card
        sx={{
          width: "100%",
          maxWidth: "1200px", 
          border: "1px solid #ddd",
          borderRadius: 3,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fafafa",
        }}
      >
        <CardMedia
          component="img"
          height="300"
          image={plan?.image ? `http://localhost:3000/${plan.image}` : "https://www.charitycomms.org.uk/wp-content/uploads/2019/02/placeholder-image-square.jpg"}
          alt="Plan Image"
          sx={{ objectFit: "cover", width: "100%", borderRadius: "8px 8px 0 0" }}
          onError={(e) => (e.target.src = "https://www.charitycomms.org.uk/wp-content/uploads/2019/02/placeholder-image-square.jpg")}
        />

        <CardContent sx={{ px: 3, py: 4 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              {plan?.identity || "N/A"}
            </Typography>
            {plan?.is_popular && <Chip label="Popular Plan" color="success" sx={{ fontWeight: "bold" }} />}
          </Stack>
          <Typography variant="body1" sx={{ color: "text.secondary", mt: 1 }}>
            {plan?.description || "No description available."}
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            Plan Overview
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}><Typography variant="body1"><strong>Price:</strong> ${plan?.price || "0"} / month</Typography></Grid>
            <Grid item xs={6}><Typography variant="body1"><strong>Status:</strong> {plan?.is_active === "1" ? "Active" : "Inactive"}</Typography></Grid>
            <Grid item xs={6}><Typography variant="body1"><strong>Max Users:</strong> {plan?.max_users || "Unlimited"}</Typography></Grid>
            <Grid item xs={6}><Typography variant="body1"><strong>Billing Cycle:</strong> {plan?.billing_cycle || "Monthly"}</Typography></Grid>
            <Grid item xs={6}><Typography variant="body1"><strong>Created On:</strong> {plan?.created_at ? new Date(plan.created_at).toLocaleDateString() : "N/A"}</Typography></Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>Features Included</Typography>
          <Grid container spacing={1}>
            {featureList.map((feature, index) => (
              <Grid item xs={6} key={index}>
                <Typography variant="body1">
                  <img src={CheckIcon} alt="✔" width={16} height={16} style={{ marginRight: 5 }} />
                  {feature.label}: <strong>{feature.count}</strong>
                </Typography>
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>Why Choose This Plan?</Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", mb: 2 }}>
            {generatePlanDetails()}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ViewPlan;
