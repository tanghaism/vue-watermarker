import { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    visible: {
        default: boolean;
        type: BooleanConstructor;
    };
    content: {
        default: () => never[];
        type: PropType<string[]>;
    };
    styleOption: {
        default: () => {};
        type: PropType<StyleSheet>;
    };
    width: {
        type: NumberConstructor;
        default: number;
    };
    height: {
        type: NumberConstructor;
        default: number;
    };
    refresh: {
        default: number;
        type: NumberConstructor;
    };
    target: {
        default: undefined;
        type: (ObjectConstructor | StringConstructor)[];
    };
}, void, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    visible?: unknown;
    content?: unknown;
    styleOption?: unknown;
    width?: unknown;
    height?: unknown;
    refresh?: unknown;
    target?: unknown;
} & {
    visible: boolean;
    content: string[];
    styleOption: StyleSheet;
    width: number;
    height: number;
    refresh: number;
} & {
    target?: string | Record<string, any> | undefined;
}>, {
    visible: boolean;
    content: string[];
    styleOption: StyleSheet;
    width: number;
    height: number;
    refresh: number;
    target: string | Record<string, any>;
}>;
export default _default;
