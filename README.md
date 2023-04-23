
SHIVAM SARMA ROY                                Registration Number :12015930








Submitted To


(STEELEYE)

School of Computer Science and Engineering

![image](https://user-images.githubusercontent.com/116440760/232981439-99b0e91b-b876-4aa6-9098-e3ad9f1d88d1.png)



  
Q1: What List Component does?

Structure:
By observing the code thoroughly , I understood that the List component is basically made of two components ie “WrappedListComponent ”  and “WrappedSingleListItem” .The component “WrappedListComponent ” is the parent component and the component “WrappedSingleListItem ” is a child component .Here in this code “items ” is the array of objects  and an individual object contains an element “text ” that is of type string and this “items” is passed as props from “App.js” .”items” is mapped in the “WrappedListComponent ” inside “ul” element and then “{ key={index}, text={item.text} ,index={index}, isSelected={setSelectedIndex === index} ,onClickHandler={() => handleClick(index)} }”  these are passed as a props in “WrappedSingleListItem”  component and then used inside “li” element.  


Functionality:
(According to my understanding) A list of elements should be displayed in webpage and whenever user click on a single list element, the element should turn its color from red to green and vice-versa.  In order to do so we have used “props” to pass the data from parent to child. And used “map()” function to iterate and we are keeping  track of their “indices” as well, when any item is clicked an function is called which sets the index of that particular item to “useState” function’s  variable  then a re-render is triggered and then this “useState” function’s  variable  is compared to all the mapped indices where it matches it passes “true” else “false” .So wherever it matches the color turns to “green” and else to remains “red”. 
             We have used “Memo” with memo, we can create a component that React will not re-render when its parent re-renders so long as its new props are the same as the old props. We have used “Props-types” to validate the data-types of passed data from parent to child if there is problem it throws error.




Onclick:

![image](https://user-images.githubusercontent.com/116440760/232981811-a01d63af-0c99-44ea-b749-cf8cfc9ba622.png)

             
OnClick Another One:

![image](https://user-images.githubusercontent.com/116440760/232981838-f60c64e1-a92d-4f5e-9e26-df5518eba0a5.png)

                  

OnClick Same One:
 
 ![image](https://user-images.githubusercontent.com/116440760/232981864-b5ae16d2-ed0f-4c05-bce2-54fe1fe8cf38.png)



Q2: Problems/warnings that were faced:

a)ERROR 


![image](https://user-images.githubusercontent.com/116440760/232981996-6a8e7dfd-48b7-47c5-9b03-bf542d9c2951.png)

 
This is a syntax error of props-type In order to validate collective types there are way to combine them and use. For ARRAYS OF NUMBER we have “ arrayOf “ and for object shape “Shape” and the correct syntax is PropTypes.arrayOf([type])  and PropTypes.shape().

Problematic code:

```
WrappedListComponent.propTypes = {
  items: PropTypes.array(PropTypes.shapeOf({
    text: PropTypes.string.isRequired,
  })),
};

```

Fixed code

```
WrappedListComponent.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
  })),};
  
  ```


B) ERROR

![image](https://user-images.githubusercontent.com/116440760/232982146-4c6d0376-9b7a-472a-a4db-d95708f5e1aa.png)

 
In this code the useState Function variable names “setSelectedIndex”and “selectedIndex” names are wrongly used . The variable and the function names are interchanged but their usage still maintained same leading to error.

Problematic code:
```
const [setSelectedIndex, selectedIndex] = useState();
```

Fixed code:
```
const [selectedIndex, setSelectedIndex] = useState();
```

C) Warning

![image](https://user-images.githubusercontent.com/116440760/232982179-6d215433-0a47-4638-9e78-cf4ff99178ab.png)

 
This warning was introduced in React 16.3.1 here in this code  passing state setters from parent to child is a fine thing to do but  calling those setters while rendering is never a smart idea, which is the problem. And this warning message will be the outcome .So to overcome this we should use an “ARROW FUNCTION”.

Problematic code
```
onClick={onClickHandler(index)}
```


Fixed code
```
onClick={()=>onClickHandler(index)}
```

d) Warning
 
 
 ![image](https://user-images.githubusercontent.com/116440760/232982217-31c9f5ec-7dbd-4d82-8e5a-88197b87caa1.png)


A distinct "key" is needed when using the array "map" function to map the elements of an array in order to distinguish and keep track of the elements visited. The key was previously missing, but my code fixed that. Cite "fixed code"

Problematic code
```
{items.map((item, index) => (
        <SingleListItem
          onClickHandler={() => handleClick(index)}
          text={item.text}
          index={index}
          isSelected={setSelectedIndex===index}
        />
      ))}
```


Fixed code
```
{items.map((item, index) => (
        <SingleListItem
          onClickHandler={() => handleClick(index)}
          text={item.text}
          index={index}
          isSelected={setSelectedIndex===index}
          Key={index}
        />
      ))}
```

e) Warning

```
WrappedListComponent.defaultProps = {
  items: null,
};
```

Use "[]" to initialise a variable using an empty array. The variable items, however, is initialised with "null" in the code. This is a Reactjs development anti-pattern, and using "null" is not advised.

Fixed code
```
WrappedListComponent.defaultProps = {
  items: [],
};
```

f) Warning

```
WrappedSingleListItem.propTypes = {
index: PropTypes.number,
isSelected: PropTypes.bool,
onClickHandler: PropTypes.func.isRequired,
text: PropTypes.string.isRequired
};

isSelected={setSelectedIndex}

```

This "isSelected" function uses react "prop-types" to validate and expects a bool value as an argument. We must change "selectedIndex" to "selectedIndex === index" in order to correct this issue.


Fixed Code:
```
WrappedSingleListItem.propTypes = {
index: PropTypes.number,
isSelected: PropTypes.bool,
onClickHandler: PropTypes.func.isRequired,
text: PropTypes.string.isRequired
};

isSelected={setSelectedIndex===index}
```

Q3: Completely fixed code:

```
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
//modified
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
items:[]
};

const List = memo(WrappedListComponent);

export default List;



```


OUTPUT:
Onclick:

![image](https://user-images.githubusercontent.com/116440760/232981811-a01d63af-0c99-44ea-b749-cf8cfc9ba622.png)
             
OnClick Another One:

![image](https://user-images.githubusercontent.com/116440760/232981838-f60c64e1-a92d-4f5e-9e26-df5518eba0a5.png)
                  

OnClick Same One:

 ![image](https://user-images.githubusercontent.com/116440760/232981864-b5ae16d2-ed0f-4c05-bce2-54fe1fe8cf38.png)
 
 Live LINK: https://64390f4961662c298748086f--glittering-piroshki-aa8ce3.netlify.app/
 
 PDF file:  https://drive.google.com/file/d/1gaJl6uIJLrN-l5HGPa6pwwh4akQoTIsQ/view?usp=sharing

 

