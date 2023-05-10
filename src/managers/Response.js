export default class Response {
    constructor(data, msg, statusCode) {
        this.data = data
        this.message = msg
        this.status = statusCode
    }
}