import React from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Typography,
  Button,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";
import { Form, Formik } from "formik";

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: "Abril Fatface",
    [theme.breakpoints.down("xs")]: {
      fontSize: 72,
    },
  },
  recipeTileContainer: {
    margin: 0,
    width: "90%",
    maxWidth: theme.spacing(180),
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  filter: {
    width: "80%",
    maxWidth: theme.spacing(64),
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
}));

export const convertToRealTime = (x) => (x > 3600 ? 3600 + (x - 3600) * 2 : x);
export const convertToScaledTime = (x) =>
  x > 3600 ? Math.floor((x + 3600) / 2) : x;

export default function Filter({
  onSubmit = (values) => {
    console.log(JSON.stringify(values, null, 2));
  },
  initialValues = {
    calories: [0, 5000],
    carbs: [0, 500],
    protein: [0, 500],
    fats: [0, 500],
    cooking_time: [0, 9000],
    vegan: false,
    vegetarian: false,
    min_rating: 0,
    difficulty: {
      easy: true,
      medium: true,
      hard: true,
    },
  },
}) {
  const classes = useStyles();

  const time_marks = [
    {
      value: 0,
      label: "0m",
    },
    {
      value: 900,
      label: "15m",
    },
    {
      value: 1800,
      label: "30m",
    },
    {
      value: 2700,
      label: "45m",
    },
    {
      value: 3600,
      label: "1h",
    },
    {
      value: 5400,
      label: "2h",
    },
    {
      value: 7200,
      label: "3h",
    },
    {
      value: 9000,
      label: "Ꝏ",
    },
  ];

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ setFieldValue, values, handleSubmit }) => (
        <Form onSubmit={handleSubmit} className={classes.filter}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography id="calorie-slider" gutterBottom>
                Calories
              </Typography>
              <Slider
                id="calories"
                name="calories"
                min={0}
                step={10}
                max={5000}
                value={values.calories}
                onChange={(event, value) => setFieldValue("calories", value)}
                valueLabelDisplay="auto"
                valueLabelFormat={(val) => {
                  return val < 5000 ? val : "Ꝏ";
                }}
                aria-labelledby="calorie-slider"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography id="carbohydrates-slider" gutterBottom>
                Carbohydrates
              </Typography>
              <Slider
                id="carbohydrates"
                name="carbohydrates"
                min={0}
                step={5}
                max={500}
                value={values.carbs}
                onChange={(event, value) => setFieldValue("carbs", value)}
                valueLabelDisplay="auto"
                valueLabelFormat={(val) => {
                  return val < 500 ? `${val}g` : "Ꝏ";
                }}
                aria-labelledby="carbohydrates-slider"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography id="protein-slider" gutterBottom>
                Protein
              </Typography>
              <Slider
                id="protein"
                name="protein"
                min={0}
                step={5}
                max={500}
                value={values.protein}
                onChange={(event, value) => setFieldValue("protein", value)}
                valueLabelDisplay="auto"
                valueLabelFormat={(val) => {
                  return val < 500 ? `${val}g` : "Ꝏ";
                }}
                aria-labelledby="protein-slider"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography id="fats-slider" gutterBottom>
                Fats
              </Typography>
              <Slider
                id="fats"
                name="fats"
                min={0}
                step={5}
                max={500}
                value={values.fats}
                onChange={(event, value) => setFieldValue("fats", value)}
                valueLabelDisplay="auto"
                valueLabelFormat={(val) => {
                  return val < 500 ? `${val}g` : "Ꝏ";
                }}
                aria-labelledby="fats-slider"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography id="fats-slider" gutterBottom>
                Dietary requirements
              </Typography>
              <FormGroup row style={{ justifyContent: "center" }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.vegan}
                      onChange={(event) =>
                        setFieldValue("vegan", event.target.checked)
                      }
                      name="vegan"
                    />
                  }
                  label="Vegan"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.vegetarian}
                      onChange={(event) =>
                        setFieldValue("vegetarian", event.target.checked)
                      }
                      name="vegetarian"
                    />
                  }
                  label="Vegetarian"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12}>
              <Typography id="discrete-slider-restrict" gutterBottom>
                Cooking time
              </Typography>
              <Slider
                defaultValue={[0, 9000]}
                min={0}
                max={9000}
                aria-labelledby="prep-time-slider"
                step={null}
                value={values.cooking_time}
                onChange={(event, value) => {
                  setFieldValue("cooking_time", value);
                }}
                valueLabelDisplay="off"
                marks={time_marks}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography component="legend">
                {values.min_rating == 5
                  ? "5 stars only"
                  : values.min_rating == 0
                  ? "All ratings"
                  : `${values.min_rating}+ stars`}
              </Typography>
              <Rating
                name="simple-controlled"
                value={values.min_rating}
                onChange={(e, value) => {
                  setFieldValue("min_rating", value || 0);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography component="legend">Difficulty</Typography>
              <FormGroup row style={{ justifyContent: "center" }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.difficulty.easy}
                      onChange={(event) =>
                        setFieldValue("difficulty.easy", event.target.checked)
                      }
                      name="easy"
                    />
                  }
                  label="Easy"
                  labelPlacement="top"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.difficulty.medium}
                      onChange={(event) =>
                        setFieldValue("difficulty.medium", event.target.checked)
                      }
                      name="medium"
                    />
                  }
                  label="Medium"
                  labelPlacement="top"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.difficulty.hard}
                      onChange={(event) =>
                        setFieldValue("difficulty.hard", event.target.checked)
                      }
                      name="hard"
                    />
                  }
                  label="Hard"
                  labelPlacement="top"
                />
              </FormGroup>
            </Grid>
          </Grid>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            style={{ marginTop: 16 }}
          >
            Filter
          </Button>
        </Form>
      )}
    </Formik>
  );
}

Filter.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
};
