## react-native-wheel-scroll-picker

a pure js picker, each option item customizable

![example](./demo/test.gif)

### props

Required props are in **bold**

|      **Props**       |                   **Type**                    |                             **Default**                              |                                       **Description**                                       |
| :------------------: | :-------------------------------------------: | :------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------: |
|    **dataSource**    |                     `T[]`                     |                                 None                                 |                                   The data for the picker                                   |
|      renderItem      | `(item: T, index: number) => React.ReactNode` |                             See the demo                             |                                 Custom item render function                                 |
|    selectedIndex     |                   `number`                    |                                  0                                   |                                The index of the initial item                                |
|    onValueChange     |      `(item: T, index: number) => void`       |                                 None                                 |                  Function that is called after the picker snaps to an item                  |
|    highlightColor    |                   `string`                    |                                 #333                                 | The color of the horizontal lines (see the demo), pass `transparent` to make them invisible |
|      itemHeight      |                   `number`                    |                                  60                                  |                                The height of one picker item                                |
|  wrapperBackground   |                   `string`                    |                                 #FFF                                 |                          The color of the background of the picker                          |
|     wrapperWidth     |                    `number                    |                               string`                                |                                             150                                             | The width of the picker |
|    wrapperHeight     |                   `number`                    |                                 180                                  |                                  The height of the picker                                   |
|    highlightWidth    |                    `number                    |                               string`                                |                                            100%                                             | The width of the highlighted item |
| highlightBorderWidth |                   `number`                    |                                  2                                   |                              The width of the horizontal lines                              |
| activeItemTextStyle  |                  `TextStyle`                  | { fontSize: 20, lineHeight: 26, textAlign: "center", color: "#000" } |                              The style of the highlighted text                              |
|    itemTextStyle     |                  `TextStyle`                  | { fontSize: 20, lineHeight: 26, textAlign: "center", color: "#222" } |                              The style of not highlighted text                              |
| onMomentumScrollEnd  |                 `() => void`                  |                                 None                                 |          The function that is called when momentum scroll ends on the scroll list           |
|   onScrollEndDrag    |                 `() => void`                  |                                 None                                 |            The function that is called when drag scroll ends on the scroll list             |

### usage

```shell
npm install react-native-wheel-scroll-picker --save
```

```tsx
import React from "react";
import ScrollPicker from "react-native-wheel-scroll-picker";

export default () => {
    return (
        <ScrollPicker
            dataSource={["a", "b", "c", "d"]}
            selectedIndex={1}
            renderItem={(data, index, isSelected) => {
                //
            }}
            onValueChange={(data, selectedIndex) => {
                //
            }}
            wrapperHeight={180}
            wrapperWidth={150}
            wrapperBackground={"#FFFFFF"}
            itemHeight={60}
            highlightColor={"#d8d8d8"}
            highlightBorderWidth={2}
            activeItemColor={"#222121"}
            itemColor={"#B4B4B4"}
        />
    );
};
```
