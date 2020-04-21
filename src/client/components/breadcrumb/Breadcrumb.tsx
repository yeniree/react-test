import React, { Component } from "react";
import { Link } from "react-router-dom";

interface BreadcrumbProps {
  categories: string[];
}

class Breadcrumb extends Component<BreadcrumbProps> {
  render() {
    const categories = this.props.categories;
    return (
      <div className="mb-row breadcrumb">
        <div className="ml-col-offset-1-dt">
          {categories.map((c, i) => {
            const url = `/items?search=${c}`;
            let text = "";
            if (categories.length - 1 !== i) {
              text = `${c} > `;
            } else {
              text = c;
            }
            return (
              <Link to={url} key={i}>
                {text}
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}
export default Breadcrumb;
