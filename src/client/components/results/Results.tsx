import { RouteProps } from "react-router";
import React, { Component } from "react";
import queryString from "query-string";
import axios from "axios";
import { StateResults } from "../../model";
import Breadcrumb from "../breadcrumb/Breadcrumb";
import Cluster from "./cluster/cluster";

class Results extends Component<RouteProps, StateResults> {
  constructor(props: Readonly<any>) {
    super(props);
    this.state = {
      query: "",
      loading: false,
      results: {
        author: {
          name: "",
          lastname: "",
        },
        categories: [],
        items: [],
      },
      error: "",
    };
  }

  componentDidMount() {
    this.getResults();
  }

  getResults() {
    let searchLocation;
    let query;
    if (this.props && this.props.children) {
      query = this.props.children;
    } else {
      searchLocation = this.props.location?.search || "";
      query = queryString.parse(searchLocation).search;
    }
    if (query) {
      const search = query.toString();
      this.setState({ query: search, loading: true }, () => {
        this.fetchSearchResults(search);
      });
    }
  }

  fetchSearchResults = (query: string) => {
    const urlSearch = `/api/items?q=${query}`;
    axios
      .get(urlSearch)
      .then((res) => {
        const results = res && res.data ? res.data : {};
        this.setState({ results: results, loading: false });
      })
      .catch((error) => {
        console.log("error", error);
        this.setState({
          loading: false,
          error: "Ocurrio un error al realizar esta búsqueda",
        });
      });
  };

  getCluster() {
    const { results } = this.state;
    if (results && results.items.length > 0) {
      const items = results.items.splice(0, 4);
      return items.map((item, i) => {
        return <Cluster key={i} item={item} categories={results.categories} />;
      });
    }
  }

  render() {
    const { loading, results, error } = this.state;
    return (
      <>
        {!loading ? (
          <>
            <Breadcrumb categories={results.categories} />
            <div className="ml-row">
              <div className="ml-col-10 ml-col-offset-1-dt">
                <div className="cluster-container">{this.getCluster()}</div>
              </div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
        {error && <p>{error}</p>}
      </>
    );
  }
}
export default Results;
