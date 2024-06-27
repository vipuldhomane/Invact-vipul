import React, { useEffect, useState } from 'react';
import { Box, Button, Heading, Text, Image, IconButton, Modal, ModalOverlay, ModalContent, ModalBody, Textarea, ModalFooter, ModalHeader } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMovie, getMovieById, getMoviesData, reviewUpdate, toggleWatchStatus, updateMovieData } from '../Redux/action';
import { BiEdit, BiTrash, BiArrowBack } from 'react-icons/bi';
import { TbEyeUp, TbEyeX } from 'react-icons/tb';

import { LuFileEdit } from "react-icons/lu";

import StarRatings from '../Components/StarRatings';
import EditMovieModal from '../Components/EditMovieModal';
import { CirclesWithBar } from 'react-loader-spinner';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { status, error, movies } = useSelector((store) => store.movies);

  const [isOpen, setIsOpen] = useState(false);
  const [reviewText, setReviewText] = useState('');

  const movie = movies.find((e) => e._id === id);

  useEffect(() => {
    dispatch(getMoviesData());
  }, [dispatch]);

  const handleDelete = () => {
    dispatch(deleteMovie(id)).then(() => {
      navigate('/');
    });
  };

  const handleToggleWatchStatus = () => {
    dispatch(toggleWatchStatus(id, !movie.watchStatus));
  };

   const handleReview = () => {
    setIsOpen(true);
    setReviewText(movie.reviews || ''); // Initialize review text in modal with existing review
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleSubmitReview = () => {
    dispatch(reviewUpdate(id, { "reviews": reviewText })).then(() => {
      setIsOpen(false);
      window.location.reload(); 
    });
  };


  return (
    <Box p={4}>
        {
            movie  ? 
            <>
            <Heading color={'yellow.600'}>{movie.title}</Heading>
            <Box display={'flex'} justifyContent={'flex-start'} alignItems={'flex-start'} >
                <Button leftIcon={<BiArrowBack />}  bg={"black"} color={"white"} p={4} _hover={{ bg: "white", color: "black", border:'1px solid black' }} onClick={() => navigate('/')}>
                    Back
                </Button>
            </Box>
          <Box display="flex" flexDirection={{ base: 'column', md: 'row' }} mt={4} gap={6} >
            <Box flex={1}>
              <Image width={'100%'} height={'400px'} objectFit={'fill'} src={movie.imageUrl} alt={movie.title} borderRadius="md" />
            </Box>
            <Box display={'flex'} flex={2} flexDirection={'column'} gap={5}>
              <Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'} gap={8}>
                    <Text fontSize={'1rem'} color={'green.500'} fontWeight={'bold'}>Release Year:</Text>
                    <Text fontSize={'1rem'} color={'green.800'} fontWeight={'bold'}>{movie.releaseYear}</Text>
              </Box>
              <Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'} gap={7}>
                    <Text fontSize={'1rem'} color={'green.500'} fontWeight={'bold'}>Movie Genre:</Text>
                    <Text fontSize={'1rem'} color={'green.800'} fontWeight={'bold'}>{movie.genre}</Text>
              </Box>
    
              <Box display={'flex'} justifyContent={'flex-start'} gap={10}>
                    <Text fontSize={'1rem'} color={'green.500'} fontWeight={'bold'}> Description:</Text>
                    <Text fontSize={'1rem'} textAlign={'justify'} color={'green.800'} fontWeight={'bold'}>{movie.description}</Text>
              </Box>
    
              <Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'} gap={7}>
                    <Text fontSize={'1rem'} color={'green.500'} fontWeight={'bold'}> Watch Status:</Text>
                    <IconButton
                  icon={movie.watchStatus ? <TbEyeUp /> : <TbEyeX />}
                  colorScheme={movie.watchStatus ? 'green' : 'red'}
                  onClick={handleToggleWatchStatus}
                />
              </Box>
    
              <Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'} gap={20}>
                    <Text fontSize={'1rem'} color={'green.500'} fontWeight={'bold'}>Rating:</Text>
                    <StarRatings value={movie.rating} />
              </Box>
    
              <Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'} gap={20}>
                    <Text fontSize={'1rem'} color={'green.500'} fontWeight={'bold'}>Reviews:</Text>
                    <Text fontSize={'1rem'} textAlign={'justify'} color={'green.800'} fontWeight={'bold'}>{movie.reviews || "No reviews available."}
                    <IconButton
                    icon={<LuFileEdit/>}
                    ml={5}
                    colorScheme='green'
                    onClick={handleReview}
                    />
                    </Text>
                    
              </Box>
    
              <Box mt={4} display="flex" gap={6}>
                <EditMovieModal movie={movie} />
                <Button colorScheme="red" onClick={handleDelete}>
                  <BiTrash /> Delete
                </Button>
              </Box>
            </Box>
          </Box> 
            </>:  <Box display={'flex'} justifyContent={'center'} alignItems={'center'} w={'100%'} m={'auto'} h={'100vh'}>
            <CirclesWithBar
                height="20%"
                width="100%"
                color="#4fa94d"
                outerCircleColor="#4fa94d"
                innerCircleColor="#4fa94d"
                barColor="#4fa94d"
                ariaLabel="circles-with-bar-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </Box>
        }

          {/* Review Modal */}
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Review</ModalHeader>
          <ModalBody>
            <Textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmitReview}>
              Save
            </Button>
            <Button onClick={handleCloseModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default MovieDetails;
