import { useCallback, useMemo } from 'react';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui

import { Card, Grid, Stack } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';

// components
import { RHFUploadSingleFile } from 'components/upload/RHUpload';
import FormProvider from 'features/course-management/add-course/components/FormProvider';
import CoursePdfInput from '../CoursePdfInput';

export default function CourseValidate({ setCourseLogo, setCourseTemplate, setCourseSyllabus }) {
  const NewProductSchema = Yup.object().shape({
    images: Yup.array().min(1, 'Images is required')
  });

  const defaultValues = useMemo(
    () => ({
      course_logo: [],
      course_template: ''
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues
  });

  const { reset, setValue, handleSubmit, watch } = methods;

  const values = watch();

  console.log(values);

  const onSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDropCourseLogo = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'course_logo',
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        );
        setCourseTemplate(file);
      }
    },
    [setValue]
  );
  const handleDropCourseTemplate = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'course_template',
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        );
        setCourseLogo(file);
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <div>
                <CardHeader title="Course Logo" />
                <RHFUploadSingleFile name="course_logo" accept="image/*" maxSize={3145728} onDrop={handleDropCourseLogo} />
              </div>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <div>
                <CardHeader title="Course Template" />
                <RHFUploadSingleFile name="course_template" accept="image/*" maxSize={3145728} onDrop={handleDropCourseTemplate} />
              </div>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <div>
                <CardHeader title="Course Syllabus" />
                <CoursePdfInput setCourseSyllabus={setCourseSyllabus} />
              </div>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
