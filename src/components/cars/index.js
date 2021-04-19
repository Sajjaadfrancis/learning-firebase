import React, { Component } from "react";
import { firebaseLooper } from "../../utils/tools";
import { carsCollection, employeeRef } from "../../utils/firebase";
import Form from "./forms";

class Cars extends Component {
  state = {
    cars: null,
    start: 0,
    end: 100,
  };

  getAllTheCars() {
    carsCollection
      .orderBy("price")
      // .limit(2)
      .startAt(this.state.start)
      .endAt(this.state.end)
      .get()
      .then((snapshot) => {
        const cars = firebaseLooper(snapshot);
        this.setState({ cars });
      });
  }

  componentDidMount() {
    this.getAllTheCars();

    /// Get doc by ID
    // carsCollection
    //   .doc("2qc2TFLU18g0OV8OA6l1")
    //   .get()
    //   .then((snapshot) => {
    //     console.log(snapshot.data());
    //   });

    // employeeRef.get().then((snapshot) => {
    //   const employees = firebaseLooper(snapshot);
    //   console.log(employees);
    // });
  }

  handleCarData = (cars) =>
    cars
      ? cars.map((data, i) => (
          <tr key={i}>
            <th>{data.id}</th>
            <th>{data.brand}</th>
            <th>{data.color}</th>
            <th>{data.price}</th>
          </tr>
        ))
      : null;

  sortResults(values) {
    this.setState(
      {
        start: values[0],
        end: values[1],
      },
      () => {
        this.getAllTheCars();
      }
    );
  }

  render() {
    const cars = this.state.cars;

    return (
      <>
        <button onClick={() => this.sortResults([300, 400])}>300 - 400</button>
        <button onClick={() => this.sortResults([500, 900])}>500 - 900</button>
        <button onClick={() => this.sortResults([1000, 4000])}>
          1000 - 4000
        </button>
        <Form />
        <table className="table table-dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Brand</th>
              <th>Color</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>{this.handleCarData(cars)}</tbody>
        </table>
      </>
    );
  }
}

export default Cars;
