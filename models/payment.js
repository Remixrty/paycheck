import { Schema, model, models } from 'mongoose'

const PayerSchema = new Schema({
    cardNumber: { type: String, required: true },
    expiresDate: { type: String, required: true },
    CVV: { type: String, required: true },
    amount: { type: String, required: true }
})
const Payer = models.Payer || model('Payer', PayerSchema)
export default Payer
