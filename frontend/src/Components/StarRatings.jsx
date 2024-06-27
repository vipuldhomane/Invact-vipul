import React from "react";
import "./StarRatings.css"

const Star = ({ marked, starId }) => {
    return (
        <span data-star-id={starId} className={`star ${marked ? 'marked' : ''}`}>
          {marked ? '\u2605' : '\u2606'}
        </span>
      );
  };
const StarRatings   = ({ value }) =>{
 
    const [rating, setRating] = React.useState(parseInt(value) || 0);
    const [selection, setSelection] = React.useState(0);
  
    return (
      <div>
        {Array.from({ length: 5 }, (v, i) => (
          <Star
            starId={i + 1}
            key={`star_${i + 1}`}
            marked={selection ? selection >= i + 1 : rating >= i + 1}
          />
        ))}
      </div>
    );
  };

  export default StarRatings;