import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

function RenderDish({ dish }) {
  if (dish == null) {
    return <div></div>;
  } else {
    return (
      <div className='col-12 col-md-5 m-1'>
        <Card>
          <CardImg width='100%' src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
}

function RenderComments({ comments, addComment, dishId }) {
  if (comments == null) {
    return <div></div>;
  } else {
    const commentslist = comments.map((comment) => {
      return (
        <li key={comment.id}>
          <p>{comment.comment}</p>
          <p>
            --{comment.author},{" "}
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            }).format(new Date(Date.parse(comment.date)))}
          </p>
        </li>
      );
    });
    return (
      <div className='col-12 col-md-5 m-1'>
        <h4>Comments</h4>
        <ul style={{ listStyleType: "none", padding: "0" }}>{commentslist}</ul>
        <div className='row'>
          <CommentForm dishId={dishId} addComment={addComment} />
        </div>
      </div>
    );
  }
}

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    this.toggleModal();
    this.props.addComment(
      this.props.dishId,
      values.rating,
      values.author,
      values.comment
    );
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  render() {
    return (
      <>
        <Button outline onClick={this.toggleModal}>
          <span className='fa fa-pencil fa-lg'></span>
          Submit Comment
        </Button>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className='form-group'>
                <Label htmlFor='rating' xs={12}>
                  Rating
                </Label>
                <Col xs={12}>
                  <Control.select
                    model='.rating'
                    name='rating'
                    className='form-control'>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className='form-group'>
                <Label htmlFor='name' xs={12}>
                  Your Name
                </Label>
                <Col xs={12}>
                  <Control.text
                    model='.author'
                    id='author'
                    name='author'
                    placeholder='Your Name'
                    className='form-control'
                    validators={{
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                    }}
                  />
                  <Errors
                    className='text-danger'
                    model='.author'
                    show='touched'
                    messages={{
                      minLength: "Must be greater than 3 characters",
                      maxLength: "Mast be 15 characters or less",
                    }}
                  />
                </Col>
              </Row>
              <Row className='form-group'>
                <Label htmlFor='comment' xs={12}>
                  Comment
                </Label>
                <Col xs={12}>
                  <Control.textarea
                    model='.comment'
                    id='comment'
                    name='comment'
                    rows='6'
                    className='form-control'></Control.textarea>
                </Col>
              </Row>
              <Row className='form-group'>
                <Col xs={3}>
                  <Button type='submit' color='primary'>
                    Submit
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

const DishDetails = (props) => {
  if (props.isLoading) {
    return (
      <div className='container'>
        <div className='row'>
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className='container'>
        <div className='row'>
          <h3>{props.errMess}</h3>
        </div>
      </div>
    );
  }
  else if (props.dish == null) {
    return <div></div>;
  } else {
    return (
      <div className='container'>
        <div className='row'>
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to='/menu'>Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className='col-12'>
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className='row justify-content-center'>
          <RenderDish dish={props.dish} />
          <RenderComments
            comments={props.comments}
            addComment={props.addComment}
            dishId={props.dish.id}
          />
        </div>
      </div>
    );
  }
};

export default DishDetails;
