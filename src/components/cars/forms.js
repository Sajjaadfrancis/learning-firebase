import React, { Component } from "react";
import firebase, {
  carsCollection,
  firebaseTimestamp,
} from "../../utils/firebase";

class Form extends Component {
  state = {
    brand: "",
    color: "",
    price: "",
    available: "",
  };

  componentDidMount() {
    carsCollection.doc("VmyRjrTSGaqn4iVSdqah").update({
      tags: firebase.firestore.FieldValue.arrayRemove("Awesome"),
    });
  }

  handleForm = (e) => {
    e.preventDefault();

    /// add to the db
    carsCollection
      .doc()
      .set({
        ...this.state,
        available: this.state.available === "true" ? true : false,
        price: parseInt(this.state.price),
        createdAt: firebaseTimestamp(),
        dealers: {
          virginia: true,
          washington: false,
          california: true,
        },
        tags: ["Good", "Comfortable", "Expensive"],
      })
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  changeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <>
        <form onSubmit={(e) => this.handleForm(e)}>
          <div className="form-group">
            <label>Brand</label>
            <input
              type="text"
              className="form-control"
              name="brand"
              onChange={(e) => this.changeHandler(e)}
            ></input>
          </div>

          <div className="form-group">
            <label>Color</label>
            <input
              type="text"
              className="form-control"
              name="color"
              onChange={(e) => this.changeHandler(e)}
            ></input>
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              type="text"
              className="form-control"
              name="price"
              onChange={(e) => this.changeHandler(e)}
            ></input>
          </div>

          <div className="form-group">
            <label>Available</label>
            <select
              className="form-control"
              name="available"
              onChange={(e) => this.changeHandler(e)}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <hr />
      </>
    );
  }
}

// carsCollection.doc("VmyRjrTSGaqn4iVSdqah").onSnapshot((doc) => {
//   console.log("Current data", doc.data());
// });

carsCollection.onSnapshot((querySnapshot) => {
  console.log(querySnapshot.docChanges());
});

export default Form;
