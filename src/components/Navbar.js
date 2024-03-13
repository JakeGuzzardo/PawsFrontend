import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const NavbarComp = () => {
    return (
        <Navbar className="bg-body-tertiary">
            <Navbar.Brand href="/" style={{ marginLeft: '1rem' }}>
                <img
                    src="/images/logo.png"
                    width="90"
                    className="d-inline-block align-top"
                    alt="Paws & Rec logo"
                />
            </Navbar.Brand>
            <Nav className="me-auto my-2 my-lg-0">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/showAll">Show All Dogs</Nav.Link>
                <Nav.Link href="/addDog">Add Dog</Nav.Link>
                <Nav.Link href="/walkers">Walkers</Nav.Link>
            </Nav>
        </Navbar >

    )
}

export default NavbarComp