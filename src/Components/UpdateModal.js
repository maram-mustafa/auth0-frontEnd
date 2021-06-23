import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class UpdateModal extends Component {
  render() {
    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.closeFunc}>
          <Modal.Header closeButton>
            <Modal.Title>Update Book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.props.updateFunc}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Book Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter book name"
                  name="bookName"
                  value={this.props.name}
                  onChange={this.props.changeFunc}
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Book Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="enter description"
                  name="bookDesc"
                  value={this.props.desc}
                  onChange={this.props.changeFunc}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Label>Status</Form.Label>

                <select
                  name="select"
                  value={this.props.status}
                  onChange={this.props.changeFunc}
                >
                  <option>select status</option>
                  <option value="life changing">Life Changing</option>
                  <option value="favorite five">Favorite Five</option>
                  <option value="recommended to me">Recommended To Me</option>
                </select>
              </Form.Group>

              <button
                className="btn btn-primary mr-2"
                variant="primary"
                onClick={this.props.closeFunc}
              >
                Submit
              </button>
              <Button variant="primary" onClick={this.props.closeFunc}>
                close
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default UpdateModal;
