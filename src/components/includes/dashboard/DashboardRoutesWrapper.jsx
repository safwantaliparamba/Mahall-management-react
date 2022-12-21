import React from 'react'
import styled from 'styled-components'
import DashboardHeader from './DashboardHeader'
import DashboardSideNav from './DashboardSideNav'

const DashboardRoutesWrapper = ({ children }) => {
    return (
        <>
            <DashboardHeader />
            <MainWrapper>
                <DashboardSideNav />
                <ChildWrapper>
                    {children}
                </ChildWrapper>
            </MainWrapper>
        </>
    )
}

export default DashboardRoutesWrapper

const ChildWrapper = styled.main`
    width: 84%;
    /* padding: 12px; */
    /* padding-top: 12px; */
    /* background-color: rgb(27 28 31); */
`

const MainWrapper = styled.section`
    width: 100%;
    display: flex;
    padding: 12px;
    padding-top: 0;
    gap: 12px;

    &>section{
        width: 16%;
    }
`