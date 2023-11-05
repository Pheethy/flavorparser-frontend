import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import axios from "axios";
import "./AppLogIn.css";

const url = "http://127.0.0.1:8080/users/sign-in";

function LogIn() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const closeSuccessModal = () => {
    setSuccessModalOpen(false);
  };

  const submitForm = async (data) => {
    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json", // Use "application/json" content type
        },
      });

      const responseData = response.data;
      localStorage.clear();
      localStorage.setItem("jwtToken", responseData.user.token.access_token);
      setSuccessModalOpen(true);

      const signAPIKey = async () => {
        try {
          const token = "Bearer " + localStorage.getItem("jwtToken");
          console.log("token:", token)
          const headers = {
            Authorization: token,
          };

          const resp = await axios.get("http://localhost:8080/info/apikey", {
            headers,
          });

          const apiKeyData = resp.data;
          console.log(apiKeyData.key);
          localStorage.setItem("x-api-key", apiKeyData.key);
        } catch (err) {
          console.error(err);
        }
      };

      signAPIKey();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="Container">
      <Form onSubmit={handleSubmit(submitForm)} className="Form-box">
        <Form.Label className="form-label">Log-in</Form.Label>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            className="form-control"
            type="email"
            placeholder="Username"
            isInvalid={!!errors.email}
            {...register("email", {
              required: "Email is a required field.",
            })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            className="form-control"
            type="password"
            placeholder="Password"
            isInvalid={!!errors.password}
            {...register("password", {
              required: "Password is a required field.",
              validate: (v) =>
                v.length > 4 || "Password must be at least 5 characters long",
            })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" className="btn-submit">
          Login
        </Button>
      </Form>
      <Modal show={successModalOpen} onHide={closeSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title>Sign-in Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your sign-in was successful.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeSuccessModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default LogIn;
