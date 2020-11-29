import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { SUBSCRIBE_MUTATION } from "./service/mutation";
import {
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
} from "reactstrap";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";

const Subscription = () => {
  const [isFailed, setFailed] = useState(false);
  const [message, setMessage] = useState("");
  const [subscribe] = useMutation(SUBSCRIBE_MUTATION);

  const reset = (resetForm, setSubmitting) => {
    resetForm(true);
    setSubmitting(false);
    setTimeout(() => {
      setMessage("");
      setFailed(false);
    }, 2000);
  };

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    setMessage("");
    setFailed(false);

    try {
      const mutationResult = await subscribe({
        variables: {
          email: values.email,
        },
      });
      const result = mutationResult.data.subscribe;
      if (result && result.success) {
        setMessage(
          "You'll shortly receieve an E-mail regarding confirmation of Subscription"
        );
        reset(resetForm, setSubmitting);
      } else if (result && !result.success) {
        setMessage(result.error.message);
        setFailed(true);
        reset(resetForm, setSubmitting);
      }
    } catch (error) {
      setMessage(`Subscription failed due to ${error}`);
      setFailed(true);
      reset(resetForm, setSubmitting);
    }
  };

  const validation = () => {
    return Yup.object({
      email: Yup.string()
        .email("Please input correct Email")
        .required("Required"),
    });
  };

  return (
    <Container>
      <Alert
        isOpen={message ? true : false}
        color={isFailed ? "danger" : "primary"}
      >
        {message}
      </Alert>
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }} className="text-center">
          <h2>DigsUp test</h2>
          <p>Subscribe to our platform so that we can keep you posted! <br/>
            <strong>For the Future of Real Estate</strong>
          </p>
        </Col>
      </Row>
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }} className="mt-5">
          <Formik
            initialValues={{ email: "" }}
            validationSchema={validation}
            onSubmit={onSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <FormGroup>
                  <Label for="email">Email {errors.email}</Label>
                  <Input
                    type="email"
                    name="email"
                    tag={Field}
                    invalid={errors.email && touched.email}
                  />
                </FormGroup>
                <Button type="submit" color="primary" className="d-flex m-auto">
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default Subscription;
