
import * as React from 'react'
import {Image,Flex,Spacer, Box, Container} from '@chakra-ui/react'



const imagesList = [
  {
    id: 1,
    src:'https://azariaimages.s3.amazonaws.com/postermod4.png',
    alt: "Image 4",
  },  
  {
      id: 4,
      src:'https://azariaimages.s3.amazonaws.com/postermod1.png',
      alt: "Image 1",
    },
    {
      id: 2,
      src: 'https://azariaimages.s3.amazonaws.com/postermod2.png',
      alt: "Image 2",
    },
    {
      id: 3,
      src:'https://azariaimages.s3.amazonaws.com/postermod3.png',
      alt: "Image 3",
    },
    {
      id: 5,
      src:'https://azariaimages.s3.amazonaws.com/postermod5.png',
      alt: "Image 5",
    },
    {
      id: 6,
      src:'https://azariaimages.s3.amazonaws.com/postermod6.png',
      alt: "Image 6",
    },
    {
      id: 7,
      src:'https://azariaimages.s3.amazonaws.com/postermod7.png',
      alt: "Image 7",
    },
  ];


       
   export const ImageTrain =()=>{
    
      const [imageIndex, setImageIndex] = React.useState(0);
    
      React.useEffect(() => {
        setInterval(() => {
          setImageIndex(prev => (
            prev === imagesList.length - 1 ? 0 : prev + 1
          ));
        },8000);
      },[])
    
     console.log(imageIndex)
      return (
        <Box mx={10}>
           <Image src={imagesList[imageIndex].src} alt={imagesList[imageIndex].alt} />
        </Box>
      );
    
    }
      
       
     
    
       
   
   
  


          