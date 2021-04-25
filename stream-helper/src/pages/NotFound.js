import {  Button, Container, Row } from 'react-bootstrap';
import React from 'react'
import { Link } from 'react-router-dom';

function NotFound() {
    return(
        <>
        <Container>
            <Row>
                <h1> There Appears To Be A Glitch In The Matrix... <br/>
                You Must Have Wondered Onto An Unexisting Page!</h1>
            </Row>

            <Row>
                <Link to={'/home'}>
                <Button> Take The Blue Pill</Button>
                </Link>


                <Link to={'/home'}>
                <Button variant="danger" > Take The Red Pill</Button>
                </Link>
            </Row>
        </Container>
        </>
    )
}

export default NotFound