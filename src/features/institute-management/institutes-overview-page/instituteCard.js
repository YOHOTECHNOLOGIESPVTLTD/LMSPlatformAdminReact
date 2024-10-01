import { Button, Grid, Typography, Box, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import CardBg from "../../../assets/images/dashboard/institute_card.svg";
import { getImageUrl } from "themes/imageUtlis";

const backgroundColors = [
  "#4A24E3",
  "#E36924",
  "#E33A24",
  "linear-gradient(112deg, #FED4B4 0%, #3BB9A1 100%)",
  "linear-gradient(112deg, #E77879 0%, #FBDDB3 100%)",
  "linear-gradient(112deg, #BAE8FB 0%, #B2B1FD 100%)",
  "linear-gradient(112deg, #6E8B75 0%, #D0C9C1 100%)",
  "linear-gradient(112deg, #6E8B75 0%, #9CD1EB 0.01%, #1D739F 100%, #D0C9C1 100%)",
  "#D14D72",
  "#4DD1A1",
  "#D1654D",
  "#000",
  "#6FD14D",
  "linear-gradient(248deg, #597D86 0%, #599DA9 32.81%, #89CBB9 57.81%, #BBEDDD 100%)",
  "linear-gradient(248deg, #0C2546 0%, #1B396C 29.17%, #586EBA 56.55%, #A7D7E7 93.23%)",
  "linear-gradient(248deg, #6C25FB 0%, #407DF2 29.17%, #3ACDDE 56.55%, #F2DEBC 93.23%)",
  "linear-gradient(248deg, #2DFFF5 0%, #28E7FD 29.17%, #1BA0FC 63.02%, #0B2BFB 100%)",
  "linear-gradient(248deg, #B3E2FE 0%, #B0B6FD 29.17%, #9DA1FB 56.55%, #A671FC 93.23%)",
  "url(<path-to-image>) lightgray 50% / cover no-repeat",
  "url(<path-to-image>) lightgray 50% / cover no-repeat",
  "url(<path-to-image>) lightgray 50% / cover no-repeat",
  "url(<path-to-image>) lightgray 50% / cover no-repeat",
  "url(<path-to-image>) lightgray 50% / cover no-repeat",
];

const InstituteCard = ({ institute, index }) => {
  const backgroundColor = backgroundColors[index] || "#ffffff"; 

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Box
        sx={{
          position: "relative",
          borderRadius: "16px",
          padding: "26px ",
          minWidth: "300px",
          minHeight: "200px",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden", 
        }}
      >
        <Box
          sx={{
            background: backgroundColor,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            opacity: 0.8, 
          }}
        />

        
        <Box
          sx={{
            backgroundImage: `url(${CardBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 2,
            opacity: 0.8, 
          }}
        />

        <Box sx={{ position: "relative", zIndex: 3 }}>
          <Box>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={4}>
                <Box sx={{ width: "93px", height: "43px" }}>
                  {/* <img
                    src={ institute?.image ? getImageUrl(institute?.image) : imagePlaceholder }
                    alt={institute?.institute_name}
                    width={"93px"}
                    height={"43px"}
                  /> */}
                  {
                    institute?.image ?
                    <Avatar 
                    src={ getImageUrl(institute?.image)}
                    alt={institute?.institute_name}
                    width={"93px"}
                    height={"43px"}
                  />
                  :
                  <Avatar 
                    width={"93px"}
                    height={"43px"}
                  >

                  </Avatar>
                  }
                </Box>
              </Grid>
              <Grid item xs={8} sx={{ display: "flex", gap: "15px", flexDirection : "column"}} >
                <Typography variant="body1" sx={{ fontWeight: 700, fontSize: "20px", wordWrap: "break-word", color: "white"}} >
                  {institute?.institute_name}
                </Typography>
                <Typography variant="body2">123 Main St, City</Typography>
                <Typography variant="body2">Branches: 5</Typography>
              </Grid>
            </Grid>
          </Box>

          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1">{institute?.subscription?.identity} - Plan</Typography>
            <Button
              component={Link}
              to={`/institute-management/institutes/${institute?.uuid}`}
              state={{ id: institute?.uuid }}
              sx={{
                mt: 1,
                padding : "6px 16px",
                backgroundColor: "white",
                color: "blueviolet",
                fontWeight: "bold",
              }}
            >
              View
            </Button>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default InstituteCard;
