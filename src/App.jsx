import React, { Component } from 'react';
import { Button, ButtonGroup, Col, Grid, Row} from 'react-bootstrap';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.imgRef = React.createRef();

    this.state = {
      items: [
        {
          color: 'red',
          left: 20,
          text: 'ddddd',
          top: 30
        },
        {
          left: 30,
          color: 'pink',
          text: 'eeeeeee',
          top: 60,
        }
      ]
    };
  }

  renderBoxes = () => {
    let items = this.state.items;
    return (
      <div>
        {items.map(item =>
          <div key={item.text}
            style={{border: 0.5, position: 'absolute', top: item.top, left: item.left, borderColor: item.color, borderStyle: 'solid'}}>
            {item.text}
          </div>
        )}
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
      top: top
    });


    this.setState({
      items: updatedItems
    });
  };

  render() {
    return (
      <div className="App">
        <Grid>
          <Row className="show-grid text-left">
            <Col style={{border: 1, borderStyle: 'solid', borderColor: 'black'}} xs={12} md={3} lg={3}>
              Item 1
            </Col>
            <Col xs={12} md={3} lg={3}>
              Item 2
            </Col>
            <Col xs={12} md={3} lg={3}>
              Item 3
            </Col>
          </Row>
          <Row>
            <div style={{position: 'relative', text: 'center', color: 'white'}}>
              <img alt="" ref={this.imgRef}
                  src="https://travel.usnews.com/static-travel/images/destinations/94/gettyimages-599456588.jpg"
                  className="img-responsive" />

              {this.renderBoxes()}
              <div style={{position: 'absolute', top: 5, left: 5, backgroundColor: 'green'}}>
                hello hello hello How low
              </div>
              <div style={{position: 'absolute', bottom: 5, left: 5, backgroundColor: 'blue'}}>
                Spirit
              </div>
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
