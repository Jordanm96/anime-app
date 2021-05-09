import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { createShow } from "../../services/shows";
import { Button, Form } from "react-bootstrap";
import Layout from "../../components/shared/Layout/Layout";
import "./CreateShow.css";

const CreateShow = (props) => {
  const [show, setShow] = useState({
    title: "",
    plot: "",
    imgURL: "",
    duration: "",
  });

  const [isCreated, setCreated] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setShow({
      ...show,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const created = await createShow(show);
    setCreated({ created });
  };

  if (isCreated) {
    return <Redirect to={`/shows`} />;
  }

  return (
    <Layout user={props.user}>
      <Form className="addSeries-form-container" onSubmit={handleSubmit}>
        <h2 className="addSeries-form-title">Add Series</h2>
        <Form.Group>
          <Form.Label className="addSeries-form-label">Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            name="title"
            value={show.title}
            required
            autoFocus
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="addSeries-form-label">Duration</Form.Label>
          <Form.Control
            type="text"
            placeholder="Duration"
            name="duration"
            value={show.duration}
            required
            autoFocus
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="addSeries-form-label">Image URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="URL address"
            name="imgURL"
            value={show.imgURL}
            required
            autoFocus
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="addSeries-form-label">Plot Summary</Form.Label>
          <textarea
            type="text"
            placeholder="Plot (2-4 sentences)"
            name="plot"
            value={show.plot}
            rows="6"
            required
            autoFocus
            onChange={handleChange}
            className="form-control"
          />
        </Form.Group>
        <Button type="submit" id="add-button">
          Add
        </Button>
      </Form>
    </Layout>
  );
};

export default CreateShow;
