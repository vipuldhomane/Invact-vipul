import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { updateMovieData } from "../Redux/action";
import { BiEdit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const EditMovieModal = ({ movie }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({ ...movie });
  const dispatch = useDispatch();
  const nav = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    const formattedValue =
      name === "releaseYear" || name === "rating" ? Number(value) : value;
    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.imageUrl) newErrors.imageUrl = "Image URL is required";
    if (!formData.genre) newErrors.genre = "Genre is required";
    if (
      !formData.releaseYear ||
      formData.releaseYear.toString().length !== 4 ||
      isNaN(formData.releaseYear)
    ) {
      newErrors.releaseYear = "Release Year must be a 4-digit number";
    }
    if (
      !formData.rating ||
      formData.rating < 1 ||
      formData.rating > 5 ||
      isNaN(formData.rating)
    ) {
      newErrors.rating = "Rating must be a number between 1 and 5";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      dispatch(updateMovieData(movie._id, formData)).then(()=>{
        
        onClose();
        window.location.reload();
      });
      
    }
  };

  const handleCancel = () => {
    setFormData({ ...movie });
    setErrors({});
    onClose();
  };

  return (
    <>
      <Button
        onClick={onOpen}
        bg={"black"}
        color={"white"}
        p={4}
        _hover={{ bg: "white", color: "black", border: "1px solid black" }}
      >
        <span>
          <BiEdit />
        </span>{" "}
        Edit
      </Button>

      <Modal isOpen={isOpen} onClose={handleCancel}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Movie</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
              {errors.title && <Text color="red.500">{errors.title}</Text>}
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
              {errors.description && (
                <Text color="red.500">{errors.description}</Text>
              )}
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Release Year</FormLabel>
              <Input
                name="releaseYear"
                type="number"
                value={formData.releaseYear}
                onChange={handleChange}
                min={1000}
                max={9999}
                step={1}
              />
              {errors.releaseYear && (
                <Text color="red.500">{errors.releaseYear}</Text>
              )}
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Genre</FormLabel>
              <Input
                name="genre"
                value={formData.genre}
                onChange={handleChange}
              />
              {errors.genre && <Text color="red.500">{errors.genre}</Text>}
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Image URL</FormLabel>
              <Input name="imageUrl" value={formData.imageUrl} isDisabled />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Rating</FormLabel>
              <Input
                name="rating"
                type="number"
                value={formData.rating}
                onChange={handleChange}
                min={1}
                max={5}
                step={1}
              />
              {errors.rating && <Text color="red.500">{errors.rating}</Text>}
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Review</FormLabel>
              <Textarea
                name="reviews"
                value={formData.reviews}
                onChange={handleChange}
              />
              {errors.reviews && <Text color="red.500">{errors.reviews}</Text>}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button variant="ghost" onClick={handleCancel}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditMovieModal;
