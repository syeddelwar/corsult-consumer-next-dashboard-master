import React from "react";
import Moment from "react-moment";

const TimeAgo = ({ timeAgo }) => {
  return (
    <div className="text-sm">
      <span className="text-gray-600">
        <Moment fromNow>{timeAgo}</Moment>
      </span>
    </div>
  );
};

export default TimeAgo;
