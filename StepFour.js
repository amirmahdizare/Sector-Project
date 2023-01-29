import React, { useRef, useState } from 'react'

import { Button, FormControl, FormControlLabel, Grid, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Switch, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AdapterJalali from '@date-io/date-fns-jalali';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import noImage from 'assets/images/dashboard/noImage.png'
import { SubmitButtons } from 'pages/Dashboard/components/SubmitButtons/SubmitButtons'
import { DescriptionTextField } from './components'
import { CloudCircle, DateRange, TimeToLeave } from '@mui/icons-material';
import SelectDatePopUp from './components/SelectDatePopUp';
import SelectTimeDuration from './components/SelectTimeDuration';
import { convertHourToPersianDigit } from 'utils';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

export const StepFour = ({ setStep }) => {

    const [startDateModalVisiblity, setStartDateModalVisiblity] = useState(false)

    const [endDateModalVisiblity, setEndDateModalVisiblity] = useState(false)

    const [duratioModal, setDurationModal] = useState(false)

    const courseImageRef = useRef()

    const [quizDetail, setCourseDetail] = useState({
        img: '',
        name: '',
        hardness: '',
        category: '',
        start_date: new Date(),
        duration: 63,
        end_date: new Date(),
        cups: null,
        relatedCourse: '',
        isCourseHasCertificate: false,
        description: ''
    })



    const handleChange = (item, value) => {
        setCourseDetail({ ...quizDetail, [item]: value })
    }

    const categories = [
        { title: 'امنیت', id: '1' },
        { title: 'شبکه', id: '2' },
        { title: 'کلاه سفید', id: '3' }
    ]

    const hardness = [
        { title: 'زیاد', id: 1 },
        { title: 'متوسط', id: 2 },
        { title: 'کم', id: 3 },
    ]

    const cups = [
        { title: 'یک کاپ', id: 1 },
        { title: 'دو کاپ', id: 2 },
        { title: 'سه کاپ', id: 3 },
    ]


    const relatedCourses = [
        { title: 'اموزش شبکه', id: 1 },
        { title: 'اموزش اینترنت', id: 2 },
        { title: 'اموزش امنیت', id: 3 },
    ]


    return (
        <Box>
            <Box sx={{
                borderRadius: 1.25,
                background: '#fff',
                display: 'flex',
                flexDirection: 'column',
                p: 2,
                m: 2
            }}>
                <Typography color='CaptionText' fontWeight='bold' fontSize={15}>برای ساخت آزمون اطلاعات زیر را تکمیل کنید</Typography>
                <Grid container spacing={3} rowSpacing={4} sx={{
                    my: 1,
                    '& .MuiGrid-item > .MuiBox-root  ': {
                        background: '#F5F9FF',
                        borderRadius: 1.25,
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderColor: '#E6EEFB',
                        p: 3
                    },
                    '& .MuiInputBase-root  ': {
                        background: '#F5F9FF',
                        borderRadius: 1.25,
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderColor: '#E6EEFB',
                    }
                    ,
                    '& .MuiFormLabel-root': {
                        color: '#B4C9E4',
                        fontSize: '15px',
                        '&.MuiInputLabel-shrink': {
                            color: '#656565 !important',
                            fontSize: '14px',
                            fontWeight: 600,
                            mt: -1.5
                        }
                    }



                }} >
                    <Grid item xs={12}>
                        <Box sx={{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: { xs: 'column', lg: 'row' },
                            justifyContent: 'space-between',
                            //width: '100%'
                        }}>
                            <Box sx={{
                                alignItems: 'center',
                                display: 'flex',
                                flexDirection: 'row',
                                '& img': { borderRadius: 1.25, height: '60px' }
                            }}>
                                <img src={quizDetail.img
                                    ? URL.createObjectURL(quizDetail.img)
                                    : noImage} />
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    mx: 2
                                }}>
                                    <Typography fontWeight='bold' fontSize={14} gutterBottom>
                                        تصویر آزمون
                                    </Typography>
                                    <Typography fontWeight='bold' color='grey.500' fontSize={14}>

                                        {!!quizDetail.img ? 'تصویر اضافه شد ، برای ویرایش  روی"ویرایش تصویر" کلیک کنید' : 'تصویر شاخص برای آزمون خود را اضافه کنید'}
                                    </Typography>
                                </Box>
                            </Box>

                            <Button color='primary' variant='outlined' onClick={() => courseImageRef.current.click()} sx={{ mt: { xs: 2, lg: 0 } }}>
                                <Typography color='primary.main' fontSize={14} fontWeight='bold'  >
                                    {!!quizDetail.img ? 'ویرایش تصویر' : ' افزودن تصویر'}


                                </Typography>
                                <input hidden type={'file'} ref={courseImageRef} onChange={(e) => setCourseDetail({ ...quizDetail, img: e.target.files[0] })} accept='image/*' />
                            </Button>

                        </Box>

                    </Grid>

                    <Grid item xs={12} lg={6}>

                        <TextField
                            onChange={({ target: { value } }) => handleChange('name', value)}
                            label="نام آزمون"
                            fullWidth
                            value={quizDetail.name}
                            variant="outlined"
                        />

                    </Grid>


                    <Grid item xs={12} lg={6}>

                        <FormControl fullWidth>
                            <InputLabel >میزان سختی</InputLabel>
                            <Select
                                value={quizDetail.hardness}
                                label="میزان سختی"
                                onChange={({ target: { value } }) => handleChange('hardness', value)}
                            >
                                {hardness.map(item => <MenuItem value={item.id}>{item.title}</MenuItem>)}
                            </Select>
                        </FormControl>

                    </Grid>

                    <Grid item xs={12} lg={6}>

                        <FormControl variant="outlined" fullWidth>
                            <InputLabel htmlFor="outlined-adornment-password">زمان شروع</InputLabel>
                            <OutlinedInput
                                onClick={() => setStartDateModalVisiblity(true)}
                                id="outlined-adornment-password"
                                value={(quizDetail.start_date).toLocaleString('fa-ir')}
                                fullWidth
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            edge="end"
                                            onClick={() => setStartDateModalVisiblity(true)}
                                        >
                                            <DateRange />
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="تاریخ شروع"
                            />
                        </FormControl>

                        <SelectDatePopUp
                            open={startDateModalVisiblity}
                            setOpen={setStartDateModalVisiblity}
                            value={quizDetail.start_date}
                            setValue={(value) => handleChange('start_date', value)}
                            text={'زمان شروع آزمون را مشخص کنید'}
                        />

                    </Grid>

                    <Grid item xs={12} lg={6}>

                        <FormControl variant="outlined" fullWidth>
                            <InputLabel >زمان پایان</InputLabel>
                            <OutlinedInput
                                value={(quizDetail.end_date).toLocaleString('fa-ir')}
                                onClick={() => setEndDateModalVisiblity(true)}
                                fullWidth
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            edge="end"
                                            onClick={() => setStartDateModalVisiblity(true)}
                                        >
                                            <DateRange />
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="تاریخ پایان"
                            />
                        </FormControl>

                        <SelectDatePopUp
                            open={endDateModalVisiblity}
                            setOpen={setEndDateModalVisiblity}
                            value={quizDetail.end_date}
                            setValue={(value) => handleChange('end_date', value)}
                            text={'زمان پایان آزمون را مشخص کنید'}

                        />

                    </Grid>

                    <Grid item xs={12} lg={6}>

                        <FormControl variant="outlined" fullWidth>
                            <InputLabel >مدت زمان آزمون</InputLabel>
                            <OutlinedInput
                                value={convertHourToPersianDigit(quizDetail.duration)}
                                onClick={() => setDurationModal(true)}
                                fullWidth
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            edge="end"
                                            onClick={() => setDurationModal(true)}
                                        >
                                            <AccessAlarmIcon />
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="مدت زمان آزمون"
                            />
                        </FormControl>

                        <SelectTimeDuration
                            open={duratioModal}
                            setOpen={setDurationModal}
                            setValue={(value) => handleChange('duration', value)}
                            value={quizDetail.duration}
                            text={'مدت زمان آزمون را انتخاب کنید'}
                        />
                    </Grid>



                    <Grid item xs={12} lg={6}>

                        <FormControl fullWidth>
                            <InputLabel >تعداد کاپ دریافتی</InputLabel>
                            <Select
                                value={quizDetail.cups}
                                label="تعداد کاپ دریافتی"
                                onChange={({ target: { value } }) => handleChange('cups', value)}
                            >
                                {cups.map(item => <MenuItem value={item.id}>{item.title}</MenuItem>)}
                            </Select>
                        </FormControl>

                    </Grid>

                    <Grid item xs={12} lg={6}>

                        <FormControl fullWidth>
                            <InputLabel >دسته بندی</InputLabel>
                            <Select
                                value={quizDetail.category}
                                label="دسته بندی"
                                onChange={({ target: { value } }) => handleChange('category', value)}
                            >
                                {categories.map(cat => <MenuItem value={cat.id}>{cat.title}</MenuItem>)}
                            </Select>
                        </FormControl>

                    </Grid>

                    <Grid item xs={12} lg={6}>

                        <FormControl fullWidth>
                            <InputLabel >آموزش مرتبط</InputLabel>
                            <Select
                                value={quizDetail.category}
                                label="آموزش مرتیط"
                                onChange={({ target: { value } }) => handleChange('relatedCourse', value)}
                            >
                                {relatedCourses.map(item => <MenuItem value={item.id}>{item.title}</MenuItem>)}
                            </Select>
                        </FormControl>

                    </Grid>






                    <Grid item xs={12} lg={12}>
                        <FormControlLabel dir='ltr'
                            sx={{ ml: 2 }}
                            control={<Switch
                                checked={quizDetail.isCourseHasCertificate}
                                onChange={({ target: { checked } }) => handleChange('isCourseHasCertificate', checked)}

                            />} label="دارای گواهینامه" />
                    </Grid>


                    <Grid item xs={12} lg={12}>

                        <DescriptionTextField
                            onChange={({ target: { value } }) => handleChange('description', value)}
                            value={quizDetail.description}

                        />
                    </Grid>

                </Grid>
            </Box>

            <SubmitButtons
                submitText={'ثبت اطلاعات'}
                submitCallback={() => setStep(step => step + 1)}
                cancelCallback={() => setStep(step => step - 1)}
                cancelText={'بازگشت'}
            />
        </Box >

    )
}
