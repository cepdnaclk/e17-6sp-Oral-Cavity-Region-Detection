import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NoImage from '../../images/noimage.jpg';
import {Container} from './ShowCase.styles'
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import InfoIcon from '@mui/icons-material/Info';
import Info from './Info'
import path from '../json/path.json'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ShowCase({details, handleCheckbox}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: "100%", height: "fit-content" }}>
      {/* <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      /> */}
      <Container>
      <input type="checkbox" 
      id={`myCheckbox${details._id}`}
      value = {details._id}
      onChange={handleCheckbox}
      />
        <label htmlFor={`myCheckbox${details._id}`}>       
      <CardMedia
        component="img"
        height="194"
        image={`${path[0]['imgpath']}/${details.original}`}
        alt="no-image"
        onError={e => {
          e.target.src = NoImage;
        }}
      />
      <div style={{position: 'absolute', bottom:0, right:0}}>
      <Info details={details}/>
      </div>
      {/* <ImageListItemBar
        sx={{background: 'transparent'}}
        actionIcon={
          <IconButton
            sx={{ color: '#fff'}}
          >
            <InfoIcon />
          </IconButton>
        }
        /> */}
       </label>
       </Container>
      {/* <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent> */}
      <CardActions disableSpacing style={{padding:0, margin:0}}>
        {/* <IconButton aria-label="add to favorites">
          <InfoOutlinedIcon/>
        </IconButton> */}
        {/* <IconButton aria-label="share">
          <AutoFixHighIcon />
        </IconButton> */}
        {/* <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore> */}
      </CardActions>
      {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{py:0}}>
            <p style={{margin:0}}>Age: {details.patient_age}</p>
            <p style={{margin:0}}>Gender: {details.patient_gender}</p>
            <p style={{margin:0}}>District: {details.patient_district}</p>
            <p style={{margin:0}}>Habits: {details.patient_habits} </p>
            <p style={{margin:0}}>Description: {details.description}</p>
        </CardContent>
      </Collapse> */}
    </Card>
  );
}
