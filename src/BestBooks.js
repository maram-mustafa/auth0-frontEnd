import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import "./BestBooks.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

class MyFavoriteBooks extends React.Component {
  state = {
    data: [],
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    let serverURL = process.env.REACT_APP_SERVER;
    let url = `${serverURL}/books`;

    let obj = {
      email: this.props.userEmail,
    };

    axios.get(url, { params: obj }).then((data) => {
      // console.log(data);
      this.setState({ data: data.data });
      console.log(this.state.data);
    });
  };

  render() {
    // this.getData();
    return (
      <>
        <Carousel style ={{ width : 600, height: 600 , backgroundColor:'black', margin : "0 auto" , marginTop : 40, marginBottom: 40, }} >
          {this.state.data.map((book) => {
            return (
              <Carousel.Item>
                <img style={{width : 200 , height: 600}}
                  className="d-block w-100"
                  src={book.img}
                  alt="First slide"
                 
                />
                <Carousel.Caption
                  style={{ backgroundColor: "black", opacity: 0.8 }}
                >
                  <h3>{book.name}</h3>
                  <p>{book.desc}</p>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </>
    );
  }
}

export default MyFavoriteBooks;
