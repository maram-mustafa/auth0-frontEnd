import React from "react";
import "./BestBooks.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import BookFormModal from "./Components/BookFormModal";
import UpdateModal from "./Components/UpdateModal";

class MyFavoriteBooks extends React.Component {
  state = {
    data: [],
    showModal: false,
    err: "",
    updateShow: false,
    updateInfo: {},
    name: "",
    desc: "",
    status: "",
    id: "",
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
    this.setState({ showModal: false, updateShow: false });
  };

  showUpdateModal = (i) => {
    let bookObj = this.state.data[i];
    console.log(bookObj);

    this.setState({
      updateShow: true,
      name: bookObj.name,
      desc: bookObj.desc,
      status: bookObj.status,
      id: bookObj._id,
    });
  };

  change = (e) => {
    if (e.target.name === "bookName") {
      this.setState({ name: e.target.value });
    } else if (e.target.name === "bookDesc") {
      this.setState({ desc: e.target.value });
    } else if (e.target.name === "select") {
      this.setState({ status: e.target.value });
    }
  };

  updateData = (e) => {
    e.preventDefault();
    let id = this.state.id;
    let serverURL = process.env.REACT_APP_SERVER;
    let url = `${serverURL}/updatebooks/${id}`;

    let updatedData = {
      email: this.props.userEmail,
      name: e.target.bookName.value,
      desc: e.target.bookDesc.value,
      status: e.target.select.value,
    };
    axios.put(url, updatedData).then((data) => {
      this.setState({ data: data.data})
      console.log(data.data);
    });
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
                  <Button
                    variant="primary"
                    name={i}
                    onClick={() => this.showUpdateModal(i)}
                  >
                    UpDate
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

        <UpdateModal
          show={this.state.updateShow}
          closeFunc={this.closeModal}
          name={this.state.name}
          desc={this.state.desc}
          status={this.state.status}
          changeFunc={this.change}
          updateFunc={this.updateData}
        />
      </>
    );
  }
}

export default MyFavoriteBooks;
