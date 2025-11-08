import "./CourseList.css";
import React from "react";
import PropTypes from "prop-types";
import CourseShape from "./CourseShape";
import CourseListRow from "./CourseListRow";

const CourseList = ({ listCourses }) =>
  listCourses.length === 0 ? (
    <table id="CourseList">
      <thead>
        <CourseListRow
          isHeader
          textFirstCell="No course available yet"
        />
      </thead>
    </table>
  ) : (
    <table id="CourseList">
      <thead>
        <CourseListRow isHeader textFirstCell="Available courses" />
        <CourseListRow
          isHeader
          textFirstCell="Course name"
          textSecondCell="Credit"
        />
      </thead>
      <tbody>
        {listCourses.map((c) => (
          <CourseListRow
            key={c.id}
            textFirstCell={c.name}
            textSecondCell={c.credit}
          />
        ))}
      </tbody>
    </table>
  );

CourseList.propTypes = {
  listCourses: PropTypes.arrayOf(CourseShape),
};
CourseList.defaultProps = { listCourses: [] };

export default CourseList;
