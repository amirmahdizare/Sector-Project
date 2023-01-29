import React from 'react'

import { CategoryTitle } from 'components'

import { Box, Grid, Typography } from '@mui/material'
import { CourseCard } from 'components'
import { GridSearchIcon } from 'Sui_Icons'

import { Swiper, SwiperSlide } from "swiper/react";
import {Pagination } from "swiper";
import { useEffect , useState } from "react";
import { useParams } from "react-router";
import useHttp from "../../../../hooks/use-http";
import { Link } from "react-router-dom";

import style from './TopCourseContainer.module.scss'

let URL;
if (process.env.NODE_ENV === "production") {
    URL = `${process.env.REACT_APP_PRODUCTION_API_URL}`;
} else {
    URL = `${process.env.REACT_APP_DEVELOPMENT_API_URL}`;
}

export const TopCoursesContainer = () => {
    const { isLoading, sendRequest: fetchTopCourse } = useHttp();
    const [topCourse, setTopCourse] = useState([]);

    useEffect(() => {

        const fetchCourseHandler = (course) => {
            setTopCourse(course.data.TopCourses)
        };

        fetchTopCourse({ url: `/home/top_course_interactive` }, fetchCourseHandler);
    }, [fetchTopCourse]);


    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', boxSizing: 'border-box', mt: { xs: 4, lg: 1 } }}>

            <CategoryTitle
                Icon={GridSearchIcon}
                title={'آموزش های برتر'} />

            <Typography fontWeight={'regular'} sx={{ display: { xs: 'none', lg: 'block' }, mt: 2.5 }} fontSize={{ xs: 10, lg: 13 }} color='GrayText' >همین الان یادگیری رو شروع کن ،مسیر موفقیت رو طی کن</Typography>


            <Box maxWidth={'95%'} sx={{ mt: 3, borderRadius: 1, backgroundColor: '#F2F2F9', p: 3 , pt:4, display: { xs: 'none', lg: 'block' } }} >
                <Swiper
                    spaceBetween={10}
                    breakpoints={
                        {
                            320: {
                                slidesPerView: 1,
                            },
                            640: {
                                slidesPerView: 4
                            }

                        }
                    }

                    loop={true}
                    pagination={{
                        clickable: true,
                        bulletClass: style.bullet,
                        bulletActiveClass: style.activeBullet
                    }}
                    modules={[Pagination]}
                    className={style.paginationSwiper}
                >
                    {topCourse.map(course =>
                    <SwiperSlide>
                        <CourseCard 
                            img = {course.titleImage }
                            title = {course.title}
                            caption = {course.description} 
                            teacherName = {course.creator.fullName} 
                            teacherPhoto = {course.titleImage}
                            length = {parseInt(course.time)} 
                            price = {course.entranceFee} 
                            id = {course.id }
                        />
                    </SwiperSlide>)}
                </Swiper>
            </Box>

            <Grid container spacing={4} display={{ lg: 'none' }} sx={{mt:0}}>
                {topCourse.map(course => <Grid item xs={12}>
                    <CourseCard 
                        key={course.id}
                        img = {course.titleImage}
                        title = {course.title}
                        caption = {course.description} 
                        teacherName = {course.creator.fullName} 
                        teacherPhoto = {course.titleImage}
                        length = {parseInt(course.time)} 
                        price = {course.entranceFee} 
                        id = {course.id }
                     />
                </Grid>)}

            </Grid>

        </Box>
    )
}
