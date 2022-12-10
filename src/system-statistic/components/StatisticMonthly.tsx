import React from 'react'
import { styled } from '@mui/material/styles';

const ContentStyle = styled('div')(({ theme }) => ({
    minWidth: '100vh',
    margin: 'auto',
    minHeight: '150px',
    display: 'flex',
    justifyContent:'flex-start',
    flexDirection: 'row',
    padding: theme.spacing(8, 5),
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'
}));

const TotalMonthStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent:'space-evenly',
    flexDirection: 'column',
    minHeight: '100px',
    paddingRight:'200px'
}));

const Title =  styled('h1')(({ theme }) => ({
    fontSize: "20px",
    fontWeight: "700",
    color: "blueviolet",
}));

const Value =  styled('h1')(({ theme }) => ({
    fontSize: "30px",
    fontWeight: "700",
    color: "cadetblue",
}));

export default function StatisticMonthly() {
  return (
    <ContentStyle>
        <TotalMonthStyle>
           <Title>Doanh thu trong tháng</Title>
           <Value>2000000vnd</Value>
        </TotalMonthStyle>
        <TotalMonthStyle>
           <Title>Phần trăm giao động</Title>
           <Value>Tăng 20%
           </Value>
        </TotalMonthStyle>
    </ContentStyle>
  )
}
