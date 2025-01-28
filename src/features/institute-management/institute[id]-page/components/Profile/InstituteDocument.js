import React, { useState } from 'react';
import { Box, Dialog, Grid, IconButton, Link, Typography } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CloseIcon from '@mui/icons-material/Close';

const InstituteDocument = ({ institute }) => {
    const [open, setOpen] = useState(false);
    const [selectedPdf, setSelectedPdf] = useState(null);

    const documents = [
        { label: 'GST', name: 'GST Document' },
        { label: 'PAN', name: 'PAN Document' },
        { label: 'Institute License', name: 'License Document' },
    ];

    const handleOpen = (url) => {
        setSelectedPdf(url);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedPdf(null);
    };

    const gstDoc = institute?.docs?.gst || {};
    const panDoc = institute?.docs?.pan || {};
    const licenseDoc = institute?.docs?.license || {};

    return (
        <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: "white", borderRadius: '8px' }}>
            <Typography
                variant="h6"
                sx={{
                    mb: 4,
                    textAlign: 'center',
                    fontFamily: 'Poppins',
                    fontWeight: 700,
                    color: '#2d2b2c',
                }}
            >
                Institute Documents
            </Typography>
            <Grid container spacing={3}>
                {documents.map((doc, index) => {
                    const documentData =
                        doc.label === 'GST' ? gstDoc :
                        doc.label === 'PAN' ? panDoc :
                        licenseDoc;

                    return (
                        <Grid item key={index} xs={12} sm={6} md={4}>
                            <Box
                                sx={{
                                    p: 2,
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '8px',
                                    backgroundColor: '#fff',
                                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontFamily: 'Nunito Sans',
                                        fontWeight: 600,
                                        color: '#343a40',
                                    }}
                                >
                                    {doc.label}:
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontFamily: 'Nunito Sans',
                                        fontWeight: 400,
                                        color: '#6c757d',
                                        mb: 1,
                                    }}
                                >
                                    {documentData?.number || 'N/A'}
                                </Typography>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <PictureAsPdfIcon
                                        sx={{ fontSize: '18px', color: '#0249E9' }}
                                    />
                                    <Link
                                        sx={{
                                            color: '#0249E9',
                                            fontFamily: 'Nunito Sans',
                                            fontSize: '14px',
                                            fontWeight: 500,
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => handleOpen(documentData?.file)}
                                        underline="hover"
                                    >
                                        {doc.name}
                                    </Link>
                                </Box>
                            </Box>
                        </Grid>
                    );
                })}
            </Grid>

            {/* Dialog for displaying PDFs */}
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        p: 1,
                        backgroundColor: '#f1f3f5',
                    }}
                >
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box sx={{ p: 3 }}>
                    {selectedPdf ? (
                        <iframe
                            src={selectedPdf}
                            width="100%"
                            height="500px"
                            style={{
                                border: 'none',
                                boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.15)',
                                borderRadius: '8px',
                            }}
                            title="PDF Viewer"
                        />
                    ) : (
                        <Typography
                            variant="body1"
                            sx={{ textAlign: 'center', color: '#6c757d' }}
                        >
                            No PDF available to display.
                        </Typography>
                    )}
                </Box>
            </Dialog>
        </Box>
    );
};

export default InstituteDocument;
