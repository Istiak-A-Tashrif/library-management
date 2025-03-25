import { Image } from "antd"

export const getMediaFile = (file) => {
    switch (file?.type) {
        case "IMAGE":
            return (
                <>
                    <Image
                        width={100}
                        src={file?.url}
                        preview={{
                            src: file?.url,
                        }}
                    />
                    
                </>
            )
        default:
            return <></>
    }

}