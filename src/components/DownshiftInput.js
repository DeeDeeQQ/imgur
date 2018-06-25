import React from "react";
import Downshift from "downshift";
import matchSorter from "match-sorter";

const itemToString = item => (item ? item : "");

const DownshiftInput = ({
  input,
  meta,
  placeholder,
  items,
  onKeyDown,
  ...rest
}) => (
  <Downshift
    {...input}
    onInputValueChange={inputValue => {
      input.onChange(inputValue);
    }}
    itemToString={itemToString}
    selectedItem={input.value}
  >
    {({
      getInputProps,
      getItemProps,
      getLabelProps,
      isOpen,
      inputValue,
      highlightedIndex,
      selectedItem
    }) => {
      const filteredItems = matchSorter(items, inputValue, {
        keys: ["display_name"],
        maxRanking: matchSorter.rankings.STARTS_WITH
      });
      return (
        <div className="downshift" style={{ position: "relative" }}>
          <input
            {...getInputProps({
              name: input.name,
              placeholder
            })}
            onKeyDown={onKeyDown}
          />
          {isOpen &&
            !!filteredItems.length && (
              <div
                className="downshift-options"
                style={{
                  background: "white",
                  position: "absolute",
                  top: "100%",
                  left: 15,
                  right: 0,
                  zIndex: 4
                }}
              >
                {filteredItems.map(({ name, display_name }, index) => (
                  <div
                    {...getItemProps({
                      key: name,
                      index,
                      item: name,
                      style: {
                        backgroundColor:
                          highlightedIndex === index ? "lightgray" : "white",
                        fontWeight: selectedItem === name ? "bold" : "normal"
                      }
                    })}
                  >
                    {display_name}
                  </div>
                ))}
              </div>
            )}
        </div>
      );
    }}
  </Downshift>
);

export default DownshiftInput;
