import React, { Component } from "react";
import "./Search.scss";
import { StateSearch } from "../../model";

class Search extends Component<{}, StateSearch> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      query: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: { target: { value: string } }) {
    const query = event.target.value;
    this.setState({ query: query });
  }

  onClick() {}

  render() {
    return (
      <div className="search">
        <div className="ml-container">
          <div className="ml-row">
            <div className="ml-col-2 ml-col-offset-1-dt image"></div>
            <div className="ml-col-9 input-search">
              <form action="/items">
                <div className="fieldset">
                  <input
                    type="text"
                    name="search"
                    placeholder="Nunca dejes de buscar"
                    value={this.state.query}
                    onChange={this.handleChange}
                    autoComplete="off"
                  />
                  <button className="icon-search"></button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Search;
