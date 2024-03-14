import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import AddGroupSkeleton from 'components/cards/Skeleton/AddGroupSkeleton';
import Icon from 'components/icon';
import { addGroup, getAllPermissions } from 'features/institute-management/institute[id]-page/user-management/groups-page/services/groupService';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';
import { addGroupYupSchema } from 'features/institute-management/institute[id]-page/user-management/groups-page/utills';

const GroupAddPage = () => {
  // State variables
  const [loading, setLoading] = useState(true);
  const [selectedCheckbox, setSelectedCheckbox] = useState([]);
  const [isIndeterminateCheckbox, setIsIndeterminateCheckbox] = useState(false);
  const [permissions, setPermissions] = useState([]);

  const navigate = useNavigate();

  // Fetch permissions on component mount
  useEffect(() => {
    getPermissions();
  }, []);

  // Default form values
  const defaultValues = {
    groupName: '',
    branch: []
  };

  // Form methods using react-hook-form
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(addGroupYupSchema)
  });

  // Function to handle form submission
  const onSubmit = useCallback(
    async (data) => {
      try {
        const inputData = {
          name: data.groupName,
          permissions: selectedCheckbox
        };
        const result = await addGroup(inputData);

        if (result.success) {
          navigate(-1);
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [selectedCheckbox, navigate]
  );

  // Function to toggle permission selection
  const togglePermission = useCallback(
    (id) => {
      const arr = selectedCheckbox;
      if (selectedCheckbox.includes(id)) {
        arr.splice(arr.indexOf(id), 1);
        setSelectedCheckbox([...arr]);
      } else {
        arr.push(id);
        setSelectedCheckbox([...arr]);
      }
    },
    [selectedCheckbox]
  );

  // Function to handle select all checkbox
  const handleSelectAllCheckbox = useCallback(() => {
    if (isIndeterminateCheckbox) {
      setSelectedCheckbox([]);
      setIsIndeterminateCheckbox(false);
    } else {
      permissions.forEach((screens) => {
        screens?.screens?.forEach((permissions) => {
          permissions?.permissions?.forEach((permission) => {
            togglePermission(permission.id);
          });
        });
      });
      setIsIndeterminateCheckbox(true);
    }
  }, [isIndeterminateCheckbox, permissions, togglePermission]);

  // Fetch permissions from API
  const getPermissions = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getAllPermissions();
      if (result.success) {
        setPermissions(result.data);
        setLoading(false);
      } else {
        console.log(result.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  // Render permissions table rows
  const renderPermissions = useMemo(() => {
    return permissions.map((module) =>
      module.screens.map((screen, index) => (
        <TableRow key={index} sx={{ '& .MuiTableCell-root:first-child': { pl: '0 !important' } }}>
          <TableCell
            sx={{
              fontWeight: 600,
              whiteSpace: 'nowrap',
              fontSize: (theme) => theme.typography.h6.fontSize
            }}
          >
            {screen.screen_name}
          </TableCell>
          {screen.permissions.map((permission, index) => (
            <TableCell key={index}>
              <FormControlLabel
                label={permission.name}
                sx={{ '& .MuiTypography-root': { color: 'text.secondary' } }}
                control={
                  <Checkbox
                    size="small"
                    id={`${index}-write`}
                    onChange={() => togglePermission(permission.id)}
                    checked={selectedCheckbox.includes(permission.id)}
                  />
                }
              />
            </TableCell>
          ))}
        </TableRow>
      ))
    );
  }, [permissions, selectedCheckbox, togglePermission]);

  return (
    <>
      {loading ? (
        <AddGroupSkeleton />
      ) : (
        <Card scroll="body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardHeader
              sx={{
                textAlign: 'center',
                px: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(5)} !important`],
                pt: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(8)} !important`]
              }}
              title="Add New Group"
              subheader="Set Group Permissions"
            ></CardHeader>
            <CardContent
              sx={{
                pb: (theme) => `${theme.spacing(5)} !important`,
                px: (theme) => [`${theme.spacing(3)} !important`, `${theme.spacing(5)} !important`]
              }}
            >
              <Grid sx={{ my: 4, gap: 2 }} container>
                <Grid item xs={12} sm={5.9}>
                  <Controller
                    name="groupName"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        fullWidth
                        value={value}
                        label="Group Name"
                        onChange={onChange}
                        placeholder="John Doe"
                        error={Boolean(errors.groupName)}
                        {...(errors.groupName && { helperText: errors.groupName.message })}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Typography variant="h4">Group Permissions</Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ pl: '0 !important' }}>
                        <Box
                          sx={{
                            display: 'flex',
                            whiteSpace: 'nowrap',
                            alignItems: 'center',
                            textTransform: 'capitalize',
                            '& svg': { ml: 1, cursor: 'pointer' },
                            color: (theme) => theme.palette.text.secondary,
                            fontSize: (theme) => theme.typography.h6.fontSize
                          }}
                        >
                          Administrator Access
                          <Tooltip placement="top" title="Allows a full access to the system">
                            <Box sx={{ display: 'flex' }}>
                              <Icon icon="tabler:info-circle" fontSize="1.25rem" />
                            </Box>
                          </Tooltip>
                        </Box>
                      </TableCell>
                      <TableCell colSpan={3}>
                        <FormControlLabel
                          label="Select All"
                          sx={{ '& .MuiTypography-root': { textTransform: 'capitalize', color: 'text.secondary' } }}
                          control={
                            <Checkbox
                              size="small"
                              onChange={handleSelectAllCheckbox}
                              indeterminate={isIndeterminateCheckbox}
                              checked={selectedCheckbox.length === permissions.length}
                            />
                          }
                        />
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>{renderPermissions}</TableBody>
                </Table>
              </TableContainer>
            </CardContent>
            <CardActions
              sx={{
                display: 'flex',
                justifyContent: 'center',
                px: (theme) => [`${theme.spacing(3)} !important`, `${theme.spacing(8)} !important`],
                pb: (theme) => [`${theme.spacing(5)} !important`, `${theme.spacing(8)} !important`]
              }}
            >
              <Box className="demo-space-x">
                <Button type="submit" variant="contained">
                  Submit
                </Button>
                <Button variant="tonal" sx={{ ml: 5 }} color="error" onClick={() => navigate(-1)}>
                  Cancel
                </Button>
              </Box>
            </CardActions>
          </form>
        </Card>
      )}
    </>
  );
};

export default GroupAddPage;
