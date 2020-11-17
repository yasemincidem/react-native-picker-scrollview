import React from "react";
import { View } from "react-native";

interface IProps {
    wrapperHeight?: number;
    itemHeight?: number;
}
const PlaceHolder = ({ wrapperHeight, itemHeight }: IProps) => {
    const height = ((wrapperHeight || 180) - (itemHeight || 60)) / 2;
    return <View style={{ height, flex: 1 }} />;
};

export default PlaceHolder;
