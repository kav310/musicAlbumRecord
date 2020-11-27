import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import {
  Grid,
  InputLabel,
  FormControl,
  Paper,
  Avatar,
} from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Pagination from "@material-ui/lab/Pagination";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import { albumPagination } from "../Redux/action";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  paper: {
    height: 300,
    width: 300,
  },
  text: {
    textAlign: "center",
    paddingTop: "20px",
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
  margin: {
    marginLeft: "10%",
    marginTop: "2%",
  },
  margin1: {
    marginLeft: "80%",
  },
  margin2: {
    marginLeft: "5%",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default function DashboardPage() {
  let [dummy, query] = window.location.href.split("?");
  let obj = {};
  if (query != undefined) {
    query = query.split("&");
    for (let i = 0; i < query.length; i++) {
      const [key, value] = query[i].split("=");
      obj[key] = value;
    }
  }
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { total, albumData } = useSelector((state) => state.app);
  const [page, setPage] = useState(obj["page"] || 1);
  const [limit] = useState(4);
  const [genres, setGenres] = useState(obj["genres"] || "");
  const [year, setYear] = useState(obj["year"] || "");
  const [name, setName] = useState(obj["name"] || "");

  const handlePageChange = (event, value) => {
    setPage(value);
    dispatch(albumPagination({ page, limit, name, year, genres }));
  };
  const handleGenresChange = (event) => {
    setGenres(event.target.value);
  };
  const handleReleasedChange = (event) => {
    setYear(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  useEffect(() => {
    dispatch(albumPagination({ page, limit, name, year, genres }));
    history.push(
      `/?limit=${limit}&page=${page}&name=${name}&geners=${genres}&year=${year}`
    );
  }, [page, name, year, genres]);

  return (
    <>
      <div>
        <form noValidate autoComplete="off" className={classes.margin}>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            name="name"
            value={name}
            onChange={handleNameChange}
          />
          <TextField
            id="outlined-basic"
            label="Genre"
            variant="outlined"
            className={classes.margin2}
            name="genres"
            value={genres}
            onChange={handleGenresChange}
          />
        </form>
        <FormControl className={clsx(classes.formControl, classes.margin1)}>
          <InputLabel id="demo-simple-select-label">Sort By Year</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Year"
            name="year"
            value={year}
            onChange={handleReleasedChange}
          >
            <MenuItem value="" disabled>
              Year
            </MenuItem>
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Grid container className={classes.root} spacing={2}>
        <Grid item lg={6}>
          <Grid container justify="center" spacing={2}>
            {albumData &&
              albumData.map((item) => (
                <>
                  <Grid key={item._id} item>
                    <Paper className={classes.paper}>
                      <Avatar
                        alt="Remy Sharp"
                        src={item.img}
                        className={classes.large}
                      />
                      <Typography gutterBottom variant="h5" component="h2">
                        ALBUM:{item.name}
                      </Typography>
                      <Typography variant="h6" component="p">
                        ARTIST:{item.artistName}
                      </Typography>
                      <Typography variant="h6" component="p">
                        YEAR:{item.released}
                      </Typography>
                      <Typography variant="body2" component="p">
                        Genre:{item.genres}
                      </Typography>
                      <Typography variant="body2" component="p">
                        TRACKS:{item.trackCount}
                      </Typography>
                      <Button variant="contained" color="primary">
                        View Details
                      </Button>
                    </Paper>
                  </Grid>
                </>
              ))}
          </Grid>
        </Grid>
      </Grid>
      <Pagination
        count={total}
        color="primary"
        page={page}
        className={classes.pagination}
        onChange={handlePageChange}
        style={{ marginLeft: "35%", marginTop: "30px" }}
      />
    </>
  );
}
