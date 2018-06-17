import React from "react";
import { Form, Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import styled from "react-emotion";

const onSubmit = value => {};

const Select = ({ input, options }) => (
  <div>
    <select {...input}>
      {options.map(value => (
        <option key={value.key} value={value.key}>
          {value.show}
        </option>
      ))}
    </select>
  </div>
);

export const Filter = props => {
  const { onChange } = props;
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <FilterDiv>
          <Field
            name="section"
            component={Select}
            options={[
              { key: "hot", show: "hot" },
              { key: "top", show: "top" },
              { key: "user", show: "user" }
            ]}
          />
          <OnChange name="section">
            {section => {
              onChange({ section: section });
            }}
          </OnChange>
          <Field
            name="sort"
            component={Select}
            options={[
              { key: "viral", show: "viral" },
              { key: "top", show: "top" },
              { key: "time", show: "time" },
              { key: "rising", show: "rising" }
            ]}
          />
          <OnChange name="sort">
            {sort => {
              onChange({ sort: sort });
            }}
          </OnChange>
          <Field
            name="window"
            component={Select}
            options={[
              { key: "day", show: "day" },
              { key: "week", show: "week" },
              { key: "year", show: "year" },
              { key: "all", show: "all" }
            ]}
          />
          <OnChange name="window">
            {window => {
              onChange({ window: window });
            }}
          </OnChange>
        </FilterDiv>
      )}
    />
  );
};

const FilterDiv = styled("div")`
  display: flex;
  flex-direction: row;
  flex-basis: 100%;
  justify-content: space-around;
`;
