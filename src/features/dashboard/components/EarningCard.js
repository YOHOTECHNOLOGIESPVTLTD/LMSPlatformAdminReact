import { Card, Box, Typography, Grid } from "@mui/material";

const EarningCard = () => {
  return (
    <Card
      sx={{
        p: 2,
        backgroundClip: "padding-box",
        boxShadow: "0 .25rem .875rem 0 rgba(38,43,67,.16)",
        maxHeight: { xs: "auto", sm: "180px" }, // Adjust height for small screens
        minWidth: { xs: "250px", sm: "300px", md: "290px" }, // Dynamic width based on screen size
        borderRadius: "12px",
      }}
    >
      <Grid container spacing={2} alignItems="center">
        {/* Earnings Info */}
        <Grid item xs={12} sm={6}>
          <Box>
            <Box sx={{ mb: 1 }}>
              <Typography
                variant="h6"
                fontWeight={500}
                sx={{ color: "#333", fontSize: { xs: "1rem", sm: "1.2rem" } }}
              >
                Earnings
              </Typography>
              <Typography
                component="p"
                sx={{
                  backgroundColor: "#e7e7ff",
                  color: "#666cff",
                  borderRadius: "50rem",
                  display: "inline-block",
                  px: 2,
                  py: 0.5,
                  fontSize: { xs: "0.75rem", sm: "0.85rem" },
                }}
              >
                Year of {new Date().getFullYear()}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="h4"
                fontWeight={600}
                sx={{ marginRight: ".5rem", fontSize: { xs: "1.5rem", sm: "2rem" } }}
              >
                8.14k
              </Typography>
              <Typography sx={{ color: "#72e128", fontSize: { xs: "0.85rem", sm: "1rem" } }}>
                +15.6%
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Image Section */}
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: "flex",
            justifyContent: { xs: "center", sm: "flex-end" },
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src="https://demos.pixinvent.com/materialize-html-admin-template/assets/img/illustrations/card-ratings-illustration.png"
            alt="earning illustration"
            sx={{
              maxWidth: "100%",
              height: "auto",
              width: { xs: "80px", sm: "120px" },
            }}
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default EarningCard;
