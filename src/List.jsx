import React, { useState, memo } from "react";
import PropTypes from "prop-types";

// Single List Item
const WrappedSingleListItem = ({ index, isSelected, text, onClickHandler }) => {
return (
<li
style={{ backgroundColor: isSelected ? "green" : "red" }}
onClick={() => onClickHandler(index)}
>
{text}
</li>
);
};

WrappedSingleListItem.propTypes = {
index: PropTypes.number,
isSelected: PropTypes.bool,
onClickHandler: PropTypes.func.isRequired,
text: PropTypes.string.isRequired
};

const SingleListItem = memo(WrappedSingleListItem);

// List Component
const WrappedListComponent = ({ items }) => {
const [setSelectedIndex, selectedIndex] = useState();

const handleClick = (index) => {
console.log(index);
setSelectedIndex === index ? selectedIndex(null) : selectedIndex(index);
console.log(setSelectedIndex);
};

return (
<ul style={{ textAlign: "left" }}>
{items.map((item, index) => (
<SingleListItem
key={index}
text={item.text}
index={index}
isSelected={setSelectedIndex === index}
onClickHandler={() => handleClick(index)}
/>
))}
</ul>
);
};

WrappedListComponent.propTypes = {
items: PropTypes.arrayOf(
PropTypes.shape({
text: PropTypes.string.isRequired
})
)
};

WrappedListComponent.defaultProps = {
items:[],
};

const List = memo(WrappedListComponent);

export default List;
