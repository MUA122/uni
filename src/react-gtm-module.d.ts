declare module 'react-gtm-module' {
    interface TagManagerArgs {
        gtmId: string;
        dataLayer?: object;
        dataLayerName?: string;
        auth?: string;
        preview?: string;
    }

    interface TagManager {
        initialize(args: TagManagerArgs): void;
        dataLayer(args: { dataLayer: object; dataLayerName?: string }): void;
    }

    const TagManager: TagManager;
    export default TagManager;
}
