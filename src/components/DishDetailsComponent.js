import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
  Media,
} from "reactstrap";

class DishDetails extends Component {
  constructor(props) {
    super(props);
  }

  renderDish(dish) {
    if (dish == null) {
      return <div></div>;
    } else {
      return (
        <Card>
          <CardImg width='100%' src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      );
    }
  }

  renderComments(comments) {
    if (comments == null) {
      return <div></div>;
    } else {
      const commentslist = comments.map((comment) => {
          let date=comment.date
          let day=date.split('-')[2].substring(0,2)
          let month=date.split('-')[1]
          let year = date.split('-')[0]
        return (
          <li key={comment.id}>
            <p>{comment.comment}</p>
            <p>
              --{comment.author}, {day}.{month}.{year}.
            </p>
          </li>
        );
      });
      return (
        <div>
          <h4>Comments</h4>
          <ul style={{listStyleType:'none', padding:'0'}}>{commentslist}</ul>
        </div>
      );
    }
  }

  render() {
    if (this.props.dish == null) {
      return <div></div>;
    } else {
      return (
        <div className='row justify-content-center'>
          <div className='col-12 col-md-5'>
            {this.renderDish(this.props.dish)}
          </div>
          <div className='col-12 col-md-5'>
            {this.renderComments(this.props.dish.comments)}
          </div>
        </div>
      );
    }
  }
}

export default DishDetails;
