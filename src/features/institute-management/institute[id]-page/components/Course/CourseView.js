import React from "react";
import { styled } from "@mui/system";
import { Card, CardMedia, CardContent, Typography, Button, Grid, Avatar, Chip, AvatarGroup, Box } from "@mui/material";

import { useNavigate } from "react-router";

// Sample data (you can replace this with your dynamic data)
const courses = [
    {
        id: 1,
        title: "Java Full Stack",
        description: "By Rajalakshmi Institute",
        learners: 120,
        startDate: "09 Apr 24",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeJSO0DAPNNCxRRFyXKJCQ6ZD5xWRd4QXPBQ&s", // Replace with your image URL
    },
    {
        id: 2,
        title: "SQL Courses",
        description: "By Rajalakshmi Institute",
        learners: 120,
        startDate: "09 Apr 24",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR98GMV56tQOuDTws4MfY5VJTpO_lpzgnyC8w&s", // Replace with your image URL
    },
    {
        id: 3,
        title: "Digital Marketing",
        description: "By Rajalakshmi Institute",
        learners: 120,
        startDate: "09 Apr 24",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6OixYwhbf2wLBn-m-EyKZQcPT2GyruoRScg&s", // Replace with your image URL
    },
];

const StyledCard = styled(Card)(() => ({
    transition: "transform 0.3s, box-shadow 0.3s",
    borderRadius: "15px",
    border: "1px solid #CFCFCF",
    width: "380px",
    height: "400px",
    flexShrink: 0,
    background: "#FFF",
    "&:hover": {
        transform: "scale(1.05)",
        boxShadow: "0px 8px 10px rgba(0, 0, 0, 0.2)",
    },
}));

// Styled component for category chip
const CategoryChip = styled(Chip)(({ theme }) => ({
    position: "absolute",
    top: 1,
    left: 1,
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    fontWeight: "bold",
}));
const CourseView = () => {
    const navigate = useNavigate();

    const handleviewdetails = () =>{
        navigate('/courseview/course-overview/:id');
    }


    return (
        <Box sx={{ p: 4 }}>
            <Grid container spacing={3}>
                {courses.map((course) => (
                    <Grid item xs={12} sm={6} md={4} key={course.id}>
                        <StyledCard>
                            <Box sx={{ position: "relative" }}>
                                <CardMedia
                                    component="img"
                                    height="180"
                                    image={course.image}
                                    alt={course.title}
                                    sx={{
                                        borderRadius: "4px 4px 0 0",
                                    }}
                                />
                                {/* Category label */}
                                <CategoryChip label={course.category} />
                            </Box>
                            <CardContent sx={{ position: "relative", minHeight: "150px" }}>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <Typography gutterBottom variant="h6" component="div" sx={{ color: '#000', fontFamily: "Nunito Sans", fontSize: '16px', fontWeight: 600, lineHeight:'9.841px'}}>
                                        {course.title}
                                    </Typography>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <AvatarGroup max={4}>
                                            <Avatar alt="Learner 1" src="/static/images/avatar/1.jpg" sx={{ width: 30, height: 30, color: "#811876", fontFamily: "Plus Jakarta Sans", fontSize:'7px',fontWeight:500 }} />
                                            <Avatar alt="Learner 2" src="/static/images/avatar/2.jpg" sx={{ width: 30, height: 30, color: "#811876", fontFamily: "Plus Jakarta Sans", fontSize: '7px', fontWeight: 500 }} />
                                            <Avatar alt="Learner 3" src="/static/images/avatar/3.jpg" sx={{ width: 30, height: 30, color: "#811876", fontFamily: "Plus Jakarta Sans", fontSize: '7px', fontWeight: 500 }} />
                                            <Avatar alt="Learner 4" src="/static/images/avatar/4.jpg" sx={{ width: 30, height: 30, color: "#811876", fontFamily: "Plus Jakarta Sans", fontSize: '7px', fontWeight: 500 }} />
                                        </AvatarGroup>

                                        <Typography variant="caption" sx={{ ml: 1, color: '#141522', fontFamily:'Nunito Sans',fontSize:'12px',fontWeight:400}}>
                                            {course.learners}+ Learners
                                        </Typography>
                                    </Box>

                                </Box>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 ,color: '#000', fontFamily: 'Nunito Sans', fontSize: '18px', fontWeight: 700,lineHeight:'9px',marginTop:3 }}>
                                    {course.description}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: 1 }}>
                                <Typography variant="body2" sx={{ mt: 1 ,color:'#000',fontFamily:'Poppins',fontSize:'12px',fontWeight:700}}>
                                    Starting Date:
                                </Typography>
                                    <Typography variant="body2" sx={{ mt: 1, color: '#000', fontFamily: 'Poppins', fontSize: '12px', fontWeight: 400 }}>
                                    {course.startDate}
                                </Typography>
                                </Box>
                            </CardContent>
                            <Box sx={{ p: 2,}}>
                                <Button variant="contained" color="primary" sx={{ mb: "40px", justifyContent: "flex-start", borderRadius: "8px", background: "#002B38", fontFamily:"Poppins",fontSize:'14px',fontWeight:600 }} onClick={handleviewdetails}>
                                    View Details
                                </Button>
                            </Box>
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default CourseView;
