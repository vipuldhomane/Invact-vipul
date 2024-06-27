import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMoviesData } from "../Redux/action";
import { Box, Button, Grid, Heading, Text } from "@chakra-ui/react";
import MovieCard from "../Components/MovieCard";
import { AiFillFolderAdd } from "react-icons/ai";
import { FaHistory } from "react-icons/fa";

import { CirclesWithBar } from "react-loader-spinner";
import AddMovieModal from "../Components/AddMovieModal";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { status, error, movies } = useSelector((store) => store.movies);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [deletionCount, setDeletionCount] = useState(0);

  useEffect(() => {
    dispatch(getMoviesData());
  }, [dispatch, deletionCount]);

  const handleMovieUpdate = () => {
    setDeletionCount((prev) => prev + 1);
  };

  const watchedMovies = () => {
    nav("/watched");
  };

  return (
    <Box>
      <Heading mt={2} color={"#034752"}>
        Movies Watch
      </Heading>

      {/* Data Collected */}
      <Box>
        {status == "success" ? (
          <Box w={"90%"} margin={"auto"} mt={"1rem"}>
            <Box
              w={"95%"}
              margin={"auto"}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"flex-end"}
              mb={4}
            >
              <AddMovieModal onAdd={handleMovieUpdate} />
              <Box m={2} p={2} textAlign={"right"} onClick={watchedMovies}>
                <Button
                  bg={"black"}
                  color={"white"}
                  p={4}
                  _hover={{
                    bg: "white",
                    color: "black",
                    border: "1px solid black",
                  }}
                >
                  {" "}
                  Watched Movies
                  <Text as="span" fontSize={"1rem"} ml={2}>
                    <FaHistory />
                  </Text>
                </Button>
              </Box>
            </Box>
            <Grid templateColumns="repeat(3, minmax(300px, 1fr))" gap={2}>
              {Array.isArray(movies) &&
                movies.map((movie) => (
                  <MovieCard
                    key={movie._id}
                    movie={movie}
                    onDelete={handleMovieUpdate}
                  />
                ))}
            </Grid>
          </Box>
        ) : (
          <>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              w={"100%"}
              m={"auto"}
              h={"100vh"}
            >
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
          </>
        )}
      </Box>
    </Box>
  );
};

export default Home;
