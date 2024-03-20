import './RecruiterCard.css'

import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';

import recruitor_serious from './images/recruitor_serious.jpg'

export default function RecruiterCard() {
  return (
    <Card sx={{ width: 320 }}>
      <AspectRatio minHeight="320px" maxHeight="200px">
        <img
          src={recruitor_serious}
          loading="lazy"
          alt=""
        />
      </AspectRatio>
      <div>
        <Typography level="title-lg">Greg Henderson</Typography>
        <Typography level="body-sm">Serious, driven MAANG tech recruitor</Typography>
        <IconButton
          aria-label="bookmark Bahamas Islands"
          variant="plain"
          color="neutral"
          size="sm"
          sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
        >
          <BookmarkAdd />
        </IconButton>
      </div>
    </Card>
  );
}