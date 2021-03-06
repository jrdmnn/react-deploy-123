import React, { Component } from 'react'
import { Form, Button, Alert } from 'react-bootstrap';
import { signup } from '../services/auth';

export default class Signup extends Component {

  state = {
    username: '',
    password: '',
    message: ''
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
    signup(username, password)
      .then(data => {
        if (data.message) {
          this.setState({
            message: data.message,
            username: '',
            password: ''
          })
        } else {
          // put the user in the state of App.js
          this.props.setUser(data);
          this.props.history.push('/projects');
        }
      })
  }

  render() {
    return (
      <>
        <h2>Signup</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor='username'>Username: </Form.Label>
            <Form.Control
              type='text'
              name='username'
              id='username'
              value={this.state.username}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor='password'>Password: </Form.Label>
            <Form.Control
              type='password'
              name='password'
              id='password'
              value={this.state.password}
              onChange={this.handleChange}
            />
          </Form.Group>
          {this.state.message && (
            <Alert variant='danger'>{this.state.message}</Alert>
          )}
          <Button type='submit'>Signup</Button>
        </Form>
      </>
    )
  }
}
