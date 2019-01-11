import React, { Component } from 'react';
import { Button, ButtonGroup, Grid, Row} from 'react-bootstrap';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.imgRef = React.createRef();

    this.state = {
      items: [
        {
          bottom: 40,
          color: 'red',
          height: 10,
          left: 20,
          right: 50,
          text: 'ddddd',
          top: 30,
          width: 40,
        },
        {
          bottom: 70,
          height: 10,
          left: 30,
          color: 'pink',
          right: 70,
          text: 'eeeeeee',
          top: 60,
          width: 60
        }
      ]
    };
  }

  componentDidMount = () => {
    window.addEventListener("orientationchange", () => {
      alert("the orientation of the device is now " + window.orientation.angle);
    });
  }

  renderBox = (item) => {
    let ratio;

    if (this.imgRef.current != null) {
      ratio = this.imgRef.current.clientWidth / this.imgRef.current.naturalWidth;
    } else {
      ratio = 1;
    }
    console.log('ratio is: ', ratio);

    return (
      <div key={item.text}
        style={{
          border: 0.5,
          borderColor: item.color,
          borderStyle: 'solid',
          height: item.height * ratio,
          left: item.left * ratio,
          position: 'absolute',
          top: item.top * ratio,
          width: item.width * ratio,
        }}>
        {item.text}
      </div>
    );
  };

  renderBoxes = () => {
    let items = this.state.items;
    return (
      <div>
        {items.map(item => this.renderBox(item))}
      </div>
    );
  };

  addBoxes = () => {
    console.log('Image size is: ' + this.imgRef.current.clientWidth + 'x' + this.imgRef.current.clientHeight);
    console.log('Image Actual is: ' + this.imgRef.current.naturalWidth + 'x' + this.imgRef.current.naturalHeight);

    let ratio = this.imgRef.current.clientWidth / this.imgRef.current.naturalWidth;
    let left = Math.random() * this.imgRef.current.naturalWidth * ratio;
    let top = Math.random() * this.imgRef.current.naturalHeight * ratio;
    let items = this.state.items;
    let updatedItems = items.concat({
      left: Math.random() * this.imgRef.current.naturalWidth,
      color: 'blue',
      text: left,
      top: top,
      height: 10 + Math.random() * 20,
      width: 40 + Math.random() * 60
    });


    this.setState({
      items: updatedItems
    });
  };

  render() {
    return (
      <div className="App">
        <Grid>
          <Row>
            <div style={{position: 'relative', text: 'center', color: 'white'}}>
              <img alt="" ref={this.imgRef}
                  src="https://travel.usnews.com/static-travel/images/destinations/94/gettyimages-599456588.jpg"
                  className="img-responsive" />
              {this.renderBoxes()}
            </div>
          </Row>
        </Grid>
        <section>
          <ButtonGroup>
            <Button onClick={this.addBoxes}>Left</Button>
            <Button>Middle</Button>
            <Button>Right</Button>
          </ButtonGroup>
        </section>
      </div>
    );
  }
}

export default App;
