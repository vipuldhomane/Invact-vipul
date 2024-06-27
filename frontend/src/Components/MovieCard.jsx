import React, { useState } from "react";
import { Box, Heading, Text, Button, useDisclosure } from "@chakra-ui/react";
import { BiChat, BiTrash, BiStar } from "react-icons/bi";
import { TbEyeUp, TbEyeX } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import StarRatings from "./StarRatings";
import EditMovieModal from "./EditMovieModal";
import { deleteMovie, getMoviesData, toggleWatchStatus } from "../Redux/action";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from "@chakra-ui/react";

const MovieCard = ({ movie,onDelete,watched }) => {
  const { title, description, imageUrl, releaseYear, genre, watchStatus, rating, reviews, _id } = movie;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = () => {
    dispatch(deleteMovie(_id)).then(() => {
        onDelete() // Re-fetch the movies data
    });
  };

  const handleToggleWatchStatus = () => {
    dispatch(toggleWatchStatus(_id, !watchStatus)).then(() => {
      onDelete() // Re-fetch the movies data
  });;
  };

  const handleCardClick = () => {
    navigate(`/${_id}`);
  };

  return (
    <Box w={"90%"} maxW="md" bg={"gray.300"} borderRadius={"10px"} pb={2}>
      <Box w={"100%"} position="relative" pb="100%" borderTopRadius="10px" overflow="hidden" cursor={'pointer'} onClick={handleCardClick}>
        <img
          src={imageUrl}
          alt={title}
          style={{
            objectFit: "fill",
            borderRadius: "10px 10px 0 0",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      </Box>

      <Box display="flex" gap={4} textAlign={"center"} justifyContent={'space-between'} mt={2} p={1.5}>
        <Box>
          <Heading fontSize={"1rem"} noOfLines={1}>{title}</Heading>
          <Text>{releaseYear} | {genre}</Text>
        </Box>
        {
          watched ? <></> : <Box onClick={handleToggleWatchStatus} cursor="pointer">
          {watchStatus ? <Text fontSize={'2rem'} color={'blue'}><TbEyeUp /></Text> : <Text fontSize={'2rem'} color={'blue.500'}><TbEyeX /></Text>}
        </Box>
        }
        
      </Box>

      <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={'2'} mb={2}>
        <Text>Ratings</Text>
        <Text><StarRatings value={rating} /></Text>
      </Box>

          {
            watched ? <></>
          : <Box display={"flex"} flexDirection={"row"} justifyContent="center" alignItems={'center'} gap={"0.5rem"} w={"100%"} margin={'auto'} p={2}>
          <Button bg={"black"} color={"white"} p={4} _hover={{ bg: "white", color: "black", border: '1px solid black' }} onClick={onOpen}>
            <span><BiChat /></span> Review
          </Button>
          <EditMovieModal movie={movie}  />
          <Button bg={"black"} color={"white"} p={4} _hover={{ bg: "white", color: "black", border: '1px solid black' }} onClick={handleDelete}>
            <span><BiTrash /></span> Delete
          </Button>
        </Box>    
          }
      
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reviews</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {reviews ? (         
                <Box mb={2}>
                  <Text>{reviews}</Text>
                </Box>
            ) : (
              <Text>No reviews available.</Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default MovieCard;
