import React, { FC } from "react";
import { Text, TextStyle } from "react-native";

interface ITextProps {
    style?: TextStyle;
}
const ItemText: FC<ITextProps> = ({ children, style }) => (
    <Text style={style}>{children}</Text>
);

export default ItemText;
