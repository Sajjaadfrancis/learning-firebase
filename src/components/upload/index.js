import React, { Component } from "react";
import { usersRef } from "../../utils/firebase";

class Upload extends Component {
  constructor(props) {
    super(props);

    this.pauseRef = React.createRef();
    this.resumeRef = React.createRef();
    this.cancelRef = React.createRef();

    this.state = {
      image: null,
      url: "",
      progress: 0,
    };
  }

  handleUpload = (e) => {
    e.preventDefault();
    const { image } = this.state;
    const uploadTask = usersRef.child(`${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({
          progress,
        });

        switch (snapshot.state) {
          case "error":
            console.log("Error");
            break;
          case "paused":
            console.log("Paused");
            break;
          case "running":
            console.log("Running");
            break;
          case "success":
            console.log("Success");
            break;
          default:
            console.log(snapshot.state);
        }
      },
      (error) => {
        console.log(error);
        this.setState({ progress: 0 });
      },
      () => {
        console.log(uploadTask.snapshot.ref);
        console.log(uploadTask.snapshot.ref.bucket);
        console.log(uploadTask.snapshot.ref.fullPath);

        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      }
    );
    this.pauseRef.current.addEventListener("click", () => {
      uploadTask.pause();
    });
    this.resumeRef.current.addEventListener("click", () => {
      uploadTask.resume();
    });
    this.cancelRef.current.addEventListener("click", () => {
      uploadTask.cancel();
    });
  };

  handleChange = (event) => {
    if (event.target.files[0]) {
      const image = event.target.files[0];
      this.setState({
        image,
      });
    }
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleUpload}>
          <progress value={this.state.progress} max="100" />
          <div className="form-group">
            <label>File</label>
            <input
              className="form-control"
              type="file"
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Upload file
          </button>
        </form>
        <hr />
        <div className="form-group">
          <button className="btn btn-primary" ref={this.pauseRef}>
            Pause
          </button>
        </div>
        <div className="form-group">
          <button className="btn btn-primary" ref={this.resumeRef}>
            Resume
          </button>
        </div>
        <div className="form-group">
          <button className="btn btn-primary" ref={this.cancelRef}>
            Cancel
          </button>
        </div>
      </>
    );
  }
}

export default Upload;
