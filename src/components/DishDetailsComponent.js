import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle
} from "reactstrap";



  function RenderDish({dish}) {
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
  };

  function RenderComments({comments}) {
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
          <ul style={{ listStyleType: "none", padding: "0" }}>
            {commentslist}
          </ul>
        </div>
      );
    }
}
  

const DishDetails = (props) => {
    if (props.dish == null) {
      return (<div></div>);
    } else {
      return (
        <div className='container'>
          <div className='row justify-content-center'>
            <RenderDish dish={props.dish}/>
            <RenderComments comments={props.dish.comments}/>
          </div>
        </div>
      );
    }
  }

export default DishDetails;
