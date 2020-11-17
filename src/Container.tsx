import React, { FC } from "react";
import { View } from "react-native";

interface IProps {
    wrapperHeight: number;
    wrapperWidth: number;
    wrapperBackground: string;
}

const Container: FC<IProps> = ({
    children,
    wrapperBackground,
    wrapperWidth,
    wrapperHeight,
}) => (
    <View
        style={{
            height: wrapperHeight,
            overflow: "hidden",
            alignSelf: "center",
            width: wrapperWidth,
            backgroundColor: wrapperBackground,
        }}
    >
        {children}
    </View>
);

export default Container;
