import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useDisclosure,
  Box,
  Text,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { addMovie } from "../Redux/action";
import { AiFillFolderAdd } from "react-icons/ai";

const AddMovieModal = ({onAdd}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = name === "releaseYear" || name === "rating" ? Number(value) : value;
    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.imageUrl) newErrors.imageUrl = "Image URL is required";
    if (!formData.genre) newErrors.genre = "Genre is required";
    if (!formData.releaseYear || formData.releaseYear.toString().length !== 4 || isNaN(formData.releaseYear)) {
      newErrors.releaseYear = "Release Year must be a 4-digit number";
    }
    if (isNaN(formData.rating) || formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = "Rating must be a number between 1 and 5";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      dispatch(addMovie(formData)).then(()=>{
        setFormData({});
        setErrors({});
        onAdd();
        onClose();
      });    
    }
  };

  const handleCancel = () => {
    setFormData({});
    setErrors({});
    onClose();
  };

  useEffect(()=>{
    setFormData({})
  },[])

  return (
    <>
      <Box m={2} p={2} textAlign={'right'}>
        <Button onClick={onOpen} bg={"black"} color={"white"} p={4} _hover={{ bg: "white", color: "black", border:'1px solid black' }}> ADD Movie  
        <Text as="span" fontSize={'1.5rem'} ml={2}><AiFillFolderAdd /></Text></Button>
      </Box>

      <Modal isOpen={isOpen} onClose={handleCancel}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Movie</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4} isInvalid={errors.title}>
              <FormLabel>Title</FormLabel>
              <Input name="title" value={formData.title} onChange={handleChange} />
              {errors.title && <Text color="red.500">{errors.title}</Text>}
            </FormControl>

            <FormControl mb={4} isInvalid={errors.description}>
              <FormLabel>Description</FormLabel>
              <Textarea name="description" value={formData.description} onChange={handleChange} />
              {errors.description && <Text color="red.500">{errors.description}</Text>}
            </FormControl>

            <FormControl mb={4} isInvalid={errors.releaseYear}>
              <FormLabel>Release Year</FormLabel>
              <Input
                name="releaseYear"
                // type="number"
                value={formData.releaseYear}
                onChange={handleChange}
                min={1000}
                max={9999}
                step={1}
              />
              {errors.releaseYear && <Text color="red.500">{errors.releaseYear}</Text>}
            </FormControl>

            <FormControl mb={4} isInvalid={errors.genre}>
              <FormLabel>Genre</FormLabel>
              <Input name="genre" value={formData.genre} onChange={handleChange} />
              {errors.genre && <Text color="red.500">{errors.genre}</Text>}
            </FormControl>

            <FormControl mb={4} isInvalid={errors.imageUrl}>
              <FormLabel>Image URL</FormLabel>
              <Input name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
              {errors.imageUrl && <Text color="red.500">{errors.imageUrl}</Text>}
            </FormControl>

            <FormControl mb={4} isInvalid={errors.rating}>
              <FormLabel>Rating</FormLabel>
              <Input
                name="rating"
                // type="number"
                value={formData.rating}
                onChange={handleChange}
                min={1}
                max={6}
                step={1}
              />
              {errors.rating && <Text color="red.500">{errors.rating}</Text>}
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Review</FormLabel>
              <Textarea name="reviews" value={formData.reviews} onChange={handleChange} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button variant="ghost" onClick={handleCancel}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddMovieModal;
