import { yupResolver } from '@hookform/resolvers/yup';
// import CheckBoxIcon from '@mui/icons-material/CheckBox';
// import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
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
// import Autocomplete from '@mui/material/Autocomplete';
import AddGroupSkeleton from 'components/cards/Skeleton/AddGroupSkeleton';
import Icon from 'components/icon';
// import CustomChip from 'components/mui/chip';
import { getAllPermissions } from 'features/user-management/groups-page/services/groupService';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
// import toast from 'react-hot-toast';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router';
import * as yup from 'yup';

const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} field is required`;
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`;
  } else {
    return '';
  }
};

const schema = yup.object().shape({
  groupName: yup
    .string()
    .min(3, (obj) => showErrors('Group Name', obj.value.length, obj.min))
    .required(),
  // branch: yup.array().min(1, 'Select at least one Branch').required()
});

const defaultValues = {
  groupName: '',
  // branch: []
};

const useTimeout = (callback, delay) => {
  useEffect(() => {
    const timeoutId = setTimeout(callback, delay);

    return () => clearTimeout(timeoutId);
  }, [callback, delay]);
};

const GroupAddPage = () => {
  const [loading, setLoading] = useState(true);

  useTimeout(() => {
    setLoading(false);
  }, 1000);

  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const handleClose = () => {
    setValue('groupName', '');
    // setValue('branch', '');
    reset();
  };

  const [selectedCheckbox, setSelectedCheckbox] = React.useState([]);
  const [isIndeterminateCheckbox, setIsIndeterminateCheckbox] = React.useState(false);
  const [permissions, setPermissions] = React.useState([]);
  // const branches = useSelector((state) => state.auth.branches);
  // const navigate = useNavigate();

  // const onSubmit = async (data) => {
  //   try {
  //     const branchIds = data?.branch?.map((branch) => branch.branch_id);
  //     console.log(branchIds);
  //     const inputData = {
  //       branch_ids: branchIds,
  //       name: data.groupName,
  //       permissions: selectedCheckbox
  //     };
  //     const result = await addGroup(inputData);

  //     if (result.success) {
  //       navigate(-1);
  //       toast.success(result.message);
  //     } else {
  //       toast.error(result.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    if (selectedCheckbox.length > 0 && selectedCheckbox.length < permissions.length * 8) {
      setIsIndeterminateCheckbox(true);
    } else {
      setIsIndeterminateCheckbox(false);
    }
  }, [selectedCheckbox, permissions]);

  useEffect(() => {
    getPermissions();
  }, []);

  const handleSelectAllCheckbox = () => {
    if (isIndeterminateCheckbox) {
      setSelectedCheckbox([]);
    } else {
      permissions.forEach((screens) => {
        screens?.screens?.forEach((permissions) => {
          permissions?.permissions?.forEach((permission) => {
            togglePermission(permission.id);
          });
        });
      });
    }
  };

  const togglePermission = (id) => {
    const arr = selectedCheckbox;
    if (selectedCheckbox.includes(id)) {
      arr.splice(arr.indexOf(id), 1);
      setSelectedCheckbox([...arr]);
    } else {
      arr.push(id);
      setSelectedCheckbox([...arr]);
    }
  };

  const getPermissions = async () => {
    try {
      const result = await getAllPermissions();
      if (result.success) {
        setPermissions(result.data);
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderPermissions = () => {
    return permissions.map((module) =>
      module.screens.map((screen, index) => (
        <TableRow key={index} sx={{ '& .MuiTableCell-root:first-of-type': { pl: '0 !important' } }}>
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
  };

  return (
    <>
      {loading ? (
        <AddGroupSkeleton />
      ) : (
        <Card fullWidth maxWidth="md" scroll="body">
          <form onSubmit={handleSubmit()}>
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
                <Grid xs={12} sm={4}>
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
                {/* <Grid xs={12} sm={5.9}>
                  <Controller
                    name="branch"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => {
                      const branchesWithSelectAll = [{ branch_id: 'selectAll', branch_name: 'Select All' }, ...branches];
                      return (
                        <Autocomplete
                          multiple
                          disableCloseOnSelect
                          id="select-multiple-chip"
                          options={branchesWithSelectAll}
                          getOptionLabel={(option) => option.branch_name}
                          value={value}
                          onChange={(e, newValue) => {
                            if (newValue && newValue.some((option) => option.branch_id === 'selectAll')) {
                              onChange(branches.filter((option) => option.branch_id !== 'selectAll'));
                            } else {
                              onChange(newValue);
                            }
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              fullWidth
                              label="Branch"
                              error={Boolean(errors.branch)}
                              {...(errors.branch && { helperText: errors.branch.message })}
                              InputProps={{
                                ...params.InputProps,
                                style: { overflowX: 'auto', maxHeight: 55, overflowY: 'hidden' }
                              }}
                            />
                          )}
                          renderOption={(props, option, { selected }) => (
                            <li {...props}>
                              <Checkbox
                                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                checkedIcon={<CheckBoxIcon fontSize="small" />}
                                style={{ marginRight: 8 }}
                                checked={selected}
                              />
                              {option.branch_name}
                            </li>
                          )}
                          renderTags={(value) => (
                            <div style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', scrollbarWidth: 'none' }}>
                              {value.map((option, index) => (
                                <CustomChip
                                  key={option.branch_id}
                                  label={option.branch_name}
                                  onDelete={() => {
                                    const updatedValue = [...value];
                                    updatedValue.splice(index, 1);
                                    onChange(updatedValue);
                                  }}
                                  color="primary"
                                  sx={{ m: 0.75 }}
                                />
                              ))}
                            </div>
                          )}
                          isOptionEqualToValue={(option, value) => option.id === value.id}
                          selectAllText="Select All"
                          SelectAllProps={{ sx: { fontWeight: 'bold' } }}
                        />
                      );
                    }}
                  />
                </Grid> */}
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
                  <TableBody>{renderPermissions()}</TableBody>
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
                <Button variant="tonal" sx={{ ml: 5 }} color="error" onClick={handleClose}>
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
