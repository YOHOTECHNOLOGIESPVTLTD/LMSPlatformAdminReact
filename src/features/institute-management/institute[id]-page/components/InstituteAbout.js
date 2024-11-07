import { Box, Container, Grid, Typography } from '@mui/material'
import React from 'react'


const InstituteAbout = () => {
  return (
    <Container sx={{justifyContent:"flex-start", marginLeft:"10px"}}>
      <Grid container spacing={2}  mb={4}>
        <Grid item xs={4} >
          <Typography variant="h4" gutterBottom sx={{ fontFamily: "Barlow Condensed", color: "#000", fontSize: "40px", fontWeight: 700, lineHeight: "normal",gap:"10px"}}>
            43
          </Typography>
          <Typography variant="subtitle1" sx={{ fontFamily: "Inter", color: "#000", fontSize: "14px", fontWeight: 700, lineHeight: "normal" }}>Teaching Staffs</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h4" gutterBottom sx={{fontFamily: "Barlow Condensed", color: "#000", fontSize: "40px", fontWeight: 700, lineHeight: "normal" }}>
            15
          </Typography>
          <Typography variant="subtitle1" sx={{ fontFamily: "Inter", color: "#000", fontSize: "14px", fontWeight: 700, lineHeight: "normal" }}>Courses</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h4" gutterBottom sx={{
            fontFamily: "Barlow Condensed", color: "#000", fontSize: "40px", fontWeight: 700, lineHeight: "normal" }}>
            500+
          </Typography>
          <Typography variant="subtitle1" sx={{ fontFamily: "Inter", color: "#000", fontSize: "14px", fontWeight: 700, lineHeight: "normal" }}>Live students</Typography>
        </Grid>
      </Grid>

      
      <Box mb={4}>
        <Typography variant="body1" color="textSecondary" paragraph sx={{ fontFamily: "Inter", color: "#000", fontSize: "14px", fontWeight: 400, lineHeight: "normal" }}>
          With over 30 years of experience, Rajalakshmi Institute offers cutting-edge programming and design courses. Our expert faculty delivers high-quality education both online and offline, ensuring students gain the skills needed to succeed in today’s dynamic industries. Join us and unleash your potential in a supportive learning environment tailored to your needs.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ fontFamily: "Poppins", color: "#000", fontSize: "14px", fontWeight: 700, lineHeight: "normal" }}>
          Vision
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph sx={{ fontFamily: "Poppins", color: "#000", fontSize: "14px", fontWeight: 400, lineHeight: "normal" }}>
          The vision of the institute is to provide quality higher education to the students of rural and tribal areas, aspiring to develop a global perspective in Information Technology and Management Education.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ fontFamily: "Poppins", color: "#000", fontSize: "14px", fontWeight: 700, lineHeight: "normal" }}>
          Mission
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph sx={{ fontFamily: "Poppins", color: "#000", fontSize: "14px", fontWeight: 400, lineHeight: "normal" }}>
          • To remain an outstanding provider of high-quality management and IT education to create proactive and excellent professionals. <br />
          • To impart quality education to students and mold them into responsible persons by raising their level of education and social status. <br />
          • To provide value-based education and ignite young minds to bring out the best in them. <br />
          • To make the students competent in the global scenario and become self-reliant.
        </Typography>
      </Box>
    </Container>
  );
};

export default InstituteAbout