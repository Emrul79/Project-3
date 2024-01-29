/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useContext, useState } from "react";
import { MovieContext } from "../context/context";
import { getImageUrl } from "../utils/cine-utils";
import MovieDetailsModal from "./MovieDetailsModal";
import Rating from "./Rating";
export default function MovieCard({ movie }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedmovie, setSelectedMovie] = useState(null);

  const { state, dispatch } = useContext(MovieContext);

  //   console.log(cartData, setCartData);
  const handleclose = () => setShowModal(false);

  const handleAddToCart = (e, movie) => {
    e.stopPropagation();

    const found = state.cartData.find((item) => item.id === movie.id);
    console.log(`the item is not found  ${found}`);

    if (!found) {
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          ...movie,
        },
      });
    } else {
      console.error(`movie ${movie} has been found in database already`);
    }
  };

  const handleSelectedMovie = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };
  return (
    <>
      {showModal && (
        <MovieDetailsModal
          movie={movie}
          onclose={handleclose}
          onCartAdd={handleAddToCart}
        />
      )}
      <figure className="p-4 border border-black/10 shadow-sm dark:border-white/10 rounded-xl">
        <a href="#" onClick={() => handleSelectedMovie(movie)}>
          <img
            className="w-full object-cover"
            src={getImageUrl(`${movie.cover}`)}
            alt={movie.title}
          />
          <figcaption className="pt-4">
            <h3 className="text-xl mb-1">{movie.title}</h3>
            <p className="text-[#575A6E] text-sm mb-2">{movie.genre}</p>
            <div className="flex items-center space-x-1 mb-5">
              <Rating value={movie.rating} />
            </div>
            <button
              className="bg-primary rounded-lg py-2 px-5 flex items-center justify-center gap-2 text-[#171923] font-semibold text-sm"
              href="#"
              onClick={(e) => handleAddToCart(e, movie)}
            >
              <img src="./assets/tag.svg" alt="" />
              <span>${movie.price} | Add to Cart</span>
            </button>
          </figcaption>
        </a>
      </figure>
    </>
  );
}
