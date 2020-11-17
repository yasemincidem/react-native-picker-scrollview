import React, { useEffect, useRef, useState } from "react";
import {
    ScrollView,
    Platform,
    TextStyle,
    NativeSyntheticEvent,
    NativeScrollEvent,
} from "react-native";

import Container from "./src/Container";
import HighlightView from "./src/HighlightView";
import ItemText from "./src/ItemText";
import PlaceHolder from "./src/Placeholder";
import SelectedItem from "./src/SelectedItem";

interface IProps<T> {
    dataSource: T[];
    renderItem?: (data: T, index: number) => React.ReactNode;
    selectedIndex?: number;
    onValueChange?: (value: T, index: number) => void;
    highlightColor?: string;
    itemHeight?: number;
    wrapperBackground?: string;
    wrapperWidth?: number | string;
    wrapperHeight?: number;
    highlightWidth?: number | string;
    highlightBorderWidth?: number;
    itemTextStyle?: TextStyle;
    activeItemTextStyle?: TextStyle;
    onMomentumScrollEnd?: () => void;
    onScrollEndDrag?: () => void;
}

let timer: NodeJS.Timeout;

const ScrollPicker = <T,>({
    selectedIndex,
    renderItem,
    dataSource,
    wrapperHeight,
    itemHeight,
    onValueChange,
    onScrollEndDrag,
    onMomentumScrollEnd,
    highlightWidth,
    wrapperWidth,
    wrapperBackground,
    highlightColor,
    highlightBorderWidth,
    activeItemTextStyle,
    itemTextStyle,
}: IProps<T>) => {
    const [currentSelectedIndex, setCurrentSelectedIndex] = useState(1);

    let isScrollTo = useRef(false);
    let dragStarted = useRef(false);
    let momentumStarted = useRef(false);

    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        if (selectedIndex !== undefined) {
            setTimeout(() => {
                scrollToIndex(selectedIndex);
            }, 1);
        }

        if (timer) return () => clearTimeout(timer);
    }, []);

    const scrollFix = (e: any) => {
        let verticalY = 0;
        if (e?.nativeEvent?.contentOffset) {
            verticalY = e.nativeEvent.contentOffset.y;
        }
        const h = itemHeight || 60;
        const selectedIndex = Math.round(verticalY / h);
        const verticalElem = selectedIndex * h;
        if (verticalElem !== verticalY) {
            if (Platform.OS === "ios") isScrollTo.current = true;
            scrollViewRef.current?.scrollTo({ y: verticalElem });
        }
        if (currentSelectedIndex === selectedIndex) return;
        setCurrentSelectedIndex(selectedIndex);

        if (onValueChange) {
            onValueChange(dataSource[selectedIndex], selectedIndex);
        }
    };

    const onScrollBeginDrag = () => {
        dragStarted.current = true;
        if (Platform.OS === "ios") isScrollTo.current = false;
        if (timer) clearTimeout(timer);
    };

    const onScrollEndDragPrivate = (
        e: NativeSyntheticEvent<NativeScrollEvent>
    ) => {
        onScrollEndDrag && onScrollEndDrag();
        dragStarted.current = false;
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            if (!momentumStarted.current && !dragStarted.current) scrollFix(e);
        }, 10);
    };

    const onMomentumScrollBegin = () => {
        momentumStarted.current = true;
        if (timer) clearTimeout(timer);
    };

    const onMomentumScrollEndPrivate = (
        e: NativeSyntheticEvent<NativeScrollEvent>
    ) => {
        onMomentumScrollEnd && onMomentumScrollEnd();
        momentumStarted.current = false;
        if (
            !isScrollTo.current &&
            !momentumStarted.current &&
            !dragStarted.current
        )
            scrollFix(e);
    };

    const scrollToIndex = (ind: number) => {
        setCurrentSelectedIndex(ind);
        const y = (itemHeight || 60) * ind;
        setTimeout(() => {
            scrollViewRef.current?.scrollTo({ y });
        }, 1);
    };

    const renderItemPrivate = (data: T, index: number) => {
        const isSelected = index === currentSelectedIndex;

        const item = (
            <ItemText
                style={
                    isSelected
                        ? {
                              fontSize: 20,
                              lineHeight: 26,
                              textAlign: "center",
                              color: "#000",
                              ...activeItemTextStyle,
                          }
                        : {
                              fontSize: 20,
                              lineHeight: 26,
                              textAlign: "center",
                              color: "#222",
                              ...itemTextStyle,
                          }
                }
            >
                {data}
            </ItemText>
        );

        return (
            <SelectedItem key={index} itemHeight={itemHeight || 60}>
                {item}
            </SelectedItem>
        );
    };

    return (
        <Container
            wrapperHeight={wrapperHeight || 180}
            wrapperWidth={wrapperWidth || 150}
            wrapperBackground={wrapperBackground || "#FFFFFF"}
        >
            <HighlightView
                highlightColor={highlightColor || "#333"}
                highlightWidth={highlightWidth || "100%"}
                wrapperHeight={wrapperHeight || 180}
                itemHeight={itemHeight || 60}
                highlightBorderWidth={highlightBorderWidth || 2}
            />
            <ScrollView
                ref={scrollViewRef}
                bounces={false}
                showsVerticalScrollIndicator={false}
                onMomentumScrollBegin={() => onMomentumScrollBegin()}
                onMomentumScrollEnd={(e) => onMomentumScrollEndPrivate(e)}
                onScrollBeginDrag={() => onScrollBeginDrag()}
                onScrollEndDrag={(e) => onScrollEndDragPrivate(e)}
            >
                <PlaceHolder
                    itemHeight={itemHeight}
                    wrapperHeight={wrapperHeight}
                />
                {dataSource.map(renderItem ? renderItem : renderItemPrivate)}
                <PlaceHolder
                    itemHeight={itemHeight}
                    wrapperHeight={wrapperHeight}
                />
            </ScrollView>
        </Container>
    );
};

export default ScrollPicker;
