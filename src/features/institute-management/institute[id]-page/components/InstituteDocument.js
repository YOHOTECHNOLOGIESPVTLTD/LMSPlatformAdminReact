import React, { useState } from 'react';
import { Box, Dialog, Grid, IconButton, Link, Typography } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CloseIcon from '@mui/icons-material/Close';

const InstituteDocument = ({ institute }) => {
    const [open, setOpen] = useState(false);
    const [selectedPdf, setSelectedPdf] = useState(null);

    // Define document data
    const documents = [
        { label: 'GST', name: 'GST' },
        { label: 'PAN', name: 'PAN PDF' },
        { label: 'Institute License', name: 'DL Photo PDF' },
    ];

    const handleOpen = (url) => {
        setSelectedPdf(url);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedPdf(null);
    };

    // Ensure the institute docs are available
    const gstDoc = institute?.docs?.gst || {};
    const panDoc = institute?.docs?.pan || {};
    const licenseDoc = institute?.docs?.license || {};

    return (
        <Box padding={4}>
            <Typography
                variant="body1"
                sx={{
                    mb: 3,
                    textAlign: 'center',
                    fontSize: '24px',
                    fontFamily: 'Poppins',
                    fontWeight: 700,
                    color: '#2d2b2c',
                }}
            >
                Documents:
            </Typography>
            <Grid container spacing={4}>
                {documents.map((doc, index) => {
                    // Dynamically access the document based on the label
                    const documentData =
                        doc.label === 'GST' ? gstDoc :
                            doc.label === 'PAN' ? panDoc :
                                licenseDoc;

                    return (
                        <Grid item key={index} xs={12} sm={6} md={4}>
                            <Box display="flex">
                                <Typography
                                    variant="body2"
                                    fontWeight="bold"
                                    sx={{
                                        mr: 1,
                                        color: '#848484',
                                        fontFamily: 'Nunito Sans',
                                        fontSize: '16px',
                                        fontWeight: 600,
                                    }}
                                >
                                    {doc.label}:
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        mr: 3,
                                        color: '#000',
                                        fontFamily: 'Nunito Sans',
                                        fontSize: '16px',
                                        fontWeight: 400,
                                    }}
                                >
                                    {documentData?.number || 'N/A'}
                                </Typography>
                            </Box>

                            <Box display="flex" alignItems="center" gap={1} mt={1}>
                                <PictureAsPdfIcon color="#0249E9" sx={{ fontSize: '15px' }} />
                                <Link
                                    sx={{ color: '#0249E9', cursor: 'pointer' }}
                                    onClick={() => handleOpen(documentData?.file)}
                                    underline="hover"
                                >
                                    {doc.name}
                                </Link>
                            </Box>
                        </Grid>
                    );
                })}
            </Grid>

            {/* Dialog for displaying PDF */}
            <Dialog open={open} onClose={handleClose} maxWidth="lg">
                <Box
                    display="flex"
                    justifyContent="flex-end"
                    sx={{ position: 'fixed' }} // Keeps the close icon fixed at the top-right
                >
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box p={5}>
                    {selectedPdf ? (
                        <iframe
                            src={selectedPdf}
                            width="400%"
                            height="500px"
                            style={{ border: 'none' }}
                            title="PDF Viewer"
                        />
                    ) : (
                        <Typography variant="body1">No PDF to display</Typography>
                    )}
                </Box>
            </Dialog>
        </Box>
    );
};

export default InstituteDocument;
