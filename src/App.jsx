import React, { Component } from 'react';
import { Button, Grid, Row} from 'react-bootstrap';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.imgRef = React.createRef();

    this.state = {
      items: [
        {
          color: 'red',
          height: 25,
          left: 267,
          text: 'ddddd',
          top: 120,
          width: 40,
          ui: {
            top: 120,
            left: 267,
            width: 40,
            height: 25
          }
        },
        {
          height: 20,
          left: 30,
          color: 'pink',
          text: 'eeeeeee',
          top: 60,
          width: 60,
          ui: {
            top: 60,
            left: 30,
            width: 60,
            height: 20
          }
        }
      ],
    };
  }

  resizeBoxes = () => {
    let ratio = this.imgRef.current.clientWidth / this.imgRef.current.naturalWidth;
    console.log('Image ratio is: ', ratio);
    let items = this.state.items;
    let enhanced = items.map(item => {
      let changed = {...item};
      changed.ui = {
        top: item.top * ratio,
        left: item.left * ratio,
        width: item.width * ratio,
        height: item.height * ratio
      }
      console.log('Changed is: ', changed);
      return changed;
    });

    this.setState({
      items: enhanced
    });
  };

  componentDidMount = () => {
    console.log('componentDidMount: img: ', this.imgRef.current.clientWidth, 'x', this.imgRef.current.clientHeight);
    window.addEventListener("resize", () => {
      setTimeout(() => {
        console.log('resize: img: ', this.imgRef.current.clientWidth, 'x', this.imgRef.current.clientHeight);
        this.resizeBoxes();
      }, 250);
    });

    this.resizeBoxes();
  }

  renderBoxes = () => {
    let items = this.state.items;
    console.log('renderBoxes is called');
    return (
      <div>
        {items.map(item =>
          <div key={item.text}
            style={{
              border: 0.5,
              borderColor: item.color,
              borderStyle: 'solid',
              height: item.ui.height,
              left: item.ui.left,
              position: 'absolute',
              top: item.ui.top,
              width: item.ui.width,
            }}>
            {item.text}
          </div>)
        }
      </div>
    );
  };

  addBoxes = () => {
    console.log('Image size is: ' + this.imgRef.current.clientWidth + 'x' + this.imgRef.current.clientHeight);
    console.log('Image Actual is: ' + this.imgRef.current.naturalWidth + 'x' + this.imgRef.current.naturalHeight);

    let top = Math.random() * this.imgRef.current.naturalHeight;
    let items = this.state.items;
    let updatedItems = items.concat({
      left: Math.random() * this.imgRef.current.naturalWidth,
      color: 'blue',
      text: top,
      top: top,
      height: 10 + Math.random() * 20,
      width: 40 + Math.random() * 60,
      ui: {
        top: 0,
        left: 0,
        width: 0,
        height: 0
      }
    });

    this.setState({items: updatedItems}, this.resizeBoxes);
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
          <Button onClick={this.addBoxes}>Left</Button>
        </section>
      </div>
    );
  }
}

export default App;
