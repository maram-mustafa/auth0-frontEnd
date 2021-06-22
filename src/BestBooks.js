import React from "react";
import "./BestBooks.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import BookFormModal from "./Components/BookFormModal";

class MyFavoriteBooks extends React.Component {
  state = {
    data: [],
    showModal: false,
    err: "",
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
    });
  };

  postData = (e) => {
    e.preventDefault();
    console.log("inside post");

    let dataObj = {
      email: this.props.userEmail,
      name: e.target.bookName.value,
      desc: e.target.bookDesc.value,
      status: e.target.select.value,
    };
    let serverURL = process.env.REACT_APP_SERVER;
    let url = `${serverURL}/addbooks`;

    axios
      .post(url, dataObj)
      .then((data) => {
        this.setState({ data: data.data });
      })
      .catch((err) => {
        this.setState({ err: "there is an error" });
      });
  };

  deleteData = (e) => {
    let serverURL = process.env.REACT_APP_SERVER;
    let id = e.target.name;
    let url = `${serverURL}/deletebooks/${id}`;

    let dataObj = {
      email: this.props.userEmail,
    };

    axios.delete(url, { params: dataObj }).then((data) => {
      this.setState({ data: data.data });
    });
  };

  showModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    // this.getData();
    return (
      <>
        <h1>My best books</h1>
        <Button onClick={this.showModal}>Add a book</Button>
        <div className="cards">
          {this.state.data.map((book, i) => {
            return (
              <Card className="text-center" key={i}>
                <Card.Header>{book.name}</Card.Header>
                <Card.Body>
                  <Card.Text>{book.desc}</Card.Text>
                  <Button
                    variant="primary"
                    name={book._id}
                    onClick={this.deleteData}
                  >
                    Delete
                  </Button>
                </Card.Body>
                <Card.Footer className="text-muted">{book.status}</Card.Footer>
              </Card>
            );
          })}
        </div>
        <BookFormModal
          show={this.state.showModal}
          closeFunc={this.closeModal}
          postFunc={this.postData}
        />
      </>
    );
  }
}

export default MyFavoriteBooks;
