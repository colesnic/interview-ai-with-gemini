import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/joy/Box';
import CircularProgress from '@mui/joy/CircularProgress';
import ReportIcon from '@mui/icons-material/Report';
import WarningIcon from '@mui/icons-material/Warning';

export default function GoalWordProgress(props) {

  const [matches, setMatches] = useState([])

    function num_matches(transcript, desired_words) {
        const filteredArray = transcript.filter(value => desired_words.includes(value));
    }

    
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
      <CircularProgress size="lg" determinate value={66.67}>
        {matches.length} / {props.goalWords.length}
      </CircularProgress>
    </Box>
  );
}