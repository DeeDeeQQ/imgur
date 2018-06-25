import React from "react";
import { Form, Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import styled from "react-emotion";

import DownshiftInput from "./DownshiftInput";

const onSubmit = value => {};

const isShowSort = section => {
  if (section === "user" || section === "tag") {
    return true;
  }
};

const isShowWindow = section => {
  if (section === "top" || section === "tag") {
    return true;
  }
};

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
  const { onChange, filterSection, tags, handleKeyPress } = props;
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <FilterDiv>
          <Field
            name="hashTag"
            items={tags}
            component={DownshiftInput}
            placeholder="#hashtag"
            onKeyDown={handleKeyPress}
          />
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
              onChange({
                section: section,
                tag: ""
              });
            }}
          </OnChange>
          {isShowSort(filterSection) && (
            <div>
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
            </div>
          )}
          {isShowWindow(filterSection) && (
            <div>
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
            </div>
          )}
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
