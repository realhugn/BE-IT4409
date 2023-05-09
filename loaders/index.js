import { PORT } from "../configs";
import { app } from "./app";
export const startServer = async() => {
    try {
        await Promise.all([
            app.listen(PORT)]
        )
    
        console.log(`server is running on ${PORT}, url : http://localhost:${PORT}`)
        app.get('/',(req,res,next) => res.send('Hello World!'))
    } catch (error) {
        console.log(error)
    }
}