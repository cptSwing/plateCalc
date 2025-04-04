import { CSSProperties, FC } from "react";

const StrokeText: FC<{
    text: string;
    strokeWidth?: CSSProperties["WebkitTextStrokeWidth"];
    strokeColor?: CSSProperties["WebkitTextStrokeColor"];
    classNames?: string;
}> = ({ text, strokeWidth = "1rem", strokeColor = "white", classNames = "" }) => {
    return (
        <>
            <style
                dangerouslySetInnerHTML={{
                    __html: `.stroke-text-react-component:before {
                                    content: "${text}";
                                    position: absolute;
                                    display: block;
                                    left: 0;
                                    top: 0;
                                    -webkit-text-stroke-width: ${strokeWidth};
                                    -webkit-text-stroke-color: ${strokeColor};
                                    z-index: -1;
                            }`,
                }}
            />
            <span className={`stroke-text-react-component ${classNames}`}>{text}</span>
        </>
    );
};

export default StrokeText;
