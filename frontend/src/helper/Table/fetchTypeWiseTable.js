const { default: SummaryApi } = require("../../common")

const fetchTypeWiseTable = async(tableType) =>{
    const response = await fetch(SummaryApi.typeWiseTable.url,{
        method: SummaryApi.typeWiseTable.method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({tableType:tableType})
    })
    const dataResponse = await response.json()
    return dataResponse
}
export default fetchTypeWiseTable