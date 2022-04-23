import React, { Component } from 'react'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

export default class Header extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <SideNav
                onSelect={(selected) => {
                    const to = '/' + selected;
                    this.props.history.push(to);
                }}
            >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="admin/login">
                    <NavItem eventKey="admin/login">
                        <NavIcon>
                            <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Home
            </NavText>
                    </NavItem>
                    <NavItem eventKey="charts">
                        <NavIcon>
                            <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Charts
            </NavText>
                        <NavItem eventKey="charts/linechart">
                            <NavText>
                                Line Chart
                </NavText>
                        </NavItem>
                        <NavItem eventKey="charts/barchart">
                            <NavText>
                                Bar Chart
                </NavText>
                        </NavItem>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
        )
    }
}
