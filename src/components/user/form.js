import React, { Component } from "react";
import firebase, { usersCollection } from "../../utils/firebase";

class LoginForm extends Component {
  state = {
    register: false,
    user: {
      email: "",
      password: "",
    },
  };

  handleForm = (e) => {
    e.preventDefault();
    const { email } = this.state.user;
    const { password } = this.state.user;
    if (this.state.register) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          this.handleStoreRegisteredUser(user);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((response) => {
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  changeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        [name]: value,
      },
    }));
  };

  handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("User logged out");
      });
  };

  handleGetUserInfo = () => {
    let getUser = firebase.auth().currentUser;
    if (getUser) {
      getUser.getIdTokenResult().then((res) => {
        console.log(res);
      });
    } else {
      console.log("NO USER");
    }
  };

  handleUpdateEmail = () => {
    let getUser = firebase.auth().currentUser;
    let credential = firebase.auth.EmailAuthProvider.credential(
      "jane@gmail.com",
      "123456"
    );
    if (getUser) {
      getUser.reauthenticateWithCredential(credential).then((res) => {
        getUser.updateEmail("john@gmail.com");
      });
    }
  };

  handleUpdateProfile = () => {
    let getUser = firebase.auth().currentUser;
    getUser
      .updateProfile({
        displayName: "John",
        photoURL: "",
      })
      .then(() => {
        console.log(getUser);
      });
  };

  handleStoreRegisteredUser = (data) => {
    usersCollection
      .doc(data.user.uid)
      .set({
        email: data.user.email,
      })
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  handleGoogleSignin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        this.handleStoreRegisteredUser(result);
        console.log(result);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    return (
      <>
        <form onSubmit={(e) => this.handleForm(e)}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              onChange={(e) => this.changeHandler(e)}
            ></input>
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={(e) => this.changeHandler(e)}
            ></input>
          </div>

          <button type="submit" className="btn btn-primary">
            {this.state.register ? "Register" : "Sign in"}
          </button>
        </form>
        <hr />
        <button className="btn btn-primary" onClick={() => this.handleLogout()}>
          Logout
        </button>
        <hr />
        <button
          className="btn btn-primary"
          onClick={() => this.handleGetUserInfo()}
        >
          Ask about the user
        </button>
        <hr />
        <button
          className="btn btn-primary"
          onClick={() => this.handleUpdateEmail()}
        >
          Update user email
        </button>
        <hr />
        <button
          className="btn btn-primary"
          onClick={() => this.handleUpdateProfile()}
        >
          Update user profile
        </button>
        <hr />
        <button
          className="btn btn-primary"
          onClick={() => this.handleGoogleSignin()}
        >
          Sign in with Google
        </button>
      </>
    );
  }
}

export default LoginForm;
