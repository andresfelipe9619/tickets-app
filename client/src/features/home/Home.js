import React, { Component } from "react";
import { Header, Divider } from "semantic-ui-react";
import { connect } from "react-redux";
import { homePageLoaded } from "./redux/actions";
import "./styles/home.css";
import WOW from "wowjs";
class Home extends Component {
  componentDidMount() {
    this.props.homePageLoaded(true);
    const wow = new WOW.WOW();
    wow.init();
  }

  componentWillUnmount() {
    this.props.homePageLoaded(false);
  }

  render() {
    return (
      <div className="app">
        <div className="home-app-header">
          <Header
            className="header wow slideInDown"
            textAlign={"center"}
            style={{ fontSize: "80px", color: "white", paddingTop: "1em" }}
          >
            <span className="manage-title-header manage-highlight">
              Welcome to
              <br />
              Ticket app
            </span>
            <Header as={"h1"} style={{ color: "#4cc0ff" }}>
              Your best option to manage personal finances.
            </Header>
          </Header>
          <Divider />
          <br />
          <div
            id="welcome-p"
            className="wow fadeInDown"
            data-wow-delay="0.6s"
            style={{ color: "white", fontSize: "25px" }}
          >
            <p style={{ paddingLeft: "1em", paddingRight: "1em" }}>
              Lorem ipsum dolor sit amet, an ius oratio dictas feugiat. Amet
              bonorum mei ei. An usu copiosae probatus evertitur. Mei amet
              exerci singulis te, pro ne mundi labores perfecto. Nam an mollis
              vocibus scaevola, an posse invidunt nec. Duo ad omnesque tincidunt
              voluptatibus, putant concludaturque vel id, id vix veniam accumsan
              fabellas.
            </p>
            <br />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    homePageLoaded: bool => {
      dispatch(homePageLoaded(bool));
    }
  };
};
export default connect(
  null,
  mapDispatchToProps
)(Home);
