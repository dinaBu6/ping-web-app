import { useState } from 'react';
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { TextField, Slider, Button, Box, Input } from '@mui/material';
import '../index.css';

const Home = () => {
    const [host, setHost] = useState("");
    const [count, setCount] = useState(4);
    const [output, setOutput] = useState("");
    const [hostError, setHostError] = useState(false);
    const [hostErrorText, setHostErrorText] = useState(" ");
    const [loadOutput, setLoadOutput] = useState(false);
    const MINCOUNT = 1;
    const MAXCOUNT = 1000;

    //form change
    const handleHostChange = (event) => {
        setHost(event.target.value);
    }

    const handleSliderChange = (event) => {
        setCount(event.target.value);
      };
    
    const handleInputChange = (event) => {
        setCount(event.target.value === '' ? 0 : Number(event.target.value));
    };

    //Check that the written host is valid
    const validateHostName = () => {
        let domainPattern = /^(?=[a-zA-Z0-9-]{1,63}\.)([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\.)+[a-zA-Z]{2,}$/;
        let IPv4Pattern = /^\d{1,3}(\.\d{1,3}){3}$/;
        let IPv6Pattern = /^([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4}|:)$/;

        return domainPattern.test(host) || IPv4Pattern.test(host) || IPv6Pattern.test(host);
    }

    const fetchPing = async () => {
        try {
            const response = await fetch('http://localhost:4000/ping', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ host, count }),
            });
            if (response.status !== 200) {
                setLoadOutput(false);
                throw new Error(`Something went wrong. Please check if the host truly exists.`);
            }
        
            const reader = response.body.getReader();
            let loadingPing = true;

            while (loadingPing) {
                const { done, value } = await reader.read();
        
                if (done) {
                    loadingPing = false;
                } else {
                    const decodedChunk = new TextDecoder().decode(value);
                    setOutput(output => (output + decodedChunk).trimStart());
                }
            }
            setLoadOutput(false);
        } catch (error) {
            setOutput('Error: ' + error.message);
            setLoadOutput(false);
        }
      };

    //For statistics - update the ping count for every host
    const updateHostCount = () => {
        fetch('http://localhost:4000/countPing', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ host }),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {  
                console.log('Error: ' + error.message);
            });
    }
    
    //run clicked
    const handleRunClicked = () => {
        //clean the output in case it's not empty
        setOutput("");
        //check if the hise field is valid
        if (!validateHostName()) {
            setHostError(true);
            setHostErrorText("Only valid domain or ip address are accepted");
        }
        else {
            setLoadOutput(true);
            setHostError(false);
            setHostErrorText(" ");
            fetchPing();
            updateHostCount();
        }
    }

    //If the user cannot write a count that is outsize the allowed values
    const handleBlur = () => {
        if (count < MINCOUNT) {
            setCount(MINCOUNT);
        } else if (count > MAXCOUNT) {
            setCount(MAXCOUNT);
        }
      };

    return (
        <div className='home'>
        <Container maxWidth="sm">
        <Box mb = {3}>
            <h2>Ping Form</h2>
        </Box>
        <Grid container spacing={2}>
            <Grid item xs={2}>
                <p className='text'>Host:</p>
            </Grid>
            <Grid item xs={10}>
                <TextField  
                    size='small' 
                    variant="standard"
                    fullWidth 
                    value={host}
                    onChange={handleHostChange}
                    error = {hostError}
                    helperText = {hostErrorText}
                />
            </Grid>
            <Grid item xs={2}>
                <p className='text'>Count:</p>
            </Grid>
            <Grid item xs={8.5}>
            <Slider
                value={typeof count === 'number' ? count : 0}
                onChange={handleSliderChange}
                aria-labelledby="input-slider"
                size="small"
                aria-label="Small"
                min={MINCOUNT}
                max={MAXCOUNT}
            />
            </Grid>
            <Grid item xs={1.5}>
            <Input
                value={count}
                size="small"
                onChange={handleInputChange}
                onBlur={handleBlur}
                inputProps={{
                min: {MINCOUNT},
                max: {MAXCOUNT},
                type: 'number',
                'aria-labelledby': 'input-slider',
                }}
            />
            </Grid>
        </Grid>
        <Box mt={3} mb={3} >
            <Button 
                variant="contained"
                sx={{width: '20%'}}
                onClick={handleRunClicked}
                disabled = {host === "" || loadOutput === true}>
                {loadOutput ? 'Loading...' : 'Run'}
            </Button>
        </Box>
        <p className='text'>Output:</p>
        <TextField  
            size='small' 
            variant="outlined" 
            value={output}
            multiline
            fullWidth
            rows={15}/>
        </Container>
        </div>
    )
}
export default Home;