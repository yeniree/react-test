import React, { Component } from "react";
import { RouteChildrenProps } from "react-router-dom";
import { StateDetail } from "../../model";
import { numberFormat } from "../util/NumberFormat";
import Axios from "axios";
import "./Detail.scss";
import Breadcrumb from "../breadcrumb/Breadcrumb";

class Detail extends Component<RouteChildrenProps, StateDetail> {
  constructor(props: Readonly<RouteChildrenProps>) {
    super(props);
    this.state = {
      id: "",
      loading: false,
      categories: [],
      detail: {
        author: {
          name: "",
          lastname: "",
        },
        items: {
          id: "",
          title: "",
          price: {
            amount: 0,
            decimals: 0,
            currency: "",
          },
          picture: "",
          condition: "",
          free_shipping: false,
          sold_quantity: 0,
          description: "",
        },
      },
      error: "",
    };
  }

  componentDidMount() {
    const state: any = this.props.location.state;
    if (state && state.categories) {
      this.setState({ categories: state.categories });
    }
    const params: any = this.props.match?.params;
    if (params && params.id) {
      const id = params.id;
      this.setState({ id: id, loading: true }, () => {
        this.fetchDetail(id);
      });
    }
  }

  fetchDetail = (id: string) => {
    const urlSearch = `/api/items/${id}`;
    Axios.get(urlSearch)
      .then((res) => {
        const detail = res && res.data ? res.data : {};
        this.setState({ detail: detail, loading: false });
      })
      .catch((error) => {
        console.log("error", error);
        this.setState({
          loading: false,
          error: "Ocurrio un error al realizar esta búsqueda",
        });
      });
  };

  render() {
    const { loading, categories, detail, error } = this.state;
    const item = detail?.items;
    return (
      <>
        {categories && <Breadcrumb categories={categories} />}
        <div className="ml-row">
          <div className="ml-col-10 ml-col-offset-1-dt detail">
            {!loading && item ? (
              <div className="ml-row">
                <div className="ml-col-12 ml-col-6-dt image">
                  <img src={item.picture} alt={item.title} />
                </div>
                <div className="ml-col-12 ml-col-5-dt detail-info">
                  <div>
                    {item.condition === "new" && "Nuevo -"} {item.sold_quantity}{" "}
                    Vendidos
                  </div>
                  <div className="title">
                    <h2>{item.title}</h2>
                  </div>
                  <div className="price">
                    <h1>
                      {item.price.amount > 0 &&
                        numberFormat(item.price.decimals, item.price.currency)}
                    </h1>
                  </div>
                  <div className="ml-col-8-dt ml-col-12">
                    <button>Comprar</button>
                  </div>
                </div>
                <div className="ml-row description">
                  <div className="ml-col-12 ml-col-10-dt">
                    <h1>Descripción</h1>
                    <div>{item.description}</div>
                  </div>
                </div>
              </div>
            ) : (
              <p>Loading...</p>
            )}
            {error && <p>{error}</p>}
          </div>
        </div>
      </>
    );
  }
}
export default Detail;
