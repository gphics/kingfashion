
export default function shortDest(obj: any) {
    const data = obj?.response?.data || null
    const message = obj?.response?.message || null
    const err = obj.err || null
    return { data, err, message }
}