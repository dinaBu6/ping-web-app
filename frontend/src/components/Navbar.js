import { AppBar, Toolbar, Typography, Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';

const Navbar = () => {

    const navigate = useNavigate();

    const NavButton = styled(Button)({
      margin: '1px 1.5px',
      '&:hover': { textDecoration: 'underline', backgroundColor: 'transparent' },
    });

    return (
        <AppBar
            position="static">
        <Toolbar sx={{ flexWrap: 'wrap' }}>
            <Typography 
                variant="h6" 
                color="inherit" 
                noWrap 
                sx={{ flexGrow: 1 }}>
                ping-web-app
            </Typography>
            <nav>
                <NavButton
                    variant="text"
                    color="inherit"
                    onClick={() => navigate('./')}>
                    HOME
                </NavButton>
                <NavButton
                    variant="text"
                    color="inherit"
                    onClick={() => navigate('./statistics')}>
                    STATISTICS
                </NavButton>
            </nav>
        </Toolbar>
      </AppBar>
    )
}

export default Navbar;