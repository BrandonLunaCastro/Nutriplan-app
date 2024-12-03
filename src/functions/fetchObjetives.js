export const fetchObjetives = async () => {
    try {
        const response = await fetch("/data/objetivos.json")
        const info = await response.json();
        console.log(info)
        return info
    } catch (error) {
        console.log(error)
    }
}