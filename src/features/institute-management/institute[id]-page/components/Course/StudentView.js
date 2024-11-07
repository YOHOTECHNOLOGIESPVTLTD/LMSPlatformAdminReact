import React, { useState } from 'react';
import { Card, CardContent, Typography, Avatar, Box, Grid, IconButton, Pagination } from '@mui/material';
import { styled } from '@mui/system';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SchoolIcon from '@mui/icons-material/School';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate } from 'react-router';

// Sample Student Data
const students = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    name: `Student ${i + 1}`,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgYYH4UY4O1TPt6UjjBxdftRdMYQjY-dFOcQ&s",
    course: "MernStack",
    batch: "2024",
    institute: "Patron Institute",
    email: `student${i + 1}@example.com`,
    phone: `+9188383995${i + 1}`,
    location: "Chennai, India",
}));

// Styled Components
const StyledCard = styled(Card)({
    width: 500,
    height: 300,
    margin: '20px auto',
    borderRadius: 15,
    background: 'linear-gradient(145deg,#d3eafd,#d3eafd)',
    boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.2), -5px -5px 10px #0CCE7F',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
        transform: 'scale(1.05)',
    },
});

const AvatarContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
});

const InfoRow = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
});

const CustomTypography = styled(Typography)({
    fontWeight: 500,
    fontSize: '1rem',
    color: '#4a4a4a',
});

const Header = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
});

// Main Component
const StudentView = () => {
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;
    const navigate = useNavigate();

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    // Pagination logic
    const paginatedStudents = students.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <Box sx={{ padding: 3 }}>
            <Header>
                <IconButton sx={{ mr: 2 }} color="primary" onClick={() => navigate(-1)}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h4"  sx={{ fontWeight: 700, flexGrow: 1 ,fontFamily:"Poppins",fontSize:'20px',color:'#000'}}>
                    Student Details
                </Typography>
            </Header>

            <Grid container spacing={3} justifyContent="flex-start">
                {paginatedStudents.map((student) => (
                    <Grid item xs={12} sm={6} md={4} key={student.id}>
                        <StyledCard>
                            <CardContent>
                                <AvatarContainer>
                                    <Avatar
                                        src={student.image}
                                        alt={student.name}
                                        sx={{ width: 80, height: 80, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' ,fontFamily:'Poppins',fontSize:'18px',fontWeight:400}}
                                    />
                                </AvatarContainer>

                                <Typography variant="h5" align="center" gutterBottom sx={{ color: '#3a3a3a', fontFamily: 'Poppins', fontSize: '18px', fontWeight:500}}>
                                    {student.name}
                                </Typography>

                                <Typography variant="subtitle1" align="center" sx={{ fontFamily: 'Poppins', fontSize: '16px', fontWeight: 500 ,color:'#000'}}>
                                    {student.course} - {student.batch}
                                </Typography>

                                <Box mt={2}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <InfoRow>
                                        <SchoolIcon color="primary" />
                                        <CustomTypography sx={{ fontFamily: 'Poppins', fontSize: '20px', fontWeight: 500, color: '#000' }}>{student.institute}</CustomTypography>
                                    </InfoRow>
                                    <InfoRow>
                                        <EmailIcon color="secondary" />
                                        <CustomTypography sx={{ fontFamily: 'Poppins', fontSize: '20px', fontWeight: 500, color: '#000' }}>{student.email}</CustomTypography>
                                    </InfoRow>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <InfoRow>
                                        <PhoneIcon color="action" />
                                        <CustomTypography sx={{ fontFamily: 'Poppins', fontSize: '20px', fontWeight: 500, color: '#000' }}>{student.phone}</CustomTypography>
                                    </InfoRow>
                                    <InfoRow>
                                        <LocationOnIcon color="error" />
                                        <CustomTypography sx={{ fontFamily: 'Poppins', fontSize: '20px', fontWeight: 500, color: '#000' }}>{student.location}</CustomTypography>
                                    </InfoRow>
                                    </Box>
                                </Box>
                            </CardContent>

                            {/* <CardActions sx={{ justifyContent: 'center', paddingBottom: 2 }}>
                                <Tooltip title="View Details" arrow>
                                    <Button variant="contained" color="primary" sx={{ borderRadius: 20, fontWeight: 'bold' }}>
                                        View Profile
                                    </Button>
                                </Tooltip>
                                <Tooltip title="Contact" arrow>
                                    <Button variant="outlined" color="secondary" sx={{ borderRadius: 20, fontWeight: 'bold' }}>
                                        Message
                                    </Button>
                                </Tooltip>
                            </CardActions> */}
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>

            {/* Pagination Control */}
            <Box display="flex" justifyContent="center" mt={4}>
                <Pagination
                    count={Math.ceil(students.length / itemsPerPage)}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    shape="rounded"
                />
            </Box>
        </Box>
    );
};

export default StudentView;
