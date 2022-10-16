import React, { Component } from 'react';
import './App.css';
import Request from 'superagent';
import { Button, Input, Card, Col, Row } from 'antd';

const { Meta } = Card;


class App extends Component {
  constructor(props) {

    super(props);
    this.state = {
      body: "",
      value: "",
      name: "",
      abilities: "",
      order: "",
      weight: "",
      height: ""
    };

    this.stateFirst = {
      body: "",
      value: "",
      name: "",
      abilities: "",
      order: "",
      weight: "",
      height: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value.toLowerCase() });
  }

  handleSubmit(event) {
    var url = "https://pokeapi.co/api/v2/pokemon/" + this.state.value;
    Request.get(url).then((response) => {
      console.log('response', response)
      this.setState({
        body: response.body,
        height: response.body.height,
        weight: response.body.weight,
        abilities: response.body.abilities,
        name: response.body.name,
        order: response.body.order,
        picFront: response.body.sprites.front_default,
        picBack: response.body.sprites.back_default,
        picShiny: response.body.sprites.front_shiny,


      });
    });
    event.preventDefault();
  }

  randomPoke(){
    var url = "https://pokeapi.co/api/v2/pokemon/1";
    Request.get(url).then((response) => {
      this.setState({
        body: response.body,
        height: response.body.height,
        weight: response.body.weight,
        abilities: response.body.abilities,
        name: response.body.name,
        order: response.body.order,
        picFront: response.body.sprites.front_default,
        picBack: response.body.sprites.back_default,
        picShiny: response.body.sprites.front_shiny,
      });
    })
  }

  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  render() {

    return (
      <div className="flex">
        <div className="App">
          <h1>Buscar Pokemon</h1>
          <form onSubmit={this.handleSubmit}>
            <Input size="large" style={{ width: '30%' }} type="text" value={this.state.value} onChange={this.handleChange} />
            <Input size="large" style={{ width: '10%' }} type="submit" value="Buscar" />
          </form>
        </div>
        <div>
        <Row gutter={12} style={{ textAlign: '-webkit-center', justifyContent: 'center'}}>
        <Col span={8}>
        <Card
          hoverable
          direction="horizontal" 
          style={{width: 240, justifyContent: 'center'}}
          cover={<img alt={this.state.name} src={this.state.picFront} />}
        >
          <Meta title={this.Capitalize(this.state.name)} description={this.state.abilities && this.state.abilities.map((abilityObject) =>
                abilityObject.ability.name).join(', ')} />
        </Card>
      </Col>
      <Col span={8}>
      <Card
          hoverable
          direction="horizontal" 
          style={{width: 240, justifyContent: 'center'}}
          cover={ <img alt={this.state.name} src={this.state.picBack} />}
        >
          <Meta title={this.Capitalize(this.state.name)} description={this.state.abilities && this.state.abilities.map((abilityObject) =>
                abilityObject.ability.name).join(', ')}/>
        </Card>
      </Col>
      <Col span={8}>
      <Card
          hoverable
          direction="horizontal" 
          style={{width: 240, justifyContent: 'center'}}
          cover={<img alt={this.state.name} src={this.state.picShiny} />}
        >
          <Meta title={'Shiny ' + this.Capitalize(this.state.name)} description={this.state.abilities && this.state.abilities.map((abilityObject) =>
                abilityObject.ability.name).join(', ')} />
        </Card>
      </Col>
    </Row>
        </div>

        
        <div className="app2">

          <h1>{this.Capitalize(this.state.name)} <small>{this.state.order} </small></h1>
          <img alt={this.state.name} src={this.state.picFront} />
          <img alt={this.state.name} src={this.state.picBack} />
          <img alt={this.state.name} src={this.state.picShiny} />
          <div className='data'>
            <p>Tamanho: {this.state.height}</p>
            <p>Peso: {this.state.weight}</p>
            <p>
              Lista de habilidades:
              {this.state.abilities && this.state.abilities.map((abilityObject) =>
                abilityObject.ability.name).join(', ')}
            </p>
          </div>

        </div>
      </div>

    );
  }
};


export default App;