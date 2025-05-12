import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function HoverRating({ value, onChange }) {
  const [internalValue, setInternalValue] = React.useState(value || 2);
  const [hover, setHover] = React.useState(-1);

  // Update internal value if the parent's value prop changes
  React.useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const handleChange = (event, newValue) => {
    setInternalValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Rating
        name="hover-feedback"
        value={internalValue}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={handleChange}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        sx={{
          "& .MuiRating-icon": {
            fontSize: "2rem", // Custom star size
            marginRight: "4px", // Adjust spacing between stars
          },
        }}
        emptyIcon={
          <StarIcon
            style={{ opacity: 0.55 }}
            fontSize="inherit"
            sx={{ fontSize: "2rem" }} // Match empty icon size
          />
        }
      />
      {internalValue !== null && (
        <Box sx={{ ml: 2, fontSize: "1.1rem" }}>
          {labels[hover !== -1 ? hover : internalValue]}
        </Box>
      )}
    </Box>
  );
}
