/* eslint-disable react/prefer-stateless-function */
/* eslint-disable max-classes-per-file */
import React from 'react';
import styled from 'styled-components';
import 'font-awesome/css/font-awesome.min.css';
import AlertModal from '../../models/alert.modal.component';
import { ReactComponent as HomeIcon } from '../../assets/home-alt.svg';
import { ReactComponent as TrendingIcon } from '../../assets/discovery-unselected.svg';
import { ReactComponent as CallsIcon } from '../../assets/casting-calls-icon.svg';
import { ReactComponent as SearchIcon } from '../../assets/talent-search.svg';
import { ReactComponent as MarketplaceIcon } from '../../assets/marketplace-naira.svg';
import { ReactComponent as MailIcon } from '../../assets/mail.svg';
import { ReactComponent as BellIcon } from '../../assets/bell.svg';
import { ReactComponent as CogIcon } from '../../assets/cog.svg';
import { ReactComponent as MainSearchIcon } from '../../assets/search.svg';
import { ReactComponent as DotsIcon } from '../../assets/dots.svg';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import { UserService } from '../../services/UserService';

const StyledSideNav = styled.div`   
    // position: fixed;     /* Fixed Sidebar (stay in place on scroll and position relative to viewport) */
    height: 100%;
    // width: 60px;     /* Set the width of the sidebar */
    // z-index: 1;      /* Stay on top of everything */
    // top: 2.6em;      /* Stay at the top */
    background-color: #fff; /* Black */
    overflow-x: hidden;     /* Disable horizontal scroll */
    padding-top: 10px;
    float: left;
`;

class SideNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePath: props.location.pathname,
            topIcons: [
                {
                  path: '/home', /* path is used as id to check which NavItem is active basically */
                  name: 'Home',
                  imgsrc: (<HomeIcon alt="Home icon" title="Home" height="30px" />),
                  key: 1 /* Key is required, else console throws error. Does this please you Mr. Browser?! */
                },
                {
                  path: '/trending',
                  name: 'Trending',
                  imgsrc: (<TrendingIcon alt="Trending icon" title="Trending" height="30px" width="30px" />),
                  key: 2
                },
                {
                  path: '/casting_calls',
                  name: 'Casting Calls',
                  imgsrc: (<CallsIcon alt="Calls icon" title="Calls" height="35px" />),
                  key: 3
                },
                {
                  path: '/search_talent',
                  name: 'Talent Search',
                  imgsrc: (<SearchIcon alt="Search icon" title="Search" height="30px" />),
                  key: 4
                },
                {
                    path: '/market_place',
                    name: 'Market Place',
                    imgsrc: (<MarketplaceIcon alt="Market icon" title="Marketplace" height="30px" />),
                    key: 5
                }
            ],
            bottomIcons: [
                {
                  path: '/chat', /* path is used as id to check which NavItem is active basically */
                  name: 'Chat',
                  imgsrc: (<MailIcon alt="Chat icon" title="Chat" height="30px" width="29px" />),
                  key: 11 /* Key is required, else console throws error. Does this please you Mr. Browser?! */
                },
                {
                  path: '/alerts',
                  name: 'Alerts',
                  imgsrc: (<BellIcon alt="Bell icon" title="Alerts" width="29px" height="30px" />),
                  key: 12
                },
                {
                  path: '/settings',
                  name: 'Settings',
                  imgsrc: (<CogIcon alt="Settings icon" title="Settings" height="30px" />),
                  key: 13
                },
                {
                  path: '/search',
                  name: 'Search',
                  imgsrc: (<MainSearchIcon alt="Search icon" title="Search" height="30px" />),
                  key: 14
                },
                {
                  path: '/my_profile',
                  name: 'My Profile',
                  imgsrc: (<DotsIcon alt="Dots icon" title="Profile" height="30px" />),
                  key: 15
                }
              ]
        }
    }

    onItemClick = (path) => {
        this.setState({ activePath: path });
    }

    render() {
        const { topIcons, bottomIcons, activePath } = this.state;
        return(
            <StyledSideNav>
                {
                    topIcons.map((item) => {
                        return (
                            <NavItem
                                path={item.path}
                                name={item.name}
                                imgsrc={item.imgsrc}
                                onItemClick={this.onItemClick}
                                active={item.path === activePath}
                                key={item.key}
                            />
                        );
                    })
                }
                <div><hr className="m0" /></div>
                {
                    bottomIcons.map((item) => {
                        return (
                            <NavItem 
                                path={item.path}
                                name={item.name}
                                imgsrc={item.imgsrc}
                                onItemClick={this.onItemClick}
                                active={item.path === activePath}
                                key={item.key}
                            />
                        );
                    })
                }
            </StyledSideNav>
        );
    }
}

const RouterSideNav = withRouter(SideNav);

const StyledNavItem = styled.div`
    height: 50px;
    width: 50px; /* width must be same size as NavBar to center */
    text-align: center; /* Aligns <a> inside of NavIcon div */
    margin-bottom: 0;   /* Puts space between NavItems */
    a {
        font-size: 2.5em; /* font size of icons*/
        :hover {
            opacity: 0.7;
            text-decoration: none; /* Gets rid of underlining of icons */
        }
        svg {
            filter: ${(props) => props.active ? "invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)" : " "};
            :hover {
                filter: invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%);
            }
        }
    }
    :hover {
        border-left: 2px solid #FF0000;
    }

    border-left: ${(props) => props.active ? "2px solid #FF0000" : "none"}
`;

class NavItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showAlert: false,
            notificationData: []
        }
    }
    componentDidMount() {
        UserService.getNotifications()
        .then((res) => {
            this.setState({notificationData: res.data.notifications}, () => {
                console.log('notification', this.state.notificationData)
            })
        }).catch(e => console.log(e))
    }
    onCrash = (e) => {
        e.currentTarget.src='https://www.worldfuturecouncil.org/wp-content/uploads/2020/02/dummy-profile-pic-300x300-1.png'
    }
    handleClick = (e) => {
        const { path, onItemClick } = this.props;
        if(path === '/alerts'){ // Don't navigate on alert's icon click
            e.preventDefault();
            this.setState({showAlert: true})
        }
        onItemClick(path);
    }

    closeAlertModal = () => {
        this.setState({ showAlert: false});
    }

    render() {
        const { active } = this.props;
        const { showAlert, notificationData } = this.state;
        return(
            <>
                <StyledNavItem active={active}>
                    <Link to={this.props.path} onClick={this.handleClick}>
                        {this.props.imgsrc}
                    </Link>
                </StyledNavItem>
                {showAlert ? (
                    <AlertModal
                        showModal={showAlert}
                        closeAlertModal={this.closeAlertModal}
                        notificationData={notificationData}
                    />
                ) : null}
            </>
        );
    }
}


export default class Sidebar extends React.Component {
    render() {
        return (
            <RouterSideNav />
        );
    }
}