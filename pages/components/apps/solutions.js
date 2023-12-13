import React from "react";
import {
  Breadcrumb
} from "react-bootstrap";
import dynamic from "next/dynamic";
import Seo from "@/shared/layout-components/seo/seo";
const Solutionslistcom = dynamic(
  () => import("@/shared/data/advancedui/solutionslistcom"),
  { ssr: false }
);

const Solutionlist = () => {

  return (
    <div>
      <Seo title={"User List"} />

      {/* <!-- breadcrumb --> */}
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <span className="main-content-title mg-b-0 mg-b-lg-1">
            SOLUTION DETAIL
          </span>
        </div>
        <div className="justify-content-center mt-2">
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item tx-15" href="#!">
              Pages
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item "
              active
              aria-current="page"
            >
              Detail solution
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <Solutionslistcom />
    </div>
  );
};

Solutionlist.propTypes = {};

Solutionlist.defaultProps = {};

Solutionlist.layout = "Contentlayout";

export default Solutionlist;
