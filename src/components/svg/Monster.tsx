import * as React from "react";
import { useEffect, useState } from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import { StatsContext } from "../../providers/StatsProvider";
// from: https://react-svgr.com/playground/?native=true&typescript=true

const scaleOffset = 0.05;
const defaultHeight = 310;

const SvgMonster = (props: SvgProps) => {
    const [scaleY, setScaleY] = useState(1);
    const [scaleX, setScaleX] = useState(1);
    const [height, setHeight] = useState(defaultHeight);

    const { stats } = React.useContext(StatsContext);

    useEffect(() => {
        let interval: NodeJS.Timer | undefined;

        if (stats.health > 0) {
            interval = setInterval(() => {
                setScaleY(scaleY < 1 ? 1 : scaleY - scaleOffset);
                setScaleX(scaleY === 1 ? 1 + scaleOffset : 1);
                setHeight(
                    scaleY === 1
                        ? defaultHeight
                        : defaultHeight * (1 + scaleOffset)
                );
            }, 1000 - stats.health * 5);
        }

        return () => clearInterval(interval);
    }, [scaleY, stats]);

    return (
        <Svg
            width={160}
            height={height}
            scaleY={scaleY}
            scaleX={scaleX}
            fill="none"
            {...props}
        >
            <Path
                d="M47.019 72.476c6.03 22.987 27.176 37.356 27.176 37.356s11.37-22.898 5.34-45.885C73.505 40.96 52.36 26.59 52.36 26.59S40.99 49.49 47.02 72.476Z"
                fill="#FF826C"
            />
            <Path
                d="M56.175 67.616c16.901 16.707 18.786 42.204 18.786 42.204s-25.517-1.59-42.418-18.296-18.786-42.203-18.786-42.203 25.518 1.59 42.418 18.295Z"
                fill="#3196E2"
            />
            <Path
                d="M83.77 64.622c-11.595 20.743-6.324 45.76-6.324 45.76s24.071-8.614 35.667-29.357c11.597-20.743 6.326-45.76 6.326-45.76S95.367 43.88 83.771 64.622Z"
                fill="#FF826C"
            />
            <Path
                d="M93.738 67.47c.591 23.757-15.732 43.434-15.732 43.434s-17.282-18.84-17.874-42.597c-.591-23.757 15.732-43.434 15.732-43.434s17.282 18.84 17.874 42.597Z"
                fill="#3196E2"
            />
            <Path
                d="M81 259c43.63 0 79-35.37 79-79s-35.37-79-79-79-79 35.37-79 79 35.37 79 79 79Z"
                fill="#FF826C"
            />
            <Path
                d="M69 242H45v43h24v-43ZM117 242H93v43h24v-43Z"
                fill="#FF826C"
            />
            <Path
                d="M65 293c11.046 0 20-3.358 20-7.5 0-4.142-8.954-7.5-20-7.5s-20 3.358-20 7.5c0 4.142 8.954 7.5 20 7.5ZM113 292c11.046 0 20-3.358 20-7.5 0-4.142-8.954-7.5-20-7.5s-20 3.358-20 7.5c0 4.142 8.954 7.5 20 7.5Z"
                fill="#FF826C"
            />
            <Path
                d="M83 187c14.912 0 27-12.088 27-27s-12.088-27-27-27-27 12.088-27 27 12.088 27 27 27Z"
                fill="#fff"
            />
            <Path
                d="M83 169a9 9 0 0 0 9-9 9 9 0 0 0-9-9 9 9 0 0 0-9 9 9 9 0 0 0 9 9Z"
                fill="#3F3D56"
            />
        </Svg>
    );
};

export default SvgMonster;
