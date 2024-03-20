import React from 'react';
import { useState, useEffect } from 'react';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { GoogleGenerativeAI } from "@google/generative-ai";

import { styled } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Grid from '@mui/joy/Grid';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Box from '@mui/joy/Box';
import CircularProgress from '@mui/joy/CircularProgress';

import './dictaphone-style.css'
import RecruiterCard from './RecruiterCard';

function renderGoalWords(keyWords, transcript) {
  let words = []
  for (let i = 0; i < keyWords.length; i++) {
   if (transcript.length > 0) {
    if (transcript.toLowerCase().includes(keyWords[i].toLowerCase())) {
      words.push(<div style={{color: 'green'}}>{keyWords[i]}</div>)
    } else {
      words.push(<div style={{color: 'red'}}>{keyWords[i]}</div>)
    }
   } else {
      words.push(<div style={{color: 'red'}}>{keyWords[i]}</div>)
    }
  }
  return <tbody>{words}</tbody>;
 }

const Item = styled(Sheet)(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.background.level1 : '#fff',
    ...theme.typography['body-sm'],
    padding: theme.spacing(1),
    textAlign: 'center',
    borderRadius: 4,
    color: theme.vars.palette.text.secondary,
  }));


const Dictaphone = () => {
  const [response, setResponse] = useState('')
  const [question, setQuestion] = useState("What is your greatest strength?")
  const [keyWords, setKeyWords] = useState(['lead', 'c++', 'communication'])
  const [matches, setMatches] = useState(0)

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    let newMatches = 0;
    for (let i = 0; i < keyWords.length; i++) {
      if (transcript.toLowerCase().includes(keyWords[i].toLowerCase())) {
        newMatches++;
      }
    }
    setMatches(newMatches);
  }, [transcript]); // Dependency array ensures effect runs on transcript changes



  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  function restartPrompt() {
    resetTranscript()
    setResponse('')
  }

  async function GenerateCritique(question, transcript) { // Add 'async' here
    // For text-only input, use the gemini-pro model
    const genAI = new GoogleGenerativeAI('AIzaSyCxFrJ99ayyc3qkuhmMLH88GbJfPdbBbU8');
    console.log(process.env.API_KEY)

    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    const prompt = `
    
    With this interview question: ${question} How can I improve my answer? 
    
    Give me something specific you liked about my answer and then two things I could work on. 
    
    Give me examples of how I'd improve the two things. Keep it to 4-5 sentences. 

    Give me these examples in the voice of a kind, caring, helpful HR employee or recruitor.

    Don't start with any acknowledgement of my prompt, simply speak as if you are speaking directly to the interviewee with no quotation marks.
    
    Here is my answer: ${transcript}`

    const result = await model.generateContent(prompt); 
    const prompt_response = await result.response;
    const text = prompt_response.text();
    setResponse(text)
    console.log(response);
};

  return (
    <div className='applet'>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <div className='question'>
        <Card variant="solid">
            <CardContent>
              <Typography level="title-md" textColor="inherit">
                  {question}
              </Typography>
            </CardContent>
        </Card></div><div className='question'>
        <ButtonGroup sx={{ p: 1, borderColor: 'text.primary'}} aria-label="solid button group">
          <Button sx={{ color: "white" }} onClick={SpeechRecognition.startListening}>Start</Button>
          <Button sx={{ color: "white" }} onClick={SpeechRecognition.stopListening}>Stop</Button>
          <Button sx={{ color: "white" }} onClick={() => GenerateCritique(question, transcript)}>Analyze</Button>
          <Button sx={{ color: "white" }} onClick={restartPrompt}>Restart</Button>
        </ButtonGroup>

      </div>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      <Grid xs={8}>
        <Item ><p>{transcript}</p></Item>
      </Grid>
      <Grid xs={4}>
        <Item sx={{ 
      display: 'flex', 
      flexDirection: 'column', // Arrange items vertically
      alignItems: 'center',    // Center horizontally
      justifyContent: 'center', // Center vertically
      textAlign: 'center',
      height: '100%' // Ensure Item takes up full height of Grid 
    }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', textAlign: 'center',flexWrap: 'wrap' }}>
      <CircularProgress size="lg" determinate value={(matches / keyWords.length)*100}>
        {matches} / {keyWords.length}
      </CircularProgress>
    </Box>
    <div><h1>Goal words:</h1> <h3>{renderGoalWords(keyWords, transcript)}</h3></div>
        </Item>
      </Grid>
      <Grid xs={4}>
        <Item><RecruiterCard /></Item>
      </Grid>
      <Grid xs={8}>
        <Item><p>{response}</p></Item>
      </Grid>
    </Grid>
    </div>
  );
};
export default Dictaphone;