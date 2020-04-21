import React, { Component } from "react";
import { Item } from "../../../model";
import { numberFormat } from "../../util/NumberFormat";
import "./cluster.scss";
import { Link } from "react-router-dom";

interface ClusterProps {
  item: Item;
  categories: string[];
}

class Cluster extends Component<ClusterProps> {
  render() {
    const props = this.props;
    const item = props.item;
    const url = `/items/${item.id}`;

    return (
      <Link to={{ pathname: url, state: { categories: props.categories } }}>
        <div className="ml-row cluster">
          <div className="ml-col-6 ml-col-4-dt center">
            <img src={item.picture} alt={item.id} width="160" height="160" />
          </div>
          <div className="ml-col-6 ml-col-8-dt cluster-info">
            <div className="price">
              {numberFormat(item.price.decimals, item.price.currency)}
              {item.free_shipping && <div className="freeShipping" />}
            </div>
            <div>{item.title}</div>
          </div>
        </div>
      </Link>
    );
  }
}
export default Cluster;
