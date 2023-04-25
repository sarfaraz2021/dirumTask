import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import axios from "axios";
import Table from "./Table";
import Modal from "react-modal";

Modal.setAppElement("#root");
const Home = () => {
  var img;
  const [search, setSearch] = useState("");
  const [load, setLoad] = useState(false);
  const [id, setId] = useState("");
  const [data, setData] = useState([{}]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [details, setDetails] = useState({
    id: "",
    plotSummary: {
      id: "",
      text: ""
    },
    releaseDate: "",
    title: {
      image: {
        url: ""
      }
    }
  });

  const ApiFetch = axios.create({
    baseURL: "https://online-movie-database.p.rapidapi.com/", // set the base URL
    headers: {
      "Content-Type": "application/json", // set the content type header
      "X-RapidAPI-Key": "053a68d0efmsh802e8a31fefc265p1e4e46jsn18503036989c",
      "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com"
      // Add any other headers you need
    },
    params: {
      // Add any default search query parameters you need
      q: "", //  search query parameter
      tconst: "" // example limit parameter
    }
  });

  const columns = [
    {
      Header: "Title",
      accessor: "title"
    },
    {
      Header: "Release Year",
      accessor: "year"
    },
    {
      Header: "Thumbnail",
      accessor: "image.url",
      Cell: ({ cell }) => (
        <img
          src={cell.value}
          alt="Thumbnail"
          style={{ width: "60px", height: "60px", borderRadius: "10%" }}
        />
      )
    },
    {
      Header: "Details",
      Cell: (props) => (
        <div>
          <button onClick={() => detailHandler(props.row)}>details</button>
          {/* <button onClick={() => deleteHandler(props)}>Delete</button> */}
        </div>
      )
    }
  ];

  const detailHandler = async (row) => {
    const id = row.original.id?.split("/");
    console.log(id);
    if (id !== undefined) {
      ApiFetch.defaults.params.tconst = id[2];
    }
    try {
      const response = await ApiFetch.get("title/get-overview-details");
      console.log(response.data);
      setDetails(response.data);
      // img = response.data.title.image;
      setModalIsOpen(true);
    } catch (error) {
      console.error(error);
      console.log("error");
    }
  };
  //   axios
  //     .get(
  //       "https://online-movie-database.p.rapidapi.com/title/get-overview-details",
  //       {
  //         headers: {
  //           "Content-Type": "application/json", // set the content type header
  //           "X-RapidAPI-Key":
  //             "053a68d0efmsh802e8a31fefc265p1e4e46jsn18503036989c",
  //           "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com"
  //           // Add any other headers you need
  //         },
  //         params: {
  //           tconst: id[2] // example limit parameter
  //         }
  //       }
  //     )
  //     .then((response) => {
  //       details = response.data;
  //       console.log(response.data);
  //     })
  //     .catch((error) => console.log(error));
  // };

  // const modalHandler = (details) => {
  //   setDetails(details);
  //   setModalIsOpen(true);
  // };

  const onChangeHandler = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };

  const onClickHandler = async () => {
    setLoad(true);
    ApiFetch.defaults.params.q = search;
    try {
      // console.log(ApiFetch.params.defaults.q);
      const response = await ApiFetch.get("title/find");
      console.log("response", response.data.results);
      setData(response.data.results);
      console.log("data");
      setLoad(false);
    } catch (error) {
      console.error(error);
      console.log("error");
      setLoad(false);
    }
  };

  // useEffect(() => {
  //   ApiFetch.defaults.params.tconst = id;
  //   async function fetchData() {
  //     try {
  //       // console.log(ApiFetch.params.defaults.q);
  //       const response = await ApiFetch.get("title/get-overview-details");
  //       console.log("response", response.data);
  //       // setData(response.data.results);
  //       // console.log("data");
  //       // setLoad(false);
  //     } catch (error) {
  //       console.error(error);
  //       console.log("error");
  //       // setLoad(false);
  //     }
  //   }
  //   fetchData();
  // }, [id]);

  return (
    <>
      <div className="container">
        <div className="row height d-flex justify-content-center align-items-center">
          <div className="col-md-6">
            <div className="form">
              {/* <i className="fa fa-search"></i> */}
              <input
                type="text"
                className="form-control form-input"
                placeholder="Search any movie..."
                value={search}
                onChange={onChangeHandler}
              />
              {/* <span className="left-pan">
              <i class="fa fa-microphone"></i>
            </span> */}

              {load ? (
                <BeatLoader loading={load} />
              ) : (
                <button className="mt-2" onClick={onClickHandler}>
                  Search
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row height d-flex justify-content-center align-items-start">
          <div className="col-6">
            {data.length <= 1 ? <></> : <Table data={data} columns={columns} />}
            <Modal isOpen={modalIsOpen}>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => {
                  setModalIsOpen(false);
                }}
              />
              <div className="container">
                <div className="row">
                  <div className="col">
                    <img
                      src={details.title.image.url}
                      alt="imaging"
                      style={{
                        height: "80vh",
                        width: "30vw"
                      }}
                    />
                  </div>
                  <div className="col">{details.plotSummary.text}</div>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
