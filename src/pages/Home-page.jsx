import { Box } from "@mui/material";
import { Component } from "react";
import Sidenav from "../components/Sidenav";

class HomePage extends Component {
    render() {
        return(
            <>
                <Box sx={{display: 'flex'}}>
                    <Sidenav/>
                    <Box component="main" sx={{flexFlow: 1, p: 3}}>
                        <h1>Welcome to Licoterca</h1>
                    </Box>
                </Box>
            </>
        )
    }
}

export default HomePage