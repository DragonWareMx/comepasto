import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Header from './parts/Header';
import Footer from './parts/Footer';
import { Navbar } from "./parts/Navbar";
import styled from 'styled-components';

const Grid = styled.div`
    display: grid;
    grid: "header header" min-content
                          "nav main" 1fr / min-content 1fr;
    min-height: 100vh;
`;

const GridNav = styled.nav`
    grid-area: nav;
    z-index: 2000;
`;

const GridHeader = styled.div`
    grid-area: header;
`;

const GridMain = styled.div`
    grid-area: main;
    background-color: #fafafa;
    position: relative;
`;

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    titulo: {
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '18px',
        lineHeight: '22px',
        color: 'white',
        marginTop: '25px',
        textTransform: 'uppercase'
    }
}));

export default function LayoutAdmin({ title, pageTitle, children }) {
    const [showNav, setShowNav] = useState(0);
    const toggle = () => {
        setShowNav(Number(!showNav));
        setCompact(0);
    };
    const [compact, setCompact] = React.useState(0);
    const handleCompact = () => setCompact(Number(!compact));

    const classes = useStyles();
    useEffect(() => {
        document.title = title;
    }, [title]);


    return (
        <React.Fragment>
            {/* contenido */}
            <Grid>
                <GridNav>
                    <Navbar visible={showNav} close={toggle} compact={compact} handleCompact={handleCompact} />
                </GridNav>
                <GridHeader>
                    <Header toggle={toggle} handleCompact={handleCompact} />
                </GridHeader>
                <GridMain>
                    <Container maxWidth={'lg'}>
                        {children}
                    </Container>
                    <Footer />
                </GridMain>
            </Grid>
        </React.Fragment>
    );
}