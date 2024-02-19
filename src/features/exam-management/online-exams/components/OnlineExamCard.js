import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
// import CardMedia from '@mui/material/CardMedia';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CustomChip from 'components/mui/chip';
import Icon from 'components/icon';
import { useState } from 'react';
import OnlineExamEditModal from './edit-OnlineExam/OnlineExamEditModal';

const OnlineExamCard = () => {
 // const [copiedIndex, setCopiedIndex] = useState(null);

 const cardData = [
    // Add your card data here
    // For example:
    {
      classname: 'Introduction to App',
      location: 'Kumbakonam',
      duration: '5hr',
      dateandtime: 'Sun Jun 26, 2024 / 10:00 am',
      image: 'https://www.shutterstock.com/image-photo/portrait-cheerful-male-international-indian-260nw-2071252046.jpg',
      avatar: '/images/avatars/1.png',
      friends: [
        'https://images.hindustantimes.com/rf/image_size_640x362/HT/p1/2015/03/18/Incoming/Pictures/1327679_Wallpaper2.jpg',
        'https://media.istockphoto.com/id/1272815911/photo/young-indian-female-university-student-stock-photo.jpg?s=612x612&w=0&k=20&c=Iwdc08GR3pw8_Qg3_nabNJUQYTo52EU3dvW4tsth1tE=',
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q=',
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q=',
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q='
      ]
    },
    {
      classname: 'Introduction to web',
      location: 'Kumbakonam',
      duration: '2hr',
      dateandtime: 'Sun Jun 26, 2024 / 10:00 am',
      image: 'https://www.shutterstock.com/image-photo/portrait-cheerful-male-international-indian-260nw-2071252046.jpg',
      avatar: '/images/avatars/1.png',
      friends: [
        'https://images.hindustantimes.com/rf/image_size_640x362/HT/p1/2015/03/18/Incoming/Pictures/1327679_Wallpaper2.jpg',
        'https://media.istockphoto.com/id/1272815911/photo/young-indian-female-university-student-stock-photo.jpg?s=612x612&w=0&k=20&c=Iwdc08GR3pw8_Qg3_nabNJUQYTo52EU3dvW4tsth1tE=',
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q=',
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q=',
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q='
      ]
    },
    {
      classname: 'Block chain',
      location: 'Kumbakonam',
      duration: '3.5hr',
      dateandtime: 'Sun Jun 26, 2024 / 10:00 am',
      image: 'https://www.shutterstock.com/image-photo/portrait-cheerful-male-international-indian-260nw-2071252046.jpg',
      avatar: '/images/avatars/1.png',
      friends: [
        'https://images.hindustantimes.com/rf/image_size_640x362/HT/p1/2015/03/18/Incoming/Pictures/1327679_Wallpaper2.jpg',
        'https://media.istockphoto.com/id/1272815911/photo/young-indian-female-university-student-stock-photo.jpg?s=612x612&w=0&k=20&c=Iwdc08GR3pw8_Qg3_nabNJUQYTo52EU3dvW4tsth1tE=',
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q=',
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q=',
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q='
      ]
    },
    {
      classname: 'Figma',
      location: 'Kumbakonam',
      duration: '5hr',
      dateandtime: 'Sun Jun 26, 2024 / 10:00 am',
      image: 'https://www.shutterstock.com/image-photo/portrait-cheerful-male-international-indian-260nw-2071252046.jpg',
      avatar: '/images/avatars/1.png',
      friends: [
        'https://images.hindustantimes.com/rf/image_size_640x362/HT/p1/2015/03/18/Incoming/Pictures/1327679_Wallpaper2.jpg',
        'https://media.istockphoto.com/id/1272815911/photo/young-indian-female-university-student-stock-photo.jpg?s=612x612&w=0&k=20&c=Iwdc08GR3pw8_Qg3_nabNJUQYTo52EU3dvW4tsth1tE=',
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q=',
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q=',
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q='
      ]
    },
    {
      classname: 'Analysis',
      location: 'Kumbakonam',
      duration: '1hr',
      dateandtime: 'Sun Jun 26, 2024 / 10:00 am',
      image: 'https://www.shutterstock.com/image-photo/portrait-cheerful-male-international-indian-260nw-2071252046.jpg',
      avatar: '/images/avatars/1.png',
      friends: [
        'https://images.hindustantimes.com/rf/image_size_640x362/HT/p1/2015/03/18/Incoming/Pictures/1327679_Wallpaper2.jpg',
        'https://media.istockphoto.com/id/1272815911/photo/young-indian-female-university-student-stock-photo.jpg?s=612x612&w=0&k=20&c=Iwdc08GR3pw8_Qg3_nabNJUQYTo52EU3dvW4tsth1tE=',
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q=',
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q=',
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q='
      ]
    }
    // Add more card data as needed
  ];


  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const handleEditClose = () => {
    setEditModalOpen(false);
  };
  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const handleCopyLink = (index) => {
    // You can implement the logic to copy the link here
    // For simplicity, let's just log the index to the console
    console.log(`Link copied for card at index ${index}`);
    // setCopiedIndex(index);
  };

  return (
    <Grid container spacing={2}>
      {cardData.map((card, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card sx={{ position: 'relative' }}>
            {/* <CardMedia sx={{ height: '12.625rem' }} image={card.image} />
            <Avatar
              alt={card.classname}
              src={card.avatar}
              sx={{
                width: 75,
                height: 75,
                left: '1.313rem',
                top: '10.28125rem',
                position: 'absolute',
                border: (theme) => `0.25rem solid ${theme.palette.common.white}`
              }}
            /> */}
            <CardContent>
              <Box
                sx={{
                  mt: 2.75,
                  mb: 1.85,
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ mr: 2, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h3">{card.classname}</Typography>
                  <Typography variant="body2">{card.location}</Typography>
                </Box>
                <Box>
                  <Button variant="contained">{card.duration}</Button>
                </Box>
              </Box>

              <Box sx={{ mb: 2.55 }}>
                <Typography variant="body2">{card.dateandtime}</Typography>
              </Box>
              <Box
                sx={{
                  gap: 2,
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <AvatarGroup max={4}>
                  {card.friends.map((friend, friendIndex) => (
                    <Avatar key={friendIndex} src={friend} alt={`Friend ${friendIndex + 1}`} />
                  ))}
                </AvatarGroup>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CustomChip rounded size="small" skin="light" color={'secondary'} label={'BATPATID00001'} />
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ mt: 1.75, alignItems: 'center' }}>
                  <input
                    type="text"
                    value={`Your Link Here - ${index}`} // Replace this with your actual link
                    readOnly
                    style={{ border: 'none', outline: 'none', backgroundColor: 'transparent' }}
                  />
                  <IconButton
                    onClick={() => handleCopyLink(index)}
                    sx={{ marginLeft: 'auto', color: 'primary.main' }}
                    aria-label="copy-link"
                  >
                    <FileCopyIcon />
                  </IconButton>
                </Box>

                <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', mt: 2 }}>
                  <IconButton onClick={() => handleEdit()} aria-label="capture screenshot" color="primary" sx={{ ml: 1 }}>
                    <Icon icon="tabler:edit" />
                  </IconButton>
                  <IconButton aria-label="capture screenshot" color="error">
                    <Icon icon="tabler:archive-filled" />
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
       <OnlineExamEditModal open={isEditModalOpen} handleEditClose={handleEditClose} />
    </Grid>
  );
}

export default OnlineExamCard







