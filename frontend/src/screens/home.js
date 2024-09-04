import React, { useEffect, useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Card from "../components/card";
function Home() {
  const [Search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("https://gofood-backend-bfad.onrender.com/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner" id="carousal">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={Search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="http://farm5.static.flickr.com/4053/4448297408_372e9eaa63.jpg"
                className="d-block w-100 d-flex align-items-center"
                style={{
                  Filter: "brightness(30%)",
                  height: "700px",
                  objectFit: "fill",
                }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://paattiskitchen.com/wp-content/uploads/2022/12/kmc_20221222_183111-1024x576.jpg"
                className="d-block w-100 img-fluid"
                style={{
                  Filter: "brightness(30%)",
                  height: "auto",
                  objectFit: "fill",
                }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://t4.ftcdn.net/jpg/05/82/28/65/360_F_582286506_Kji3X5NrZBHMTFSqwG9gADXWMsjrtEjL.jpg"
                className="d-block w-100"
                style={{
                  Filter: "brightness(30%)",
                  height: "700px",
                  objectFit: "fill",
                }}
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {foodCat != [] ? (
          foodCat.map((data) => {
            return (
              <div className="row mb-3">
                <div key={data._id} className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                <hr></hr>
                {foodItem != [] ? (
                  foodItem
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name
                          .toLowerCase()
                          .includes(Search.toLocaleLowerCase())
                    )
                    .map((filterItems) => {
                      return (
                        <div
                          key={filterItems._id}
                          className="col-12 col-md-6 col-lg-3"
                        >
                          <Card
                            foodItem={filterItems}
                            options={filterItems.options[0]}
                          ></Card>
                        </div>
                      );
                    })
                ) : (
                  <div>No such data exist</div>
                )}
              </div>
            );
          })
        ) : (
          <div>""""""""""</div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
export default Home;
