// ** MUI Imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import Icon from 'components/icon';
import { useEffect } from 'react';
// ** Custom Components Imports
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import ContentSkeleton from 'components/cards/Skeleton/ContentSkeleton';
import DeleteDialog from 'components/modal/DeleteModel';
import StatusDialog from 'components/modal/DeleteModel';
import CustomTextField from 'components/mui/text-field';
import OptionsMenu from 'components/option-menu';
import FaqAddDrawer from './FaqAddDrawer';
import FaqEdit from './FaqEdit';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import FaqTableHeader from './FaqTableHeader';

const useTimeout = (callback, delay) => {
  useEffect(() => {
    const timeoutId = setTimeout(callback, delay);

    return () => clearTimeout(timeoutId);
  }, [callback, delay]);
};

const FaqDataGrid = () => {
  const [value, setValue] = useState('');

  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState(null);
  const [statusOpen, setStatusDialogOpen] = useState(false);

  console.log(deletingItemId);
  const dispatch = useDispatch();

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
  };
  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);

  const handleStatusChange = () => {
    setStatusDialogOpen(true);
  };

  const handleDelete = (itemId) => {
    console.log('Delete clicked for item ID:', itemId);
    setDeletingItemId(itemId);
    setDeleteDialogOpen(true);
  };

  const toggleEditUserDrawer = () => {
    setEditUserOpen(!editUserOpen);
    console.log('Toggle drawer');
  };

  const studentCertificatesdata = [
    {
      id: 1,
      title: 'Introduction to JavaScript',
      description: 'Learn the basics of JavaScript programming language.',
      course_name: 'JavaScript Fundamentals',
      status: 'Active',
      file: 'intro_to_js.pdf'
    },
    {
      id: 2,
      title: 'Advanced JavaScript Concepts',
      description: 'Explore advanced concepts such as closures, prototypes, and async programming.',
      course_name: 'Advanced JavaScript',
      status: 'Active',
      file: 'advanced_js_notes.docx'
    },
    {
      id: 3,
      title: 'DOM Manipulation',
      description: 'Study how to interact with the Document Object Model (DOM).',
      course_name: 'Web Development with JavaScript',
      status: 'Inactive',
      file: 'dom_manipulation_video.mp4'
    },
    {
      id: 4,
      title: 'Node.js Basics',
      description: 'Get started with server-side JavaScript using Node.js.',
      course_name: 'Node.js Fundamentals',
      status: 'Active',
      file: 'nodejs_basics.txt'
    },
    {
      id: 5,
      title: 'React.js Fundamentals',
      description: 'Learn the basics of building user interfaces with React.js.',
      course_name: 'React.js for Beginners',
      status: 'Active',
      file: 'react_fundamentals.pdf'
    },
    {
      id: 6,
      title: 'JavaScript Design Patterns',
      description: 'Explore common design patterns used in JavaScript applications.',
      course_name: 'Design Patterns in JS',
      status: 'Active',
      file: 'js_design_patterns.doc'
    },
    {
      id: 7,
      title: 'Testing in JavaScript',
      description: 'Understand how to write tests for JavaScript code.',
      course_name: 'JavaScript Testing',
      status: 'Inactive',
      file: 'testing_in_js_video.mkv'
    },
    {
      id: 8,
      title: 'ES6 Features',
      description: 'Explore the features introduced in ECMAScript 6 (ES6).',
      course_name: 'Modern JavaScript',
      status: 'Active',
      file: 'es6_features_cheatsheet.pdf'
    },
    {
      id: 9,
      title: 'Web Development Best Practices',
      description: 'Learn best practices for building robust and maintainable web applications.',
      course_name: 'Web Dev Best Practices',
      status: 'Active',
      file: 'web_dev_best_practices.docx'
    },
    {
      id: 10,
      title: 'Asynchronous Programming in JavaScript',
      description: 'Understand how to work with asynchronous code in JavaScript.',
      course_name: 'Async JS',
      status: 'Inactive',
      file: 'async_programming_guide.txt'
    }
  ];

  // ** Hooks

  const columns = [
    {
      flex: 0.5,
      headerName: 'Id',
      field: 'employee_id',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
            {row?.id}
          </Typography>
        );
      }
    },
    {
      flex: 2.2,
      field: 'title',
      headerName: 'Faq Name',
      renderCell: ({ row }) => {
        return (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                sx={{
                  textAlign: 'justify',
                  fontSize: '15px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {row?.title}
              </Typography>
              <Typography noWrap sx={{ textAlign: 'justify', color: 'text.secondary', mt: 1.3, fontSize: '13px' }}>
                {row?.description}
              </Typography>
            </Box>
          </Box>
        );
      }
    },
    {
      flex: 1.5,
      field: 'Category',
      headerName: 'Category',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography noWrap sx={{ textAlign: 'justify', color: 'text.secondary', textTransform: 'capitalize' }}>
              {row?.course_name}
            </Typography>
          </Box>
        );
      }
    },
    {
      flex: 1,
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }) => {
        return (
          <div>
            <CustomTextField select defaultValue={row.status} onChange={(e) => handleStatusChange(e, row)}>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </CustomTextField>
          </div>
        );
      }
    },
    {
      flex: 1,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: () => (
        <Box sx={{ gap: 1 }}>
          <OptionsMenu
            menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
            iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
            options={[
              {
                // to: `/apps/invoice/edit/${row.id}`,
                text: 'Edit',
                icon: <Icon icon="tabler:edit" />,
                menuItemProps: {
                  onClick: () => {
                    toggleEditUserDrawer();
                  }
                }
              },
              {
                // to: `/apps/invoice/delete/${row.id}`,
                text: 'Delete',
                icon: <Icon icon="mdi:delete-outline" />,
                menuItemProps: {
                  onClick: () => {
                    handleDelete();
                  }
                }
              }
            ]}
          />
        </Box>
      )
    }
  ];

  const [loading, setLoading] = useState(true);

  useTimeout(() => {
    setLoading(false);
  }, 1000);

  const handleFilter = useCallback(
    async (val) => {
      try {
        setValue(val);
        const result = await searchUsers(val);
        if (result.success) {
          console.log('Search results:', result.data);
          dispatch(setUsers(result.data));
        } else {
          console.log(result.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch]
  );

  return (
    <>
      {loading ? (
        <ContentSkeleton />
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FaqTableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
          </Grid>
          <Grid item xs={12}>
            <Card>
              <DataGrid
                autoHeight
                rowHeight={80}
                rows={studentCertificatesdata}
                columns={columns}
                disableRowSelectionOnClick
                pageSizeOptions={[5, 10, 20]}
                paginationMode="client"
                pagination
                paginationModel={paginationModel}
                onPaginationModelChange={(model) => setPaginationModel(model)}
                onRowClick={handleRowClick}
              />
            </Card>
          </Grid>
          <FaqAddDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
          <FaqEdit open={editUserOpen} toggle={toggleEditUserDrawer} initialValues={selectedRow} />
          <DeleteDialog
            open={isDeleteDialogOpen}
            setOpen={setDeleteDialogOpen}
            description="Are you sure you want to delete this item?"
            title="Delete"
          />
          <StatusDialog
            open={statusOpen}
            setOpen={setStatusDialogOpen}
            description="Are you sure you want to Change Status"
            title="Status"
          />
        </Grid>
      )}
    </>
  );
};

export default FaqDataGrid;
