import { FC } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface RecipeCardProps {
  calories: number;
  cuisineType: string[];
  totalTime: string;
  image: string;
  label: string;
}
const RecipeCard: FC<RecipeCardProps> = ({
  calories,
  cuisineType,
  totalTime,
  image,
  label,
}) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" image={image} alt="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {label}
        </Typography>
        <Typography variant="body2">
          <b>Cuisine Type:</b>{" "}
          {cuisineType.map((type) => type.toLocaleUpperCase())}
        </Typography>
        <Typography variant="body2">
          <b>Total Prep Time:</b> {totalTime} minutes
        </Typography>
        <Typography variant="body2">
          <b>Total Calories:</b> {calories.toFixed(0)}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">View Source Website</Button>
        <Button size="small">View Full Recipe</Button>
      </CardActions> */}
    </Card>
  );
};

export default RecipeCard;
