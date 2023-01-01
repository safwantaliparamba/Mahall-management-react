import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import dashboardIcon from "../../../assets/icons/dashboardIcon.png"
import dashboardIconHovered from "../../../assets/icons/dashboardIconHovered.png"
import customersIcon from "../../../assets/icons/usersIcon.png"
import customersIconHovered from "../../../assets/icons/usersIconHovered.png"
import housesIconHovered from "../../../assets/icons/houseIconHovered.png"
import housesIcon from "../../../assets/icons/houseIcon.png"
import employeesIconHovered from "../../../assets/icons/employeesIconHovered.png"
import employeesIcon from "../../../assets/icons/employeesIcon.png"
import membersIconHovered from "../../../assets/icons/membersIconHovered.png"
import membersIcon from "../../../assets/icons/membersIcon.png"
import financeIcon from "../../../assets/icons/financeIconHovered.png"
import financeIconHovered from "../../../assets/icons/financeIcon.png"


const DashboardSideNav = () => {
    const [hoveredNav, setHoveredNav] = useState('')
    const [activeNav, setActiveNav] = useState('')
    return (
        <SideBar>
            <Content>
                {/* <h1>Dashboard</h1> */}
                <ul>
                    <NavLink to="/dashboard/dashboard/" className={({ isActive }) => {
                        if (isActive) {
                            setActiveNav("DASHBOARD")
                            return "active"
                        }
                    }}
                        onMouseEnter={e => setHoveredNav("DASHBOARD")}
                        onMouseLeave={e => setHoveredNav('')}
                    >
                        <li>
                            <img src={hoveredNav === "DASHBOARD" || activeNav === "DASHBOARD" ? dashboardIconHovered : dashboardIcon} alt="" />
                            <span>Dashboard</span>
                        </li>
                    </NavLink>
                    <NavLink to="/dashboard/customers/"
                        className={({ isActive }) => {
                            if (isActive) {
                                setActiveNav("CUSTOMERS")
                                return "active"
                            }
                        }}
                        onMouseEnter={e => setHoveredNav("CUSTOMERS")}
                        onMouseLeave={e => setHoveredNav('')}
                    >
                        <li>
                            <img src={hoveredNav === "CUSTOMERS" || activeNav === "CUSTOMERS" ? customersIconHovered : customersIcon} alt="" />
                            Customers
                        </li>
                    </NavLink>
                    <NavLink to="/dashboard/houses/"
                        className={({ isActive }) => {
                            if (isActive) {
                                setActiveNav("HOUSES")
                                return "active"
                            }
                        }}
                        onMouseEnter={e => setHoveredNav("HOUSES")}
                        onMouseLeave={e => setHoveredNav('')}
                    >
                        <li>
                            <img src={hoveredNav === "HOUSES" || activeNav === "HOUSES" ? housesIconHovered : housesIcon} alt="" />
                            Houses
                        </li>
                    </NavLink>
                    <NavLink to="/dashboard/employees/"
                        className={({ isActive }) => {
                            if (isActive) {
                                setActiveNav("EMPLOYEES")
                                return "active"
                            }
                        }}
                        onMouseEnter={e => setHoveredNav("EMPLOYEES")}
                        onMouseLeave={e => setHoveredNav('')}
                    >
                        <li>
                            <img src={hoveredNav === "EMPLOYEES" || activeNav === "EMPLOYEES" ? employeesIconHovered : employeesIcon} alt="" />
                            Employees
                        </li>
                    </NavLink>
                    <NavLink to="/dashboard/members/"
                        className={({ isActive }) => {
                            if (isActive) {
                                setActiveNav("MEMBERS")
                                return "active"
                            }
                        }}
                        onMouseEnter={e => setHoveredNav("MEMBERS")}
                        onMouseLeave={e => setHoveredNav('')}
                    >
                        <li>
                            <img src={hoveredNav === "MEMBERS" || activeNav === "MEMBERS" ? membersIconHovered : membersIcon} alt="" />
                            Members
                        </li>
                    </NavLink>
                    <NavLink to="/dashboard/finances/"
                        className={({ isActive }) => {
                            if (isActive) {
                                setActiveNav("FINANCES")
                                return "active"
                            }
                        }}
                        onMouseEnter={e => setHoveredNav("FINANCES")}
                        onMouseLeave={e => setHoveredNav('')}
                    >
                        <li>
                            <img src={hoveredNav === "FINANCES" || activeNav === "FINANCES" ? financeIconHovered : financeIcon} alt="" />
                            Finances
                        </li>
                    </NavLink>
                </ul>
            </Content>
        </SideBar>
    )
}

export default DashboardSideNav


const SideBar = styled.section`
    /* position: fixed; */
    /* padding: 12px; */
    width: 20%;
    padding-top: 0;
    *{
        user-select: none;
    }
`

const Content = styled.aside`
    background-color: rgb(27 28 31);
    border: 1px solid rgb(38,39,42);
    height:calc(100vh - 110px);

    ul{
        padding-top: 36px;
        a{
            display: block;
            margin-bottom: 8px;

            li{
                border-radius: 8px;
                padding:  12px;
                padding-left: 48px;
                transition: all 0.8s ease-in-out;
                cursor: pointer;
                color: #9d9999;
                display: flex;
                align-items: center;
                gap: 12px;

            
            :hover{
                background-color: #4b1989;
                color: #fff;
            }
            }
            &.active{
                li{
                    background-color: #4b1989;
                    color: #fff;
                    border-radius: 8px;
                }
            }
        }
    }
`