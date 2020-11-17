import React, { FC } from "react";
import { View, StyleSheet } from "react-native";

interface IProps {
    itemHeight: number;
}

const SelectedItem: FC<IProps> = ({ children, itemHeight }) => (
    <View style={{ ...styles.selectedItem, height: itemHeight }}>
        {children}
    </View>
);

export default SelectedItem;

const styles = StyleSheet.create({
    selectedItem: {
        height: 30,
        justifyContent: "center",
        alignItems: "center",
    },
});
