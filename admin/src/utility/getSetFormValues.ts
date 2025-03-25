import dayjs from "dayjs"
import { fieldTypes } from "./constant"

const getSetFormValues = (formFields: any[], editedValues: any) => {
    let values = {}
    const keys = Object.keys(editedValues)
    if (!keys?.length) {
        return {}
    }
    keys?.map(key => {
        const form = formFields?.find(field => field?.name === key)
        if (form?.type === fieldTypes?.file) {
            values[key] = [
                {
                    uid: "-1",
                    status: "done",
                    thumbUrl: editedValues[key]
                }
            ]
        } else if (form?.type === fieldTypes?.dateTime) {
            values[key] = dayjs(editedValues[key])
        }
        else {
            values[key] = editedValues[key]
        }
    })
    return values
}

export default getSetFormValues;