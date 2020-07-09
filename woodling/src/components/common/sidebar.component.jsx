import React from 'react';
import styled from 'styled-components';
import 'font-awesome/css/font-awesome.min.css';
import { ReactComponent as HomeIcon } from '../../assets/home-alt.svg';
import { ReactComponent as TrendingIcon } from '../../assets/discovery-unselected.svg';
import { ReactComponent as CallsIcon } from '../../assets/casting-calls-icon.svg';
import { ReactComponent as SearchIcon } from '../../assets/talent-search.svg';
import { ReactComponent as MarketplaceIcon } from '../../assets/marketplace-naira.svg';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";

const StyledSideNav = styled.div`   
    position: fixed;     /* Fixed Sidebar (stay in place on scroll and position relative to viewport) */
    height: 100%;
    width: 60px;     /* Set the width of the sidebar */
    z-index: 1;      /* Stay on top of everything */
    top: 2.6em;      /* Stay at the top */
    background-color: #fff; /* Black */
    overflow-x: hidden;     /* Disable horizontal scroll */
    padding-top: 10px;
`;

class SideNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePath: props.location.pathname,
            items: [
                {
                  path: '/home', /* path is used as id to check which NavItem is active basically */
                  name: 'Home',
                  imgsrc: (<HomeIcon alt="Home icon" title="Home"/>),
                  key: 1 /* Key is required, else console throws error. Does this please you Mr. Browser?! */
                },
                {
                  path: '/about',
                  name: 'Trending',
                  imgsrc: (<TrendingIcon alt="Trending icon" title="Trending" width="30px" />),
                  key: 2
                },
                {
                  path: '/casting_calls',
                  name: 'Casting Calls',
                  imgsrc: (<CallsIcon alt="Calls icon" title="Calls" />),
                  key: 3
                },
                {
                  path: '/talent_search',
                  name: 'Talent Search',
                  imgsrc: (<SearchIcon alt="Search icon" title="Search" />),
                  key: 4
                },
                {
                    path: '/NoMatch',
                    name: 'Market Place',
                    imgsrc: (<MarketplaceIcon alt="Market icon" title="Marketplace" />),
                    key: 5
                },
              ]
        }
    }

    onItemClick = (path) => {
        this.setState({ activePath: path });
    }

    render() {
        const { items, activePath } = this.state;
        return(
            <StyledSideNav>
                {
                    items.map((item) => {
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
    height: 70px;
    width: 60px; /* width must be same size as NavBar to center */
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
    handleClick = () => {
        const { path, onItemClick } = this.props;
        onItemClick(path);
    }

    render() {
        const { active } = this.props;
        return(
            <StyledNavItem active={active}>
                <Link to={this.props.path} onClick={this.handleClick}>
                    {this.props.imgsrc}
                </Link>
            </StyledNavItem>
        );
    }
}


export default class Sidebar extends React.Component {
    render() {
        return (
            <RouterSideNav></RouterSideNav>
        );
    }
}