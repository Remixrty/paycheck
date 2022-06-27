import connectDB from "../../middleware/db";
import Payer from "../../models/payment";
import Dto from "../../models/dto";

export default async function handler(req, res) {
  try {
    
    const { cardNumber, expiresDate, CVV, amount } = req.body
    await connectDB()
    const test = await Payer.create({ cardNumber, expiresDate, CVV, amount })
    const userDto = new Dto(test)
    res.status(200).json({userDto})
  }
  catch (e) {
    console.log(e);
    res.json(e)
  }
}