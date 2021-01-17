import React from "react";
import flv from "flv.js";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

// steps to run this
// cd /Users/tshah/reacttutorial/streams/rtmpserver
// npm start
// make sure streams/client and streams/server are running too (npm start)
// open OBS and hit "Start Streaming"
// go to http://localhost3000 and click on programmatic navigation
// (because it has the stream id 13 where OBS is streaming)
class StreamShow extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchStream(id);
    this.buildPlayer();
  }

  // build player every time render method is called
  componentDidUpdate() {
    this.buildPlayer();
  }

  componentWillUnmount() {
    console.log("player unmounted");
    this.player.destroy();
  }

  buildPlayer() {
    // build player only if props.stream is there
    if (this.player || !this.props.stream) {
      return;
    }
    const { id } = this.props.match.params;
    this.player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }
    const { title, description } = this.props.stream;
    return (
      <div>
        <video ref={this.videoRef} stype={{ width: "100%" }} controls={true} />
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchStream }
)(StreamShow);
