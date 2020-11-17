import React, { FC } from "react";
import { View } from "react-native";

interface IProps {
    wrapperHeight: number;
    itemHeight: number;
    highlightWidth: number | string;
    highlightColor: string;
    highlightBorderWidth: number;
}

const HighlightView: FC<IProps> = ({
    children,
    wrapperHeight,
    itemHeight,
    highlightWidth,
    highlightColor,
    highlightBorderWidth,
}) => (
    <View
        style={{
            position: "absolute",
            top: (wrapperHeight - itemHeight) / 2,
            height: itemHeight,
            width: highlightWidth,
            borderTopColor: highlightColor,
            borderBottomColor: highlightColor,
            borderTopWidth: highlightBorderWidth,
            borderBottomWidth: highlightBorderWidth,
        }}
    >
        {children}
    </View>
);

export default HighlightView;
